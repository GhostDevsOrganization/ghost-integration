// ghost-integration-gitbook-generator.js
// Complete GitBook automation script for Cline

require('dotenv').config();
const axios = require('axios');

// Configuration
const GITBOOK_API_URL = 'https://api.gitbook.com/v1';
const API_TOKEN = 'gb_api_b2GNASKdvja65EcHK7ZbAs7n80MrjtcINitrvcHj';
const SPACE_ID = process.env.GITBOOK_SPACE_ID || 'YOUR_SPACE_ID_HERE'; // Get from GitBook URL

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
};

// Complete documentation structure
const documentationStructure = [
    {
        title: "Welcome to Ghost Integration",
        content: `# Ghost Integration: Seamless Crypto Transactions

The first integrated solution that lets you move seamlessly between platforms without the complexity. This comprehensive guide covers everything you need to make the most of the Ghost Integration app.

## What is Ghost Integration?

Ghost Integration streamlines cryptocurrency operations by connecting multiple platforms and services into a single, unified workflow. Unlike traditional approaches that require multiple apps and complex steps, this integration wraps several functions together, saving you time and reducing potential errors.

## Key Capabilities

- **Buy cryptocurrency** through familiar platforms like Venmo
- **Send crypto** to any destination wallet or service
- **Swap between cryptocurrencies** (e.g., BTC to USDC)
- **Off-ramp to fiat** currency through integrated exchanges

## Why Choose Ghost Integration?

Traditional crypto operations require:
- Multiple apps and accounts
- Manual transfers between platforms
- Complex multi-step processes
- High risk of errors

**Ghost Integration simplifies this to single-click operations.**

## Quick Start

Ready to get started? Head to our [Getting Started](/getting-started) guide to create your account and connect your first platform.`
    },
    {
        title: "Getting Started",
        content: `# Getting Started

Setting up your Ghost Integration account is straightforward and designed to get you transacting quickly.

## Creating Your Account

1. **Visit** [ghost-integration-3gmm.vercel.app](https://ghost-integration-3gmm.vercel.app)
2. **Click** the "Sign Up" button in the top right corner
3. **Enter** your email address and create a secure password
4. **Verify** your email through the link sent to your inbox
5. **Complete** your profile with required information

## Connecting Your First Platform

Before you can start using the integration features, you'll need to connect at least one external platform:

1. **Navigate** to the "Integrations" tab from your dashboard
2. **Select** the platform you want to connect (e.g., Venmo, Coinbase)
3. **Follow** the authentication steps for the selected platform
4. **Verify** connection through the test transaction feature
5. **Repeat** for additional platforms you wish to integrate

## Security Setup

> **🔒 Security Tip**: While connecting platforms provides convenience, always review the permissions requested and enable additional security features like two-factor authentication where available.

### Enable Two-Factor Authentication
1. Go to **Account Settings** → **Security**
2. Click **"Enable 2FA"**
3. Scan the QR code with your authenticator app
4. Enter the verification code

## Next Steps

Once your account is set up:
- Explore [Core Workflows](/core-workflows) to learn basic operations
- Check out [Platform-Specific Guides](/platform-guides) for detailed integration info
- Review [Security Best Practices](/security) to keep your assets safe`
    },
    {
        title: "Core Workflows",
        content: `# Core Workflows

Ghost Integration excels at simplifying typically complex crypto workflows. Each process combines multiple traditional steps into a streamlined experience.

## Buying and Sending in One Step

Traditionally, buying crypto and sending it requires multiple apps and manual steps. Ghost Integration combines these actions:

### Process
1. **Select** "Buy & Send" from your dashboard
2. **Choose** your source platform (e.g., Venmo)
3. **Select** the cryptocurrency you wish to purchase (e.g., ETH)
4. **Enter** the destination address or select from saved addresses
5. **Review** and confirm the transaction details
6. **Authenticate** with your source platform as prompted
7. **Track** the transaction status in real-time

### Benefits
- ✅ No manual transfers between wallets
- ✅ Reduced transaction fees
- ✅ Single authentication flow
- ✅ Real-time status tracking

## Simplified Off-ramping

Converting cryptocurrency back to traditional currency typically involves multiple platforms. The integrated off-ramping process streamlines this:

### Process
1. **Select** "Off-Ramp" from the main navigation
2. **Choose** the cryptocurrency you wish to convert
3. **Select** your preferred exchange (e.g., Kraken, Coinbase)
4. **Enter** the amount to convert
5. **Review** the exchange rate and fees
6. **Confirm** and track the transaction

### Smart Routing
The platform intelligently routes your transaction through the most cost-effective exchanges, automatically:
- Finding the best exchange rates
- Minimizing fees across platforms
- Handling currency conversions
- Optimizing transaction timing

> **💡 Pro Tip**: For large amounts, the platform will automatically split transactions across multiple exchanges to get better rates and reduce slippage.

## Multi-Currency Swaps

For complex trading needs, the platform supports intelligent multi-step conversions:

1. **Select** "Advanced Swap" from the Swap menu
2. **Configure** your starting and desired end currency
3. **Review** the automatically calculated conversion path
4. **Confirm** and track the multi-step process

The system finds the most efficient path, even if it requires intermediate conversions through multiple currencies.`
    },
    {
        title: "Advanced Features",
        content: `# Advanced Features

Once you're comfortable with basic workflows, these advanced features will enhance your experience.

## Creating Saved Workflows

For operations you perform regularly, saved workflows eliminate repetitive setup:

### Creating a Template
1. **Complete** a transaction using any core workflow
2. **Select** "Save as Template" on the confirmation screen
3. **Name** your workflow and add optional notes
4. **Access** saved workflows from the dashboard for one-click initiation

### Template Types
- **Regular purchases** (weekly ETH buys)
- **Portfolio rebalancing** (monthly allocation adjustments)
- **Bill payments** (recurring off-ramps for expenses)

## Setting Up Recurring Transactions

Automate regular purchases or transfers:

### Configuration
1. **Create** a new workflow or select existing saved workflow
2. **Toggle** the "Make Recurring" option
3. **Set** your preferred frequency (daily, weekly, monthly)
4. **Configure** start date and optional end date
5. **Review** and confirm the recurring schedule

### Smart Scheduling
- **Dollar-cost averaging** for investment strategies
- **Threshold-based** triggers (buy when price drops below X)
- **Balance-based** triggers (maintain minimum USDC balance)

## API Access

For programmatic integration:

### Getting Started
1. **Request** API access through the developer portal
2. **Generate** API keys with appropriate permission scopes
3. **Review** the API documentation for endpoint details
4. **Implement** webhook listeners for real-time updates

### Use Cases
- **Portfolio tracking** integration with external tools
- **Automated trading** based on market conditions
- **Business integrations** for payment processing
- **Analytics** and reporting automation

## White-label Solutions

For businesses wanting to offer these capabilities under their own brand:

### Setup Process
1. **Contact** our partnership team through the business portal
2. **Configure** branding elements (logos, colors, domains)
3. **Set up** custom domains for user access
4. **Establish** billing and support workflows

### Enterprise Features
- **Custom fee structures**
- **Advanced user management**
- **Compliance reporting**
- **Priority support channels**`
    },
    {
        title: "Platform-Specific Guides",
        content: `# Platform-Specific Guides

Each integrated platform has unique characteristics and capabilities. These sections provide platform-specific optimization details.

## Venmo Integration

Venmo offers a familiar interface for purchasing cryptocurrency that can then be seamlessly transferred through Ghost Integration.

### Key Benefits
- ✅ Use existing Venmo balance or connected payment methods
- ✅ Leverage Venmo's user-friendly mobile experience
- ✅ Take advantage of Venmo's social features for group transactions
- ✅ Instant purchases with linked bank accounts

### Common Workflows
- **Personal investing**: Buy ETH through Venmo, send to hardware wallet
- **Group purchases**: Split crypto purchases with friends using Venmo's social features
- **Balance conversion**: Convert Venmo balance to cryptocurrency for investment

### Tips & Limitations
- **Daily limits**: Venmo has daily purchase limits for crypto
- **Transfer restrictions**: Some crypto purchased on Venmo has holding periods
- **Fee structure**: Review Venmo's crypto fees vs. traditional purchase methods

## Kraken Integration

Kraken provides advanced trading features and competitive rates for cryptocurrency swapping and off-ramping.

### Key Benefits
- ✅ Access to extensive trading pairs for efficient swapping
- ✅ Competitive exchange rates for off-ramping to fiat
- ✅ Advanced security features and compliance
- ✅ Professional-grade trading tools

### Common Workflows
- **Advanced trading**: Swap BTC to USDC using limit orders
- **Efficient off-ramping**: Convert crypto to fiat at competitive rates
- **Portfolio management**: Execute complex trading strategies

### Advanced Features
- **Margin trading** integration for leveraged positions
- **Staking rewards** automatic reinvestment
- **OTC trading** for large volume transactions

## Coinbase Integration

Coinbase offers broad cryptocurrency support and robust off-ramping capabilities.

### Key Benefits
- ✅ Support for 100+ cryptocurrencies
- ✅ User-friendly interface for beginners
- ✅ Established off-ramping to multiple fiat currencies
- ✅ Educational resources and market insights

### Common Workflows
- **Diversified investing**: Access to wide range of altcoins
- **International transfers**: Off-ramp to various fiat currencies
- **Learning integration**: Access Coinbase Earn directly through the platform

### Coinbase Pro Integration
- **Lower fees** for frequent traders
- **Advanced order types** (limit, stop, market)
- **Professional charting** and analysis tools

## Cross-Platform Optimization

### Fee Minimization Strategies
1. **Route optimization**: Automatically find lowest-fee paths
2. **Timing optimization**: Execute trades during low-fee periods
3. **Volume aggregation**: Combine small trades for better rates

### Security Considerations
- **Platform-specific 2FA**: Enable on all connected platforms
- **API key management**: Regular rotation and permission audits
- **Transaction monitoring**: Automated alerts for unusual activity`
    },
    {
        title: "Use Case Examples",
        content: `# Use Case Examples

Real-world scenarios demonstrating how Ghost Integration simplifies complex crypto operations.

## Content Creator Monetization

**Scenario**: Ghost CMS content creator accepting cryptocurrency payments and converting to fiat for expenses.

### Traditional Approach (Complex)
1. Receive crypto payments to various wallets
2. Manually consolidate funds across platforms
3. Transfer to exchange for conversion
4. Convert to fiat and withdraw to bank
5. Track everything manually for taxes

### Ghost Integration Approach (Simple)
1. **Connect** Ghost platform through CMS integration
2. **Configure** payment options for subscribers
3. **Set up** automated off-ramping workflow
4. **Review** consolidated reporting dashboard

**Time saved**: 3-4 hours weekly → 15 minutes weekly

### Advanced Setup
- **Automated conversion** when balance reaches threshold
- **Tax reporting** integration with accounting software
- **Multi-currency support** for international subscribers

## Cross-Platform Investing

**Scenario**: Crypto investor diversifying across platforms and currencies.

### Investment Strategy
1. **Purchase** initial crypto through preferred platform (Venmo)
2. **Diversify** into multiple currencies using swap feature
3. **Distribute** investments across wallets/platforms
4. **Track** portfolio performance through unified dashboard

### Sample Monthly Workflow
\`\`\`
Month 1: $1000 → Venmo ETH → 50% hold, 30% BTC swap, 20% USDC
Month 2: Rebalance based on performance
Month 3: Take profits via optimized off-ramping
\`\`\`

### Benefits
- **Reduced fees** through intelligent routing
- **Time efficiency** with automated workflows
- **Better diversification** across platforms
- **Simplified tracking** and reporting

## Efficient Off-ramping for Expenses

**Scenario**: Regular conversion of crypto holdings to fiat for monthly expenses.

### Smart Automation Setup
1. **Configure** recurring swap from preferred crypto to stablecoin
2. **Set up** automated off-ramping at specified thresholds
3. **Connect** bank account for direct deposits
4. **Enable** notifications for transaction completion

### Example Configuration
- **Trigger**: When USDC balance > $2000
- **Action**: Off-ramp $1500 to checking account
- **Frequency**: Weekly check, monthly execution
- **Backup**: Manual override for emergency expenses

### Cost Savings
- **Traditional method**: 2-3% total fees
- **Ghost Integration**: 0.8-1.2% total fees
- **Annual savings** on $24,000: $288-$528

## Business Payment Processing

**Scenario**: E-commerce business accepting crypto payments and managing cash flow.

### Business Workflow
1. **Accept** crypto payments through integrated checkout
2. **Automatically** convert specified percentage to fiat
3. **Maintain** crypto reserves for hedging
4. **Generate** reports for accounting and compliance

### Risk Management
- **Instant conversion** for price stability
- **Partial hedging** strategies
- **Automated compliance** reporting
- **Multi-signature** security for large amounts

## DeFi Yield Farming Optimization

**Scenario**: Advanced user optimizing yield across multiple DeFi protocols.

### Strategy Implementation
1. **Monitor** yield opportunities across platforms
2. **Automatically** move funds to highest-yield options
3. **Compound** rewards efficiently
4. **Rebalance** based on risk parameters

### Automation Features
- **Yield tracking** across 50+ protocols
- **Gas optimization** for Ethereum transactions
- **Risk assessment** integration
- **Tax-loss harvesting** opportunities

## Retirement Planning with Crypto

**Scenario**: Long-term investor using crypto for retirement planning.

### Systematic Approach
1. **Dollar-cost average** into crypto monthly
2. **Rebalance** portfolio quarterly
3. **Take profits** systematically as retirement approaches
4. **Convert** to stable assets for income generation

### Lifecycle Management
- **Accumulation phase**: Aggressive growth strategies
- **Pre-retirement**: Risk reduction and stabilization
- **Retirement**: Income generation and preservation`
    },
    {
        title: "Troubleshooting and Support",
        content: `# Troubleshooting and Support

Quick solutions for common issues and comprehensive support resources.

## Transaction Issues

### Transaction Delays
If a transaction is taking longer than expected:

1. **Check status** in your dashboard transaction history
2. **Verify network conditions** for the relevant blockchain
3. **Confirm** all platforms in the workflow are operational
4. **Review** blockchain explorer for transaction details
5. **Contact support** if delays exceed 24 hours

**Common causes:**
- Network congestion during high activity periods
- Platform maintenance windows
- Enhanced security reviews for large amounts

### Failed Transactions
When transactions fail:

1. **Review error message** in transaction details
2. **Check account balances** including fees
3. **Verify** destination addresses are correct
4. **Ensure** platform connections are active
5. **Retry** with adjusted parameters if needed

## Connection Issues

### Platform Authentication Problems
If you're experiencing connection issues:

1. **Verify** login credentials for the external platform
2. **Check** for API limits or security triggers
3. **Disconnect and reconnect** through Integrations panel
4. **Update permissions** if requested by external platform
5. **Clear browser cache** and cookies

### API Connectivity
For developers experiencing API issues:

1. **Verify** API key permissions and scope
2. **Check** rate limiting status
3. **Review** API endpoint status page
4. **Validate** request formatting and headers
5. **Implement** proper error handling and retries

## Common Error Messages

### "Insufficient Funds"
**Solution**: Ensure source account has adequate balance including all fees

**Details to check:**
- Base transaction amount
- Platform trading fees
- Network gas fees
- Minimum balance requirements

### "Address Validation Failed"
**Solution**: Double-check destination addresses for accuracy

**Prevention tips:**
- Use address book for frequent destinations
- Copy-paste addresses, never type manually
- Verify address format matches currency type
- Test with small amounts first

### "Rate Limit Exceeded"
**Solution**: Wait the specified time before retrying

**Understanding rate limits:**
- Most platforms: 100 requests/minute
- Large operations may trigger additional delays
- Automated workflows include built-in throttling

### "Platform Unavailable"
**Solution**: Check the status page and try again later

**What to do:**
- Monitor our status page for updates
- Enable notifications for service restoration
- Use alternative platforms if urgent

## Performance Optimization

### Slow Transaction Processing
To improve transaction speed:

1. **Use faster payment methods** (bank vs. credit card)
2. **Optimize timing** (avoid peak network hours)
3. **Consider higher fees** for priority processing
4. **Batch smaller transactions** when possible

### Dashboard Loading Issues
If the dashboard is slow:

1. **Clear browser cache** and data
2. **Disable browser extensions** temporarily
3. **Check internet connection** stability
4. **Try incognito/private browsing** mode
5. **Update browser** to latest version

## Security Alerts

### Unusual Activity Detected
If you receive security alerts:

1. **Review** recent account activity immediately
2. **Change passwords** for all connected accounts
3. **Revoke** API access for unknown applications
4. **Enable** additional security measures
5. **Contact support** if unauthorized activity found

### Compromised Account Recovery
For suspected account compromise:

1. **Immediately** change all passwords
2. **Revoke** all API tokens and connections
3. **Enable** two-factor authentication everywhere
4. **Review** all recent transactions
5. **Contact** our emergency security team

## Getting Additional Help

### Support Channels
- **Email**: support@ghostintegration.com (24-48 hour response)
- **Live Chat**: Available 9 AM - 9 PM EST
- **Community Forum**: community.ghostintegration.com
- **Developer Discord**: discord.gg/ghostintegration

### What to Include in Support Requests
1. **Account email** (for verification)
2. **Transaction IDs** for specific issues
3. **Screenshots** of error messages
4. **Steps to reproduce** the problem
5. **Browser and device** information

### Emergency Contacts
For urgent security issues:
- **Security Hotline**: +1-800-GHOST-911
- **Emergency Email**: security@ghostintegration.com
- **Response Time**: Within 2 hours, 24/7`
    },
    {
        title: "Security Best Practices",
        content: `# Security Best Practices

Protecting your assets is paramount when working with cryptocurrency. Follow these guidelines to maintain maximum security.

## Account Protection

### Strong Authentication
Secure your Ghost Integration account:

1. **Use unique passwords** not shared with other services
2. **Enable two-factor authentication** through security settings
3. **Review connected applications** regularly and revoke unused access
4. **Set up IP restrictions** for additional login security
5. **Use hardware security keys** when available

### Password Management
- **Use password managers** (1Password, Bitwarden, LastPass)
- **Enable auto-generated passwords** for maximum strength
- **Never reuse passwords** across crypto-related services
- **Update passwords quarterly** or after any security incident

## Transaction Security

### Verification Protocols
Before confirming any transaction:

1. **Double-check destination addresses** character by character
2. **Verify transaction amounts** and all associated fees
3. **Confirm exchange rates** are within expected ranges
4. **Use test transactions** for new workflows or destinations
5. **Review transaction summaries** carefully before final approval

### Address Management
- **Use address books** for frequently used destinations
- **Verify new addresses** through multiple channels when possible
- **Never share private keys** or seed phrases
- **Use hardware wallets** for large amount storage

## Platform Security

### Connected Account Security
For each connected platform (Venmo, Coinbase, Kraken):

1. **Enable platform-specific 2FA** on all accounts
2. **Use different passwords** for each platform
3. **Review API permissions** regularly
4. **Monitor account activity** notifications
5. **Set up withdrawal alerts** and limits

### API Key Management
- **Limit API permissions** to only necessary functions
- **Rotate API keys** quarterly or after team changes
- **Store keys securely** using environment variables
- **Never commit keys** to version control
- **Monitor API usage** for unusual patterns

## Network Security

### Safe Browsing Practices
1. **Always verify URLs** before entering credentials
2. **Use bookmarks** for frequently visited sites
3. **Check SSL certificates** (green lock icon)
4. **Avoid public WiFi** for crypto transactions
5. **Keep browsers updated** with latest security patches

### Device Security
- **Use updated operating systems** with security patches
- **Install reputable antivirus software**
- **Enable device encryption** (FileVault, BitLocker)
- **Use device lock screens** with strong PINs/passwords
- **Avoid shared or public computers** for crypto access

## Monitoring and Alerts

### Transaction Monitoring
Set up comprehensive monitoring:

1. **Enable email alerts** for all transactions
2. **Set up SMS notifications** for large amounts
3. **Review statements** weekly for unauthorized activity
4. **Monitor blockchain explorers** for transaction confirmations
5. **Track wallet balances** across all platforms

### Security Alerts
Configure alerts for:
- **New device logins**
- **Password changes**
- **API key usage**
- **Large transactions**
- **Failed authentication attempts**

## Incident Response

### If You Suspect Compromise
Immediate actions:

1. **Change all passwords** immediately
2. **Revoke API access** for all applications
3. **Contact platform support** for all connected services
4. **Review transaction history** for unauthorized activity
5. **Enable additional security measures**

### Recovery Procedures
- **Document all suspicious activity** with screenshots
- **Contact Ghost Integration security team** immediately
- **File reports** with relevant law enforcement if needed
- **Work with platforms** to freeze compromised accounts
- **Update security practices** to prevent recurrence

## Advanced Security Measures

### Multi-Signature Wallets
For large amounts:
- **Use multi-sig wallets** requiring multiple approvals
- **Distribute signing keys** across secure locations
- **Set up time delays** for large withdrawals
- **Implement social recovery** mechanisms

### Cold Storage Integration
- **Store majority of funds** in offline hardware wallets
- **Use hot wallets** only for operational amounts
- **Implement proper** backup and recovery procedures
- **Test recovery processes** regularly

### Insurance and Legal Protection
- **Review platform insurance** coverage and limitations
- **Consider additional** crypto insurance policies
- **Understand legal protections** in your jurisdiction
- **Keep detailed records** for legal and tax purposes

## Compliance and Regulations

### Know Your Customer (KYC)
- **Complete verification** on all platforms promptly
- **Keep documentation** current and accessible
- **Understand reporting requirements** in your jurisdiction
- **Maintain transaction records** for tax purposes

### Anti-Money Laundering (AML)
- **Source funds** only from legitimate sources
- **Avoid suspicious** transaction patterns
- **Report large transactions** as required by law
- **Cooperate with platform** compliance requests

## Regular Security Audits

### Monthly Security Review
1. **Review all connected accounts** and permissions
2. **Update passwords** that are over 90 days old
3. **Check transaction history** for anomalies
4. **Verify contact information** is current
5. **Test backup and recovery** procedures

### Quarterly Security Assessment
- **Full security audit** of all accounts and practices
- **Update emergency contact** information
- **Review and update** security policies
- **Train team members** on security best practices
- **Assess new security tools** and technologies`
    }
];

