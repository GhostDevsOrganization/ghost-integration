#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Ghost Integration GitBook Setup Helper');
console.log('=========================================');
console.log('This script will help you configure your GitBook space connection.');
console.log('You\'ll need your GitBook Space ID from your space URL.');
console.log('Example: https://app.gitbook.com/s/YOUR_SPACE_ID\n');

rl.question('📝 Enter your GitBook Space ID: ', (spaceId) => {
    if (!spaceId || spaceId.trim() === '' || spaceId.includes('YOUR_SPACE_ID')) {
        console.log('⚠️  You must enter a valid Space ID to continue.');
        rl.close();
        return;
    }

    // Update .env file
    const envContent = `# Your GitBook Space ID (replace with your actual Space ID)
# Find this in your GitBook space URL: https://app.gitbook.com/s/YOUR_SPACE_ID
GITBOOK_SPACE_ID=${spaceId.trim()}
`;

    try {
        fs.writeFileSync('.env', envContent);
        console.log('\n✅ Space ID successfully saved to .env file!');
        console.log('\n🚀 You can now run the documentation generator:');
        console.log('   npm run generate');
        console.log('\n📘 This will create 8 comprehensive documentation pages in your GitBook space.');
    } catch (error) {
        console.error('\n❌ Error saving Space ID:', error.message);
    }

    rl.close();
});
