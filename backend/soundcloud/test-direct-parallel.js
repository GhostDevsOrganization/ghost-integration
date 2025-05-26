// Test the service directly without going through the API
const { SoundcloudService } = require('./soundcloud.service');

async function testDirectParallel() {
    console.log('🚀 Testing Direct Parallel Downloads (bypassing API)');
    console.log('===================================================');

    const service = new SoundcloudService();

    try {
        // Initialize the service
        await service.onModuleInit();
        console.log('✅ Service initialized');

        // Test scraping first
        console.log('\n📋 Step 1: Testing direct playlist scraping...');
        const playlistUrl = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

        const playlist = await service.scrapePlaylist(playlistUrl);
        console.log('✅ Scraping result:');
        console.log(`   Title: ${playlist.title}`);
        console.log(`   Creator: ${playlist.creator}`);
        console.log(`   Track Count: ${playlist.trackCount}`);
        console.log(`   Tracks found: ${playlist.tracks.length}`);

        if (playlist.tracks.length > 0) {
            console.log('   First few tracks:');
            playlist.tracks.slice(0, 3).forEach((track, i) => {
                console.log(`     ${i + 1}. ${track}`);
            });

            // Test parallel downloads
            console.log('\n📋 Step 2: Testing parallel downloads...');
            console.log('⏱️  Starting parallel download with concurrency = 3...');
            const startTime = Date.now();

            const result = await service.downloadPlaylist(playlistUrl, 3);
            const endTime = Date.now();

            console.log(`✅ Parallel download completed in ${endTime - startTime}ms`);
            console.log(`📊 Results: ${result.results.length} tracks processed`);
            console.log(`✅ Successful: ${result.results.filter(r => r.success).length}`);
            console.log(`❌ Failed: ${result.results.filter(r => !r.success).length}`);

            // Show successful downloads
            const successful = result.results.filter(r => r.success);
            if (successful.length > 0) {
                console.log('\n🎵 Successfully downloaded tracks:');
                successful.forEach((track, i) => {
                    console.log(`   ${i + 1}. ${track.metadata.title} by ${track.metadata.artist}`);
                });
            }

            // Show failed downloads
            const failed = result.results.filter(r => !r.success);
            if (failed.length > 0) {
                console.log('\n❌ Failed downloads:');
                failed.forEach((track, i) => {
                    console.log(`   ${i + 1}. ${track.trackUrl} - ${track.error}`);
                });
            }

        } else {
            console.log('⚠️  No tracks found in playlist.');
            console.log('   This might be due to SoundCloud page structure changes.');

            // Test with individual track
            console.log('\n📥 Testing individual track download...');
            const testTrackUrl = 'https://soundcloud.com/daily-bread/push-it-to-the-limit-ft';

            try {
                const trackResult = await service.downloadTrack(testTrackUrl);
                console.log('✅ Individual track download successful!');
                console.log(`   Title: ${trackResult.metadata.title}`);
                console.log(`   Artist: ${trackResult.metadata.artist}`);
                console.log(`   Path: ${trackResult.path}`);
            } catch (trackError) {
                console.log('❌ Individual track download failed:', trackError.message);
            }
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        // Clean up
        try {
            await service.onModuleDestroy();
            console.log('\n🧹 Service cleaned up');
        } catch (cleanupError) {
            console.log('⚠️  Cleanup warning:', cleanupError.message);
        }
    }
}

// Run the test
testDirectParallel();
