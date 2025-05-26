const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function debugYtDlpOutput() {
    console.log('🔍 Debugging yt-dlp output format');
    console.log('==================================');

    const playlistUrl = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

    try {
        console.log('📋 Running yt-dlp with flat-playlist...');
        const command = `yt-dlp --flat-playlist --dump-json "${playlistUrl}"`;

        const { stdout } = await execAsync(command);
        const lines = stdout.trim().split('\n').filter(line => line.trim());

        console.log(`📊 Total lines: ${lines.length}`);
        console.log('');

        // Show first few lines to understand the format
        console.log('🔍 First 3 lines of output:');
        console.log('===========================');

        for (let i = 0; i < Math.min(3, lines.length); i++) {
            console.log(`Line ${i + 1}:`);
            console.log(lines[i]);
            console.log('');

            try {
                const parsed = JSON.parse(lines[i]);
                console.log('Parsed object keys:', Object.keys(parsed));
                console.log('Title:', parsed.title);
                console.log('URL:', parsed.url);
                console.log('Uploader:', parsed.uploader);
                console.log('ID:', parsed.id);
                console.log('');
            } catch (parseError) {
                console.log('❌ Failed to parse as JSON:', parseError.message);
                console.log('');
            }
        }

        // Try to parse all and see how many are valid
        let validTracks = 0;
        let invalidLines = 0;

        for (const line of lines) {
            try {
                const trackInfo = JSON.parse(line);
                if (trackInfo.url && trackInfo.title) {
                    validTracks++;
                } else {
                    console.log('⚠️  Valid JSON but missing url/title:', {
                        hasUrl: !!trackInfo.url,
                        hasTitle: !!trackInfo.title,
                        keys: Object.keys(trackInfo)
                    });
                }
            } catch (parseError) {
                invalidLines++;
                if (invalidLines <= 3) {
                    console.log(`❌ Invalid JSON line ${invalidLines}:`, line.substring(0, 100) + '...');
                }
            }
        }

        console.log('📊 Summary:');
        console.log(`Valid tracks: ${validTracks}`);
        console.log(`Invalid lines: ${invalidLines}`);
        console.log(`Total lines: ${lines.length}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

debugYtDlpOutput().catch(console.error);
