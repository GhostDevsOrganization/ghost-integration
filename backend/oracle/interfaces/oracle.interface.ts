export interface PriceData {
    pair: string;
    price: number;
    change24h: number;
    volume: string;
    lastUpdate: string;
    status: 'active' | 'degraded' | 'offline';
    confidence: number;
    sources: number;
}

export interface OracleStats {
    totalFeeds: number;
    averageLatency: string;
    uptime: string;
    totalRequests: string;
    activeNodes: number;
    dataProviders: number;
}

export interface DataSource {
    name: string;
    status: 'online' | 'degraded' | 'offline';
    latency: string;
    reliability: number;
}

export interface SubscriptionData {
    feed: string;
    type: string;
    frequency: string;
    cost: string;
}
