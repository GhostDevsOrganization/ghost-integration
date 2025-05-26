import { Controller, Post, Body } from '@nestjs/common';
import { SoundcloudService, TrackMetadata, PlaylistMetadata } from './soundcloud.service';

@Controller('soundcloud')
export class SoundcloudController {
    constructor(private readonly soundcloudService: SoundcloudService) { }

    @Post('download')
    async downloadTrack(@Body('url') url: string) {
        if (!url || !url.includes('soundcloud.com')) {
            throw new Error('Invalid SoundCloud URL');
        }

        try {
            return await this.soundcloudService.downloadTrack(url);
        } catch (error) {
            throw new Error(`Download failed: ${error.message}`);
        }
    }

    @Post('scrape-playlist')
    async scrapePlaylist(@Body('url') url: string): Promise<PlaylistMetadata> {
        if (!url || !url.includes('soundcloud.com') || !url.includes('/sets/')) {
            throw new Error('Invalid SoundCloud playlist URL');
        }

        try {
            return await this.soundcloudService.scrapePlaylist(url);
        } catch (error) {
            throw new Error(`Playlist scraping failed: ${error.message}`);
        }
    }

    @Post('download-playlist')
    async downloadPlaylist(@Body() body: { url: string; concurrency?: number }) {
        if (!body.url || !body.url.includes('soundcloud.com') || !body.url.includes('/sets/')) {
            throw new Error('Invalid SoundCloud playlist URL');
        }

        try {
            const concurrency = body.concurrency || 3; // Default to 3 concurrent downloads
            return await this.soundcloudService.downloadPlaylist(body.url, concurrency);
        } catch (error) {
            throw new Error(`Playlist download failed: ${error.message}`);
        }
    }
}
