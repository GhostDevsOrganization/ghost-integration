const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function testYtDlpPlaylist() {
    console.log('🚀 Testing yt-dlp Playlist Extraction');
    console.log('=====================================');

    const playlistUrl = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

    try {
        console.log('📋 Step 1: Extracting playlist info with yt-dlp...');

        // Extract playlist information
        const playlistCommand = `yt-dlp --flat-playlist --dump-json "${playlistUrl}"`;
        console.log(`Running: ${playlistCommand}`);

        const { stdout } = await execAsync(playlistCommand);

        // Parse the output - yt-dlp returns one JSON object per line for each track
        const lines = stdout.trim().split('\n').filter(line => line.trim());
        const tracks = [];

        console.log(`📊 Found ${lines.length} entries in playlist`);

        for (const line of lines) {
            try {
                const trackInfo = JSON.parse(line);
                if (trackInfo.url && trackInfo.title) {
                    tracks.push({
                        url: trackInfo.url,
                        title: trackInfo.title,
                        uploader: trackInfo.uploader || 'Unknown',
                        duration: trackInfo.duration || 'Unknown'
                    });
                }
            } catch (parseError) {
                console.log(`⚠️  Failed to parse line: ${line.substring(0, 100)}...`);
            }
        }

        console.log('\n🎵 Extracted Tracks:');
        console.log('===================');
        tracks.forEach((track, index) => {
            console.log(`${index + 1}. "${track.title}" by ${track.uploader}`);
            console.log(`   URL: ${track.url}`);
            console.log(`   Duration: ${track.duration}`);
            console.log('');
        });

        if (tracks.length > 0) {
            console.log('✅ SUCCESS! yt-dlp can extract playlist tracks!');
            console.log(`📊 Total tracks found: ${tracks.length}`);

            // Test downloading the first track
            console.log('\n📥 Testing download of first track...');
            const firstTrack = tracks[0];

            const downloadCommand = `yt-dlp --extract-audio --audio-format mp3 --audio-quality 0 --get-filename "${firstTrack.url}"`;
            console.log(`Testing: ${downloadCommand}`);

            try {
                const { stdout: filename } = await execAsync(downloadCommand);
                console.log(`✅ Download test successful! Would create: ${filename.trim()}`);
            } catch (downloadError) {
                console.log(`⚠️  Download test failed: ${downloadError.message}`);
            }

            return tracks;
        } else {
            console.log('❌ No tracks found in playlist');
            return [];
        }

    } catch (error) {
        console.error('❌ yt-dlp playlist extraction failed:', error.message);

        if (error.message.includes('yt-dlp')) {
            console.log('\n💡 Make sure yt-dlp is installed:');
            console.log('   pip install yt-dlp');
            console.log('   or');
            console.log('   npm install -g yt-dlp');
        }

        return [];
    }
}

// Run the test
testYtDlpPlaylist().then(tracks => {
    if (tracks.length > 0) {
        console.log('\n🎉 SOLUTION FOUND!');
        console.log('We can use yt-dlp to extract playlist tracks and then download them in parallel!');
        console.log(`Found ${tracks.length} tracks ready for parallel downloading.`);
    }
}).catch(console.error);
