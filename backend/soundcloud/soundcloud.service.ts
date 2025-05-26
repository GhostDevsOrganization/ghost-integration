import { Injectable, OnModuleInit } from '@nestjs/common';
import { chromium, Browser, Page } from 'playwright';
import { createWriteStream } from 'fs';
import * as fs from 'fs';
import { pipeline } from 'stream/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface TrackMetadata {
    title: string;
    artist: string;
    duration: string;
    genre: string;
    releaseDate: string;
    waveformUrl: string;
    downloadUrl: string;
    trackUrl?: string;
}

export interface PlaylistMetadata {
    title: string;
    creator: string;
    description: string;
    trackCount: number;
    tracks: string[];
}

@Injectable()
export class SoundcloudService {
    private browser: Browser;
    private readonly downloadDir = path.join(__dirname, '../../downloads');

    async onModuleInit() {
        this.browser = await chromium.launch({
            headless: true
        });
    }

    async downloadTrack(trackUrl: string, maxRetries = 3) {
        // First try the original method (download button)
        try {
            return await this.downloadTrackOriginal(trackUrl, maxRetries);
        } catch (originalError) {
            console.log(`Original download failed: ${originalError.message}`);
            console.log(`Trying alternative download method with yt-dlp...`);

            // Fallback to yt-dlp method
            try {
                return await this.downloadTrackWithYtDlp(trackUrl);
            } catch (ytDlpError) {
                throw new Error(`Both download methods failed. Original: ${originalError.message}, yt-dlp: ${ytDlpError.message}`);
            }
        }
    }

