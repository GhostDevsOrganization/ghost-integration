// Shared articles data for the blog platform
export const articles = [
    {
        id: 'mev-resistance-kaspa-solution',
        title: 'MEV Resistance: Kaspa\'s Solution to Blockchain\'s Extraction Crisis',
        excerpt: 'Maximal Extractable Value (MEV) represents one of the most significant threats to fair and decentralized blockchain ecosystems today. Kaspa\'s unique BlockDAG architecture provides a fundamental solution.',
        author: 'Editorial Team',
        date: '2024-01-15',
        readTime: '12 min',
        category: 'Technical',
        tags: ['MEV', 'BlockDAG', 'GHOSTDAG', 'Security'],
        featured: true,
        image: '/images/mev-resistance.jpg',
        content: `
# MEV Resistance: Kaspa's Solution to Blockchain's Extraction Crisis

Maximal Extractable Value (MEV) represents one of the most significant threats to fair and decentralized blockchain ecosystems today. Originally termed "Miner Extractable Value" during Ethereum's proof-of-work era, MEV refers to the value that can be extracted from block production beyond standard rewards by manipulating transaction ordering. Kaspa's unique BlockDAG architecture provides a fundamental solution to this systemic problem.

## Industry Impact

Since 2020, MEV extraction has evolved from an academic curiosity into a sophisticated industry worth over $686 million on Ethereum alone. In extreme cases, users can lose nearly all their funds—as happened in March 2023 when a trader lost approximately $215,000 (98% of their funds) during what should have been a simple stablecoin swap.

### Direct User Losses
Research has identified over 265,000 sandwich attacks affecting nearly 125,000 unique victims with losses totaling $20 million plus $9 million in reordering slippage.

### Centralization Risk
Block building centralization creates censorship risks, while MEV revenue advantages push solo validators to join larger staking pools, reducing network decentralization.

### DeFi Vulnerability
MEV infrastructure amplifies smart contract vulnerabilities through transaction transparency, flash loan amplification, and validator/miner collusion.

## How Kaspa Solves the MEV Problem

Unlike incremental solutions that try to mitigate MEV symptoms, Kaspa's innovative BlockDAG architecture addresses the root cause by fundamentally changing how transactions are ordered and validated:

### BlockDAG's Structural Advantage
In traditional blockchains, MEV extraction is possible because a single entity controls the ordering of transactions within each block. Kaspa's BlockDAG fundamentally breaks this monopoly by allowing multiple blocks to be created simultaneously. This parallel block production makes it impossible for a single miner to monopolize transaction ordering across the entire network.

**Technical Insight:** With 10 blocks per second (BPS), a front-runner would need to control the entire mining network for a sustained period to reliably execute sandwich attacks—a scenario that's economically infeasible in a properly decentralized network.

### GHOSTDAG's Role in MEV Prevention
The GHOSTDAG protocol's transaction ordering mechanism creates an environment where predictable transaction ordering (required for successful MEV extraction) becomes extremely difficult. By including multiple parallel blocks in the consensus DAG, GHOSTDAG creates uncertainty about which miner will include any given transaction.

**Blue Set Selection:** GHOSTDAG's blue set selection algorithm establishes a deterministic order for parallel blocks that's extremely difficult to manipulate, making it nearly impossible for extractors to reliably predict transaction sequencing.

> "Kaspa's BlockDAG architecture and GHOSTDAG protocol offer the only truly effective solution by addressing MEV at the protocol level. By enabling parallel block processing and implementing multi-leader consensus, Kaspa creates structural obstacles to MEV extraction rather than trying to patch vulnerabilities in fundamentally MEV-prone architectures."
        `
    },
    {
        id: 'blockdag-architecture-explained',
        title: 'BlockDAG Architecture: The Future of Blockchain Scalability',
        excerpt: 'Understanding how Kaspa\'s revolutionary BlockDAG structure enables parallel block processing and eliminates the fundamental throughput limitations of traditional blockchains.',
        author: 'Technical Team',
        date: '2024-01-10',
        readTime: '8 min',
        category: 'Technical',
        tags: ['BlockDAG', 'Scalability', 'Architecture'],
        featured: false,
        image: '/images/blockdag-architecture.jpg',
        content: `
# BlockDAG Architecture: The Future of Blockchain Scalability

At the heart of Kaspa's innovation is its BlockDAG (Directed Acyclic Graph) architecture, a radical departure from traditional linear blockchain structures. This architecture allows multiple blocks to be created and confirmed in parallel, fundamentally resolving the throughput limitations of conventional blockchains.

## How BlockDAG Works

- Multiple miners can create valid blocks simultaneously
- Each new block can reference multiple previous blocks
- The structure forms a directed acyclic graph rather than a linear chain
- Parallel block creation eliminates the fundamental throughput bottleneck
- GHOSTDAG protocol determines the main chain within the DAG structure

## Benefits of BlockDAG

### Scalability
Traditional blockchains are limited by the block time and block size. BlockDAG removes these constraints by allowing parallel processing.

### Security
Despite the parallel structure, BlockDAG maintains the same security guarantees as traditional blockchains through the GHOSTDAG consensus mechanism.

### Efficiency
No blocks are wasted or orphaned in a BlockDAG structure, making the network more efficient and reducing waste.

## Technical Implementation

The BlockDAG structure requires sophisticated consensus mechanisms to maintain order and prevent double-spending. Kaspa's GHOSTDAG protocol solves this challenge elegantly.
        `
    },
    {
        id: 'ghostdag-protocol-deep-dive',
        title: 'GHOSTDAG Protocol: Consensus in a Parallel World',
        excerpt: 'A deep dive into the GHOSTDAG consensus mechanism that enables Kaspa\'s BlockDAG to maintain security while processing multiple blocks simultaneously.',
        author: 'Research Team',
        date: '2024-01-05',
        readTime: '15 min',
        category: 'Research',
        tags: ['GHOSTDAG', 'Consensus', 'Protocol'],
        featured: false,
        image: '/images/ghostdag-protocol.jpg',
        content: `
# GHOSTDAG Protocol: Consensus in a Parallel World

GHOSTDAG (Greedy Heaviest-Observed Sub-Tree Directed Acyclic Graph) is Kaspa's consensus protocol that enables the BlockDAG structure while maintaining security. It's a generalization of Bitcoin's longest chain rule adapted for DAG structures.

## Key Features

- Maintains total ordering of blocks
- Prevents double-spending attacks
- Enables parallel block creation
- Preserves Bitcoin-level security

## How GHOSTDAG Works

The protocol uses a sophisticated algorithm to determine the main chain within the DAG structure, ensuring that all nodes agree on the order of transactions while allowing for parallel block production.

## Security Guarantees

Despite the complexity of the DAG structure, GHOSTDAG provides the same security guarantees as traditional blockchain consensus mechanisms.
        `
    },
    {
        id: 'krc20-tokens-ecosystem',
        title: 'KRC-20 Tokens: Building the Kaspa Ecosystem',
        excerpt: 'Exploring the KRC-20 token standard and how it enables a vibrant ecosystem of applications and use cases on the Kaspa network.',
        author: 'Ecosystem Team',
        date: '2024-01-01',
        readTime: '6 min',
        category: 'Ecosystem',
        tags: ['KRC-20', 'Tokens', 'DeFi'],
        featured: false,
        image: '/images/krc20-tokens.jpg',
        content: `
# KRC-20 Tokens: Building the Kaspa Ecosystem

KRC-20 is Kaspa's token standard, similar to Ethereum's ERC-20, enabling the creation of fungible tokens on the Kaspa network. This standard opens up possibilities for DeFi applications and token economies built on Kaspa's high-performance infrastructure.

## Token Creation Features

- Custom tokens with defined supply, decimals, and metadata
- Fast transfers leveraging Kaspa's high-speed network
- Low transaction fees for token operations

## Ecosystem Applications

The KRC-20 standard enables various applications including decentralized exchanges, lending protocols, and yield farming platforms.
        `
    },
    {
        id: 'layer2-solutions-overview',
        title: 'Layer 2 Solutions: Expanding Kaspa\'s Capabilities',
        excerpt: 'An overview of the Layer 2 solutions being built on Kaspa, including Sparkle, Kasplex, and Igra Network, and how they enhance the ecosystem.',
        author: 'Development Team',
        date: '2023-12-28',
        readTime: '10 min',
        category: 'Development',
        tags: ['Layer 2', 'Sparkle', 'Kasplex', 'Igra'],
        featured: false,
        image: '/images/layer2-solutions.jpg',
        content: `
# Layer 2 Solutions: Expanding Kaspa's Capabilities

Kaspa's ecosystem is expanding with various Layer 2 solutions that build upon the base layer's speed and security to enable new use cases and applications.

## Sparkle (Layer 1.5)
A "Layer 1.5" solution utilizing zero-knowledge proofs for enhanced scalability and privacy.

## Kasplex
Enables KRC-20/KRC-721 tokens through on-chain data inscription mechanisms.

## Igra Network
EVM-compatible Layer 2 solution to bring Ethereum ecosystem to Kaspa.

These solutions inherit Kaspa's MEV-resistant properties while adding new capabilities.
        `
    },
    {
        id: 'kaspa-tokenomics-fair-launch',
        title: 'Kaspa Tokenomics: The Power of Fair Launch',
        excerpt: 'Understanding Kaspa\'s fair launch model with no pre-mine, pre-sale, or token allocations, and how it ensures true decentralization.',
        author: 'Economics Team',
        date: '2023-12-20',
        readTime: '7 min',
        category: 'Economics',
        tags: ['Tokenomics', 'Fair Launch', 'Decentralization'],
        featured: false,
        image: '/images/kaspa-tokenomics.jpg',
        content: `
# Kaspa Tokenomics: The Power of Fair Launch

Kaspa features a fair and transparent tokenomics model with no pre-mine, pre-sale, or token allocations. The supply is purely determined by mining rewards and follows a deflationary emission schedule.

## Supply Details

- **Max Supply:** ~28.7 billion KAS
- **Current Supply:** ~24+ billion KAS
- **Block Reward:** Decreasing over time
- **Halving:** Smooth reduction (not abrupt)

## Fair Distribution

- **No Pre-mine:** 0% allocated to founders
- **No Pre-sale:** No early investor allocations
- **Pure PoW:** All tokens from mining
- **Community Driven:** Decentralized from day one

This fair launch model ensures true decentralization and community ownership.
        `
    }
];

export const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'technical', label: 'Technical' },
    { id: 'research', label: 'Research' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'development', label: 'Development' },
    { id: 'economics', label: 'Economics' }
];

export const hotTopics = [
    'MEV Resistance',
    'BlockDAG Architecture',
    'GHOSTDAG Protocol',
    'KRC-20 Tokens',
    'Layer 2 Solutions'
];
