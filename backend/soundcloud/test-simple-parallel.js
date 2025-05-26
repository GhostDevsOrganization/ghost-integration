const axios = require('axios');

const API_BASE = 'http://localhost:4001/api/soundcloud';

async function testSimpleParallel() {
    console.log('🚀 Testing Simple Parallel Downloads');
    console.log('====================================');

    try {
        // First, let's test scraping to see if we can find tracks
        console.log('📋 Step 1: Testing playlist scraping...');
        const scrapeResponse = await axios.post(`${API_BASE}/scrape-playlist`, {
            url: 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
        });

        console.log('✅ Scraping result:');
        console.log(`   Title: ${scrapeResponse.data.title}`);
        console.log(`   Creator: ${scrapeResponse.data.creator}`);
        console.log(`   Track Count: ${scrapeResponse.data.trackCount}`);
        console.log(`   Tracks found: ${scrapeResponse.data.tracks.length}`);

        if (scrapeResponse.data.tracks.length > 0) {
            console.log('   First few tracks:');
            scrapeResponse.data.tracks.slice(0, 3).forEach((track, i) => {
                console.log(`     ${i + 1}. ${track}`);
            });
        }

        if (scrapeResponse.data.tracks.length === 0) {
            console.log('⚠️  No tracks found in playlist. This might be due to:');
            console.log('   - SoundCloud changed their page structure');
            console.log('   - The playlist is private or restricted');
            console.log('   - The playlist URL format has changed');
            console.log('\n💡 Let\'s test with individual track downloads instead...');

            // Test with a known individual track
            const testTrackUrl = 'https://soundcloud.com/daily-bread/push-it-to-the-limit-ft';
            console.log(`\n📥 Testing individual track download: ${testTrackUrl}`);

            const trackResponse = await axios.post(`${API_BASE}/download`, {
                url: testTrackUrl
            });

            console.log('✅ Individual track download test completed!');
            console.log(`   Success: ${trackResponse.data.success}`);
            if (trackResponse.data.metadata) {
                console.log(`   Title: ${trackResponse.data.metadata.title}`);
                console.log(`   Artist: ${trackResponse.data.metadata.artist}`);
            }
        } else {
            // Test parallel downloads with found tracks
            console.log('\n📋 Step 2: Testing parallel downloads...');

            const downloadResponse = await axios.post(`${API_BASE}/download-playlist`, {
                url: 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
                concurrency: 3
            });

            console.log('✅ Parallel download test completed!');
            console.log(`📊 Results: ${downloadResponse.data.results.length} tracks processed`);
            console.log(`✅ Successful: ${downloadResponse.data.results.filter(r => r.success).length}`);
            console.log(`❌ Failed: ${downloadResponse.data.results.filter(r => !r.success).length}`);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);

        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Make sure your NestJS backend is running:');
            console.log('   cd backend && npm run start:dev');
        }
    }
}

// Run the test
testSimpleParallel();