    async downloadTrackOriginal(trackUrl: string, maxRetries = 3) {
        let attempt = 0;
        let lastError: Error;

        while (attempt < maxRetries) {
            const context = await this.browser.newContext({
                userAgent: this.randomUserAgent(),
                acceptDownloads: true
            });

            try {
                const page = await context.newPage();
                await page.goto(trackUrl, { waitUntil: 'networkidle', timeout: 60000 });

                // Extract rich metadata
                const metadata = await page.evaluate((): TrackMetadata => {
                    const jsonData = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || '{}');
                    return {
                        title: jsonData.name || document.querySelector('h1[itemprop="name"]')?.textContent?.trim() || 'Untitled',
                        artist: jsonData.byArtist?.name || document.querySelector('a[itemprop="byArtist"]')?.textContent?.trim() || 'Unknown Artist',
                        duration: jsonData.duration || document.querySelector('time[itemprop="duration"]')?.textContent?.trim() || '0:00',
                        genre: jsonData.genre || 'Unknown Genre',
                        releaseDate: jsonData.datePublished || 'Unknown Date',
                        waveformUrl: document.querySelector('.waveform__image')?.getAttribute('src') || '',
                        downloadUrl: ''
                    };
                });

                // Find download button and extract URL
                const downloadButton = await page.$('button.downloadButton:not([disabled])');
                if (!downloadButton) throw new Error('Download button not found or disabled');

                const [download] = await Promise.all([
                    page.waitForEvent('download'),
                    downloadButton.click()
                ]);

                metadata.downloadUrl = download.url();

                // Create organized directory structure
                const sanitizedArtist = metadata.artist.replace(/[^a-z0-9]/gi, '_');
                const sanitizedTitle = metadata.title.replace(/[^a-z0-9]/gi, '_');
                const downloadPath = path.join(this.downloadDir, sanitizedArtist, sanitizedTitle);
                await this.ensureDirectoryExists(downloadPath);

                // Save metadata
                const metadataPath = path.join(downloadPath, 'metadata.json');
                await pipeline(
                    JSON.stringify(metadata, null, 2),
                    createWriteStream(metadataPath)
                );

                // Save track with UUID filename to prevent collisions
                const trackFileName = `${uuidv4()}_${sanitizedTitle}.${this.getFileExtension(download.suggestedFilename())}`;
                const trackPath = path.join(downloadPath, trackFileName);
                await download.saveAs(trackPath);

                return { success: true, path: trackPath, metadata };
            } catch (error) {
                lastError = error;
                attempt++;
                await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 1000)); // Exponential backoff
            } finally {
                await context.close();
            }
        }
        throw new Error(`Failed after ${maxRetries} attempts: ${lastError?.message}`);
    }

    async downloadTrackWithYtDlp(trackUrl: string) {
        const execAsync = promisify(exec);

        // First extract metadata using yt-dlp
        const metadataCommand = `yt-dlp --dump-json "${trackUrl}"`;

        try {
            const { stdout: metadataJson } = await execAsync(metadataCommand);
            const ytDlpMetadata = JSON.parse(metadataJson.trim());

            const metadata: TrackMetadata = {
                title: ytDlpMetadata.title || 'Untitled',
                artist: ytDlpMetadata.uploader || ytDlpMetadata.channel || 'Unknown Artist',
                duration: ytDlpMetadata.duration_string || '0:00',
                genre: ytDlpMetadata.genre || 'Unknown Genre',
                releaseDate: ytDlpMetadata.upload_date || 'Unknown Date',
                waveformUrl: ytDlpMetadata.thumbnail || '',
                downloadUrl: trackUrl,
                trackUrl: trackUrl
            };

            // Create organized directory structure
            const sanitizedArtist = metadata.artist.replace(/[^a-z0-9]/gi, '_');
            const sanitizedTitle = metadata.title.replace(/[^a-z0-9]/gi, '_');
            const downloadPath = path.join(this.downloadDir, sanitizedArtist, sanitizedTitle);
            await this.ensureDirectoryExists(downloadPath);

            // Save metadata
            const metadataPath = path.join(downloadPath, 'metadata.json');
            await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

            // Download the track using yt-dlp
            const trackUuid = uuidv4();
            const trackFileName = `${trackUuid}_${sanitizedTitle}.%(ext)s`;
            const trackPath = path.join(downloadPath, trackFileName);

            const downloadCommand = `yt-dlp -o "${trackPath}" --extract-audio --audio-format mp3 --audio-quality 0 "${trackUrl}"`;

            await execAsync(downloadCommand);

            // Find the actual downloaded file (yt-dlp will replace %(ext)s with actual extension)
            const files = await fs.promises.readdir(downloadPath);
            const downloadedFile = files.find(file => file.startsWith(`${trackUuid}_${sanitizedTitle}`) && file.endsWith('.mp3'));

            if (!downloadedFile) {
                throw new Error('Downloaded file not found');
            }

            const finalPath = path.join(downloadPath, downloadedFile);

            return { success: true, path: finalPath, metadata };

        } catch (error) {
            throw new Error(`yt-dlp download failed: ${error.message}`);
        }
    }

    private randomUserAgent() {
        const agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
        ];
        return agents[Math.floor(Math.random() * agents.length)];
    }

    private async ensureDirectoryExists(dirPath: string) {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }

    private getFileExtension(filename: string) {
        return filename.split('.').pop() || 'mp3';
    }

    async scrapePlaylist(playlistUrl: string): Promise<PlaylistMetadata> {
        const context = await this.browser.newContext({
            userAgent: this.randomUserAgent()
        });

        try {
            const page = await context.newPage();
            await page.goto(playlistUrl, { waitUntil: 'networkidle', timeout: 60000 });

            // Extract playlist metadata and track URLs
            const playlistData = await page.evaluate(() => {
                // Try to find playlist data in JSON-LD
                const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
                let playlistInfo = null;

                for (const script of scripts) {
                    try {
                        const data = JSON.parse(script.textContent || '{}');
                        if (data['@type'] === 'MusicPlaylist' || data.name) {
                            playlistInfo = data;
                            break;
                        }
                    } catch (e) {
                        continue;
                    }
                }

                // Fallback to DOM scraping
                const title = playlistInfo?.name ||
                    document.querySelector('h1')?.textContent?.trim() ||
                    'Unknown Playlist';

                const creator = playlistInfo?.creator?.name ||
                    document.querySelector('.soundTitle__username')?.textContent?.trim() ||
                    'Unknown Creator';

                const description = playlistInfo?.description ||
                    document.querySelector('.truncatedAudioInfo__content')?.textContent?.trim() ||
                    '';

                // Extract track URLs from the playlist using multiple strategies
                const tracks: string[] = [];

                // Strategy 1: Look for track links in playlist containers
                const playlistTrackSelectors = [
                    '.trackItem__trackTitle a',
                    '.soundList__item a[href*="/"]',
                    '.track__title a',
                    '.soundTitle__title a',
                    '.trackItem a[href*="/"]',
                    '.sound__coverArt + .sound__content a',
                    'article a[href*="/"]',
                    '.playlist .sound a[href*="/"]'
                ];

                for (const selector of playlistTrackSelectors) {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        const href = element.getAttribute('href');
                        if (href && href.match(/^\/[^\/]+\/[^\/]+$/) && !href.includes('/sets/')) {
                            const fullUrl = `https://soundcloud.com${href}`;
                            if (!tracks.includes(fullUrl)) {
                                tracks.push(fullUrl);
                            }
                        }
                    });
                }

                // Strategy 2: Look for data attributes that might contain track info
                const dataElements = document.querySelectorAll('[data-permalink-url]');
                dataElements.forEach(element => {
                    const permalink = element.getAttribute('data-permalink-url');
                    if (permalink && permalink.includes('soundcloud.com') && !permalink.includes('/sets/')) {
                        if (!tracks.includes(permalink)) {
                            tracks.push(permalink);
                        }
                    }
                });

                // Strategy 3: Parse JSON data from script tags for track URLs
                const allScripts = document.querySelectorAll('script');
                allScripts.forEach(script => {
                    const content = script.textContent || '';
                    if (content.includes('soundcloud.com') && content.includes('tracks')) {
                        // Look for track URLs in JSON data
                        const trackMatches = content.match(/https:\/\/soundcloud\.com\/[^\/\s"]+\/[^\/\s"]+/g);
                        if (trackMatches) {
                            trackMatches.forEach(url => {
                                if (!url.includes('/sets/') && !tracks.includes(url)) {
                                    tracks.push(url);
                                }
                            });
                        }
                    }
                });

                // Strategy 4: Fallback - look for any links that match track pattern
                if (tracks.length === 0) {
                    const allLinks = document.querySelectorAll('a[href*="/"]');
                    allLinks.forEach(element => {
                        const href = element.getAttribute('href');
                        if (href &&
                            href.match(/^\/[^\/]+\/[^\/]+$/) &&
                            !href.includes('/sets/') &&
                            !href.includes('/likes') &&
                            !href.includes('/reposts') &&
                            !href.includes('/followers') &&
                            !href.includes('/following') &&
                            !href.includes('/albums') &&
                            !href.includes('/tracks') &&
                            !href.includes('/you/') &&
                            !href.includes('/pages/') &&
                            !href.includes('/charts/') &&
                            !href.includes('/discover') &&
                            !href.includes('/upload') &&
                            !href.includes('/premium')) {

                            const fullUrl = `https://soundcloud.com${href}`;
                            if (!tracks.includes(fullUrl)) {
                                tracks.push(fullUrl);
                            }
                        }
                    });
                }

                return {
                    title,
                    creator,
                    description,
                    trackCount: tracks.length,
                    tracks
                };
            });

            return playlistData;
        } finally {
            await context.close();
        }
    }

    async downloadPlaylist(playlistUrl: string, concurrency: number = 3): Promise<{ success: boolean; playlist: PlaylistMetadata; results: any[] }> {
        console.log(`Starting playlist download: ${playlistUrl}`);

        // First, scrape the playlist to get track URLs
        const playlist = await this.scrapePlaylist(playlistUrl);
        console.log(`Found ${playlist.tracks.length} tracks in playlist: ${playlist.title}`);

        if (playlist.tracks.length === 0) {
            console.log('No tracks found in playlist');
            return { success: true, playlist, results: [] };
        }

        // Download tracks in parallel with controlled concurrency
        console.log(`🚀 Starting parallel downloads with concurrency: ${concurrency}`);

        const downloadPromises = playlist.tracks.map(async (trackUrl, index) => {
            console.log(`📥 Queuing track ${index + 1}/${playlist.tracks.length}: ${trackUrl}`);

            try {
                const result = await this.downloadTrack(trackUrl);
                console.log(`✓ Successfully downloaded: ${result.metadata.title}`);
                return { trackUrl, success: true, ...result };
            } catch (error) {
                console.error(`✗ Failed to download ${trackUrl}: ${error.message}`);
                return { trackUrl, success: false, error: error.message };
            }
        });

        // Execute downloads with controlled concurrency
        const results = await this.executeWithConcurrency(downloadPromises, concurrency);

        return { success: true, playlist, results };
    }

    private async executeWithConcurrency<T>(promises: Promise<T>[], concurrency: number): Promise<T[]> {
        const results: T[] = [];
        const executing: Promise<void>[] = [];

        for (const promise of promises) {
            const execute = promise.then(result => {
                results.push(result);
            });

            executing.push(execute);

            if (executing.length >= concurrency) {
                await Promise.race(executing);
                executing.splice(executing.findIndex(p => p === execute), 1);
            }
        }

        await Promise.all(executing);
        return results;
    }

    async onModuleDestroy() {
        await this.browser?.close();
    }
}
