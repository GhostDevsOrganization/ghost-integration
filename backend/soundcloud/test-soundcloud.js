const axios = require('axios');

async function testSoundCloudDownload() {
    try {
        const response = await axios.post('http://localhost:3000/soundcloud/download', {
            url: 'https://soundcloud.com/example-track-url'
        });

        console.log('Download successful:', response.data);
    } catch (error) {
        console.error('Download failed:', error.response?.data || error.message);
    }
}

// Example usage
console.log('SoundCloud Scraper Test');
console.log('Usage: node test-soundcloud.js');
console.log('Make sure to replace the URL with a valid SoundCloud track URL');

// Uncomment to test:
// testSoundCloudDownload();
