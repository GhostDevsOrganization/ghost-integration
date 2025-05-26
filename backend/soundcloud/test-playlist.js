const axios = require('axios');

const PLAYLIST_URL = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

async function testPlaylistScraping() {
    console.log('🎵 Testing SoundCloud Playlist Scraper');
    console.log('=====================================');
    console.log(`Playlist URL: ${PLAYLIST_URL}`);
    console.log('');

    try {
        console.log('📋 Step 1: Scraping playlist metadata...');
        const scrapeResponse = await axios.post('http://localhost:4001/api/soundcloud/scrape-playlist', {
            url: PLAYLIST_URL
        }, {
            headers: {
                'x-api-key': 'prod_1234567890abcdef'
            }
        });

        const playlist = scrapeResponse.data;
        console.log('✅ Playlist scraped successfully!');
        console.log(`📝 Title: ${playlist.title}`);
        console.log(`👤 Creator: ${playlist.creator}`);
        console.log(`📊 Track Count: ${playlist.trackCount}`);
        console.log(`📄 Description: ${playlist.description || 'No description'}`);
        console.log('');

        if (playlist.tracks && playlist.tracks.length > 0) {
            console.log('🎵 Found tracks:');
            playlist.tracks.forEach((track, index) => {
                console.log(`  ${index + 1}. ${track}`);
            });
            console.log('');
        }

        return playlist;
    } catch (error) {
        console.error('❌ Playlist scraping failed:', error.response?.data || error.message);
        throw error;
    }
}

async function testPlaylistDownload() {
    console.log('💾 Step 2: Testing playlist download...');
    console.log('⚠️  Note: This will attempt to download all tracks in the playlist');
    console.log('');

    try {
        const downloadResponse = await axios.post('http://localhost:4001/api/soundcloud/download-playlist', {
            url: PLAYLIST_URL
        }, {
            headers: {
                'x-api-key': 'prod_1234567890abcdef'
            }
        });

        const result = downloadResponse.data;
        console.log('✅ Playlist download completed!');
        console.log(`📊 Total tracks processed: ${result.results.length}`);

        const successful = result.results.filter(r => r.success);
        const failed = result.results.filter(r => !r.success);

        console.log(`✅ Successful downloads: ${successful.length}`);
        console.log(`❌ Failed downloads: ${failed.length}`);
        console.log('');

        if (successful.length > 0) {
            console.log('✅ Successfully downloaded:');
            successful.forEach((track, index) => {
                console.log(`  ${index + 1}. ${track.metadata?.title || 'Unknown'} by ${track.metadata?.artist || 'Unknown'}`);
            });
            console.log('');
        }

        if (failed.length > 0) {
            console.log('❌ Failed downloads:');
            failed.forEach((track, index) => {
                console.log(`  ${index + 1}. ${track.trackUrl} - ${track.error}`);
            });
            console.log('');
        }

        return result;
    } catch (error) {
        console.error('❌ Playlist download failed:', error.response?.data || error.message);
        throw error;
    }
}

async function runTests() {
    try {
        // Test scraping first
        const playlist = await testPlaylistScraping();

        // Ask user if they want to proceed with download
        console.log('🤔 Do you want to proceed with downloading the playlist?');
        console.log('   This will download all tracks to your local machine.');
        console.log('   Press Ctrl+C to cancel, or wait 10 seconds to proceed...');

        await new Promise(resolve => setTimeout(resolve, 10000));

        // Proceed with download
        await testPlaylistDownload();

        console.log('🎉 All tests completed successfully!');
    } catch (error) {
        console.error('💥 Test failed:', error.message);
        process.exit(1);
    }
}

// Check if we should run the tests
if (require.main === module) {
    console.log('🚀 Starting SoundCloud Playlist Tests...');
    console.log('Make sure your NestJS backend is running on http://localhost:4001');
    console.log('');

    runTests();
}

module.exports = {
    testPlaylistScraping,
    testPlaylistDownload,
    PLAYLIST_URL
};