// Function to create a page in GitBook
async function createPage(spaceId, title, content) {
    try {
        const pageData = {
            title: title,
            content: {
                format: 'markdown',
                content: content
            }
        };

        console.log(`📝 Creating page: ${title}...`);

        const response = await axios.post(
            `${GITBOOK_API_URL}/spaces/${spaceId}/content`,
            pageData,
            { headers }
        );

        console.log(`✅ Successfully created: ${title}`);
        return response.data;

    } catch (error) {
        console.error(`❌ Failed to create page: ${title}`);
        console.error('Error details:', error.response?.data || error.message);
        return null;
    }
}

// Function to get space info
async function getSpaceInfo(spaceId) {
    try {
        const response = await axios.get(
            `${GITBOOK_API_URL}/spaces/${spaceId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('❌ Failed to get space info:', error.response?.data || error.message);
        return null;
    }
}

// Main function to generate all documentation
async function generateDocumentation() {
    console.log('🚀 Starting Ghost Integration GitBook generation...\n');

    // Validate space ID
    if (SPACE_ID === 'YOUR_SPACE_ID_HERE') {
        console.error('❌ Please set your SPACE_ID in the script or environment variable');
        console.log('💡 Get your Space ID from your GitBook space URL (after /s/)');
        return;
    }

    // Get space info
    console.log('🔍 Validating space access...');
    const spaceInfo = await getSpaceInfo(SPACE_ID);
    if (!spaceInfo) {
        console.error('❌ Cannot access space. Check your SPACE_ID and API token.');
        return;
    }

    console.log(`✅ Connected to space: ${spaceInfo.title}\n`);

    // Create all pages
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < documentationStructure.length; i++) {
        const page = documentationStructure[i];

        console.log(`📄 [${i + 1}/${documentationStructure.length}] Processing: ${page.title}`);

        const result = await createPage(SPACE_ID, page.title, page.content);

        if (result) {
            successCount++;
        } else {
            failCount++;
        }

        // Rate limiting - wait 2 seconds between requests
        if (i < documentationStructure.length - 1) {
            console.log('⏳ Waiting 2 seconds to respect rate limits...\n');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 GENERATION COMPLETE');
    console.log('='.repeat(50));
    console.log(`✅ Successfully created: ${successCount} pages`);
    console.log(`❌ Failed to create: ${failCount} pages`);
    console.log(`📖 Total pages: ${documentationStructure.length}`);

    if (successCount > 0) {
        console.log('\n🎉 Your Ghost Integration documentation is ready!');
        console.log(`🔗 View your space: https://app.gitbook.com/s/${SPACE_ID}`);
        console.log('\n📋 Next steps:');
        console.log('   1. Review and edit content in GitBook');
        console.log('   2. Customize styling and branding');
        console.log('   3. Set up custom domain (optional)');
        console.log('   4. Publish your documentation');
    }
}

// Export for module use
module.exports = { generateDocumentation, createPage, getSpaceInfo };

// Run if called directly
if (require.main === module) {
    generateDocumentation().catch(console.error);
}
