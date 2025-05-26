const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

class PlaylistDownloader {
    constructor() {
        this.downloadDir = path.join(__dirname, '../downloads');
        this.maxConcurrent = 3; // Limit concurrent downloads to avoid overwhelming the system
        this.downloadQueue = [];
        this.activeDownloads = 0;
        this.completedDownloads = 0;
        this.failedDownloads = 0;
    }

    async ensureDownloadDir() {
        try {
            await fs.access(this.downloadDir);
        } catch {
            await fs.mkdir(this.downloadDir, { recursive: true });
        }
    }

    async extractPlaylistTracks(playlistUrl) {
        console.log('🚀 Extracting playlist tracks with yt-dlp...');
        console.log('===============================================');

        try {
            const command = `yt-dlp --flat-playlist --dump-json "${playlistUrl}"`;
            console.log(`Running: ${command}`);

            const { stdout } = await execAsync(command);
            const lines = stdout.trim().split('\n').filter(line => line.trim());
            const tracks = [];

            console.log(`📊 Found ${lines.length} entries in playlist`);

            for (const line of lines) {
                try {
                    const trackInfo = JSON.parse(line);
                    if (trackInfo.url && trackInfo.title) {
                        tracks.push({
                            url: trackInfo.url,
                            title: this.sanitizeFilename(trackInfo.title),
                            uploader: this.sanitizeFilename(trackInfo.uploader || 'Unknown'),
                            duration: trackInfo.duration || 'Unknown',
                            id: trackInfo.id || trackInfo.url.split('/').pop()
                        });
                    }
                } catch (parseError) {
                    console.log(`⚠️  Failed to parse line: ${line.substring(0, 100)}...`);
                }
            }

            console.log(`✅ Successfully extracted ${tracks.length} tracks from playlist`);
            return tracks;

        } catch (error) {
            console.error('❌ Failed to extract playlist tracks:', error.message);
            throw error;
        }
    }

    sanitizeFilename(filename) {
        return filename
            .replace(/[<>:"/\\|?*]/g, '_')
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_')
            .trim();
    }

    async downloadTrack(track) {
        const artistDir = path.join(this.downloadDir, track.uploader);
        const trackDir = path.join(artistDir, track.title);

        try {
            // Create directories
            await fs.mkdir(trackDir, { recursive: true });

            // Check if already downloaded
            const files = await fs.readdir(trackDir);
            const hasAudio = files.some(file => file.endsWith('.mp3'));

            if (hasAudio) {
                console.log(`⏭️  Skipping "${track.title}" - already downloaded`);
                return { success: true, skipped: true };
            }

            console.log(`📥 Downloading: "${track.title}" by ${track.uploader}`);

            // Generate unique filename
            const filename = `${track.id}_${track.title}`;
            const outputPath = path.join(trackDir, filename);

            // Download with yt-dlp
            const downloadCommand = `yt-dlp --extract-audio --audio-format mp3 --audio-quality 0 -o "${outputPath}.%(ext)s" "${track.url}"`;

            await execAsync(downloadCommand);

            // Save metadata
            const metadata = {
                title: track.title,
                uploader: track.uploader,
                url: track.url,
                duration: track.duration,
                downloadedAt: new Date().toISOString(),
                id: track.id
            };

            await fs.writeFile(
                path.join(trackDir, 'metadata.json'),
                JSON.stringify(metadata, null, 2)
            );

            console.log(`✅ Downloaded: "${track.title}"`);
            return { success: true, skipped: false };

        } catch (error) {
            console.error(`❌ Failed to download "${track.title}":`, error.message);
            return { success: false, error: error.message };
        }
    }

    async processDownloadQueue() {
        while (this.downloadQueue.length > 0 || this.activeDownloads > 0) {
            // Start new downloads if we have capacity
            while (this.activeDownloads < this.maxConcurrent && this.downloadQueue.length > 0) {
                const track = this.downloadQueue.shift();
                this.activeDownloads++;

                // Download in background
                this.downloadTrack(track).then(result => {
                    this.activeDownloads--;

                    if (result.success) {
                        if (!result.skipped) {
                            this.completedDownloads++;
                        }
                    } else {
                        this.failedDownloads++;
                    }

                    // Progress update
                    const total = this.completedDownloads + this.failedDownloads + this.activeDownloads + this.downloadQueue.length;
                    const completed = this.completedDownloads + this.failedDownloads;
                    console.log(`📊 Progress: ${completed}/${total} tracks processed (${this.activeDownloads} active, ${this.downloadQueue.length} queued)`);
                });
            }

            // Wait a bit before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    async downloadPlaylist(playlistUrl) {
        console.log('🎵 Starting Complete Playlist Download');
        console.log('====================================');
        console.log(`Playlist URL: ${playlistUrl}`);
        console.log('');

        try {
            // Ensure download directory exists
            await this.ensureDownloadDir();

            // Extract all tracks from playlist
            const tracks = await this.extractPlaylistTracks(playlistUrl);

            if (tracks.length === 0) {
                console.log('❌ No tracks found in playlist');
                return;
            }

            console.log('\n🎵 Playlist Tracks:');
            console.log('==================');
            tracks.forEach((track, index) => {
                console.log(`${index + 1}. "${track.title}" by ${track.uploader}`);
            });

            console.log(`\n📥 Starting download of ${tracks.length} tracks...`);
            console.log(`🔄 Max concurrent downloads: ${this.maxConcurrent}`);
            console.log('');

            // Add all tracks to download queue
            this.downloadQueue = [...tracks];

            // Start processing downloads
            await this.processDownloadQueue();

            // Final summary
            console.log('\n🎉 Download Complete!');
            console.log('====================');
            console.log(`✅ Successfully downloaded: ${this.completedDownloads} tracks`);
            console.log(`❌ Failed downloads: ${this.failedDownloads} tracks`);
            console.log(`📁 Downloads saved to: ${this.downloadDir}`);

        } catch (error) {
            console.error('❌ Playlist download failed:', error.message);
            throw error;
        }
    }
}

// Main execution
async function main() {
    const playlistUrl = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

    const downloader = new PlaylistDownloader();

    try {
        await downloader.downloadPlaylist(playlistUrl);
    } catch (error) {
        console.error('💥 Fatal error:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { PlaylistDownloader };
