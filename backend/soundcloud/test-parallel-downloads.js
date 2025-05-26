const axios = require('axios');

const API_BASE = 'http://localhost:4001/api/soundcloud';

// Test playlist with multiple tracks that we know works
const TEST_PLAYLIST_URL = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

async function testParallelDownloads() {
    console.log('🚀 Testing Parallel Downloads Feature');
    console.log('=====================================');
    console.log('Make sure your NestJS backend is running on http://localhost:4001\n');

    try {
        // Test 1: Sequential downloads (concurrency = 1)
        console.log('📋 Test 1: Sequential Downloads (concurrency = 1)');
        console.log('⏱️  Starting sequential download test...');
        const startSequential = Date.now();

        const sequentialResponse = await axios.post(`${API_BASE}/download-playlist`, {
            url: TEST_PLAYLIST_URL,
            concurrency: 1
        });

        const sequentialTime = Date.now() - startSequential;
        console.log(`✅ Sequential download completed in ${sequentialTime}ms`);
        console.log(`📊 Tracks processed: ${sequentialResponse.data.results.length}`);
        console.log(`✅ Successful: ${sequentialResponse.data.results.filter(r => r.success).length}`);
        console.log(`❌ Failed: ${sequentialResponse.data.results.filter(r => !r.success).length}\n`);

        // Test 2: Parallel downloads (concurrency = 3)
        console.log('📋 Test 2: Parallel Downloads (concurrency = 3)');
        console.log('⏱️  Starting parallel download test...');
        const startParallel = Date.now();

        const parallelResponse = await axios.post(`${API_BASE}/download-playlist`, {
            url: TEST_PLAYLIST_URL,
            concurrency: 3
        });

        const parallelTime = Date.now() - startParallel;
        console.log(`✅ Parallel download completed in ${parallelTime}ms`);
        console.log(`📊 Tracks processed: ${parallelResponse.data.results.length}`);
        console.log(`✅ Successful: ${parallelResponse.data.results.filter(r => r.success).length}`);
        console.log(`❌ Failed: ${parallelResponse.data.results.filter(r => !r.success).length}\n`);

        // Test 3: High concurrency (concurrency = 5)
        console.log('📋 Test 3: High Concurrency Downloads (concurrency = 5)');
        console.log('⏱️  Starting high concurrency download test...');
        const startHighConcurrency = Date.now();

        const highConcurrencyResponse = await axios.post(`${API_BASE}/download-playlist`, {
            url: TEST_PLAYLIST_URL,
            concurrency: 5
        });

        const highConcurrencyTime = Date.now() - startHighConcurrency;
        console.log(`✅ High concurrency download completed in ${highConcurrencyTime}ms`);
        console.log(`📊 Tracks processed: ${highConcurrencyResponse.data.results.length}`);
        console.log(`✅ Successful: ${highConcurrencyResponse.data.results.filter(r => r.success).length}`);
        console.log(`❌ Failed: ${highConcurrencyResponse.data.results.filter(r => !r.success).length}\n`);

        // Performance comparison
        console.log('📈 Performance Comparison');
        console.log('========================');
        console.log(`Sequential (concurrency=1): ${sequentialTime}ms`);
        console.log(`Parallel (concurrency=3): ${parallelTime}ms`);
        console.log(`High Concurrency (concurrency=5): ${highConcurrencyTime}ms`);

        if (parallelTime < sequentialTime) {
            const improvement = ((sequentialTime - parallelTime) / sequentialTime * 100).toFixed(1);
            console.log(`🚀 Parallel downloads are ${improvement}% faster than sequential!`);
        }

        if (highConcurrencyTime < parallelTime) {
            const improvement = ((parallelTime - highConcurrencyTime) / parallelTime * 100).toFixed(1);
            console.log(`⚡ High concurrency is ${improvement}% faster than standard parallel!`);
        }

        console.log('\n🎉 All parallel download tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);

        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Make sure your NestJS backend is running:');
            console.log('   cd backend && npm run start:dev');
        }
    }
}

// Run the test
testParallelDownloads();
