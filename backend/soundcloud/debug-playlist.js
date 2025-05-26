const { chromium } = require('playwright');

async function debugPlaylist() {
    console.log('🔍 Debugging SoundCloud Playlist Structure');
    console.log('==========================================');

    const playlistUrl = 'https://soundcloud.com/daniel-rodriguez-806/sets/wubz-4-amber?ref=clipboard&p=i&c=1&si=9DCAE9298D044BDDB6ABA9D3F53C09D7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

    const browser = await chromium.launch({ headless: false }); // Set to false to see what's happening
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    try {
        const page = await context.newPage();
        console.log('📡 Loading playlist page...');
        await page.goto(playlistUrl, { waitUntil: 'networkidle', timeout: 60000 });

        // Wait a bit for dynamic content to load
        await page.waitForTimeout(3000);

        console.log('📋 Analyzing page structure...');

        // Debug: Check what's actually on the page
        const pageInfo = await page.evaluate(() => {
            const info = {
                title: document.title,
                url: window.location.href,
                hasPlaylistContent: false,
                foundSelectors: [],
                allLinks: [],
                scripts: [],
                jsonLdData: []
            };

            // Check for playlist indicators
            const playlistIndicators = [
                '.trackItem',
                '.soundList__item',
                '.track__title',
                '.soundTitle__title',
                '.playlist',
                '.sound',
                'article',
                '[data-permalink-url]'
            ];

            playlistIndicators.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    info.foundSelectors.push(`${selector}: ${elements.length} elements`);
                    info.hasPlaylistContent = true;
                }
            });

            // Get all links
            const links = document.querySelectorAll('a[href]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && (href.includes('/') || href.includes('soundcloud'))) {
                    info.allLinks.push({
                        href: href,
                        text: link.textContent?.trim() || '',
                        classes: link.className || ''
                    });
                }
            });

            // Check JSON-LD scripts
            const jsonScripts = document.querySelectorAll('script[type="application/ld+json"]');
            jsonScripts.forEach((script, index) => {
                try {
                    const data = JSON.parse(script.textContent || '{}');
                    info.jsonLdData.push({
                        index: index,
                        type: data['@type'] || 'unknown',
                        hasName: !!data.name,
                        hasTracks: !!data.track || !!data.tracks,
                        keys: Object.keys(data)
                    });
                } catch (e) {
                    info.jsonLdData.push({
                        index: index,
                        error: 'Failed to parse JSON'
                    });
                }
            });

            // Check for any script containing track data
            const allScripts = document.querySelectorAll('script');
            allScripts.forEach((script, index) => {
                const content = script.textContent || '';
                if (content.includes('soundcloud.com') && content.includes('track')) {
                    info.scripts.push({
                        index: index,
                        hasTrackData: true,
                        length: content.length
                    });
                }
            });

            return info;
        });

        console.log('\n📊 Page Analysis Results:');
        console.log('========================');
        console.log(`Title: ${pageInfo.title}`);
        console.log(`URL: ${pageInfo.url}`);
        console.log(`Has playlist content: ${pageInfo.hasPlaylistContent}`);

        if (pageInfo.foundSelectors.length > 0) {
            console.log('\n✅ Found selectors:');
            pageInfo.foundSelectors.forEach(selector => {
                console.log(`  - ${selector}`);
            });
        } else {
            console.log('\n❌ No playlist selectors found');
        }

        if (pageInfo.jsonLdData.length > 0) {
            console.log('\n📄 JSON-LD Data:');
            pageInfo.jsonLdData.forEach(data => {
                console.log(`  - Script ${data.index}: Type=${data.type}, HasName=${data.hasName}, HasTracks=${data.hasTracks}`);
                if (data.keys) {
                    console.log(`    Keys: ${data.keys.join(', ')}`);
                }
            });
        }

        if (pageInfo.scripts.length > 0) {
            console.log('\n📜 Scripts with track data:');
            pageInfo.scripts.forEach(script => {
                console.log(`  - Script ${script.index}: ${script.length} characters`);
            });
        }

        console.log(`\n🔗 Found ${pageInfo.allLinks.length} links total`);

        // Filter for potential track links
        const trackLinks = pageInfo.allLinks.filter(link => {
            const href = link.href;
            return href &&
                (href.match(/^\/[^\/]+\/[^\/]+$/) || href.includes('soundcloud.com')) &&
                !href.includes('/sets/') &&
                !href.includes('/likes') &&
                !href.includes('/reposts') &&
                !href.includes('/followers') &&
                !href.includes('/following');
        });

        if (trackLinks.length > 0) {
            console.log('\n🎵 Potential track links found:');
            trackLinks.slice(0, 10).forEach((link, index) => {
                console.log(`  ${index + 1}. ${link.href} - "${link.text}"`);
            });
            if (trackLinks.length > 10) {
                console.log(`  ... and ${trackLinks.length - 10} more`);
            }
        } else {
            console.log('\n❌ No potential track links found');
        }

        // Take a screenshot for debugging
        await page.screenshot({ path: 'playlist-debug.png', fullPage: true });
        console.log('\n📸 Screenshot saved as playlist-debug.png');

        // Check if we need to scroll or interact with the page
        console.log('\n🔄 Checking if page needs interaction...');

        // Try scrolling to load more content
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(2000);

        // Check again after scrolling
        const afterScrollInfo = await page.evaluate(() => {
            const links = document.querySelectorAll('a[href]');
            return {
                totalLinks: links.length,
                trackLikeLinks: Array.from(links).filter(link => {
                    const href = link.getAttribute('href');
                    return href &&
                        (href.match(/^\/[^\/]+\/[^\/]+$/) || href.includes('soundcloud.com')) &&
                        !href.includes('/sets/');
                }).length
            };
        });

        console.log(`After scrolling: ${afterScrollInfo.totalLinks} total links, ${afterScrollInfo.trackLikeLinks} potential tracks`);

    } catch (error) {
        console.error('❌ Debug failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the debug
debugPlaylist().catch(console.error);
