import { Injectable, Logger } from '@nestjs/common';
import { PriceData } from './interfaces/oracle.interface';

@Injectable()
export class PriceAggregatorService {
    private readonly logger = new Logger(PriceAggregatorService.name);

    /**
     * Aggregates price data from multiple sources using weighted average
     * @param priceDataArray Array of price data from different sources
     * @returns Aggregated price data
     */
    aggregatePrices(priceDataArray: PriceData[]): PriceData | null {
        if (!priceDataArray || priceDataArray.length === 0) {
            return null;
        }

        if (priceDataArray.length === 1) {
            return priceDataArray[0];
        }

        try {
            // Calculate weighted average based on confidence and source count
            let totalWeight = 0;
            let weightedPrice = 0;
            let weightedChange = 0;
            let totalVolume = 0;
            let totalSources = 0;
            let minConfidence = 100;

            priceDataArray.forEach(data => {
                const weight = this.calculateWeight(data);
                totalWeight += weight;
                weightedPrice += data.price * weight;
                weightedChange += data.change24h * weight;
                totalSources += data.sources;
                minConfidence = Math.min(minConfidence, data.confidence);

                // Extract numeric value from volume string for aggregation
                const volumeValue = this.parseVolumeString(data.volume);
                totalVolume += volumeValue;
            });

            if (totalWeight === 0) {
                return priceDataArray[0]; // Fallback to first source
            }

            const aggregatedPrice = weightedPrice / totalWeight;
            const aggregatedChange = weightedChange / totalWeight;
            const aggregatedConfidence = this.calculateAggregatedConfidence(priceDataArray, minConfidence);

            return {
                pair: priceDataArray[0].pair,
                price: aggregatedPrice,
                change24h: aggregatedChange,
                volume: this.formatVolume(totalVolume),
                lastUpdate: 'just now',
                status: this.determineAggregatedStatus(priceDataArray),
                confidence: aggregatedConfidence,
                sources: totalSources
            };
        } catch (error) {
            this.logger.error('Error aggregating prices:', error);
            return priceDataArray[0]; // Fallback to first source
        }
    }

    private calculateWeight(data: PriceData): number {
        // Weight calculation based on confidence, source count, and freshness
        const confidenceWeight = data.confidence / 100;
        const sourceWeight = Math.min(data.sources / 5, 1); // Normalize to max 5 sources
        const statusWeight = data.status === 'active' ? 1 : 0.5;

        return confidenceWeight * sourceWeight * statusWeight;
    }

    private parseVolumeString(volumeStr: string): number {
        // Parse volume string like "$2.1M", "$15.2B", etc.
        const cleanStr = volumeStr.replace('$', '').toLowerCase();

        if (cleanStr.includes('b')) {
            return parseFloat(cleanStr.replace('b', '')) * 1e9;
        } else if (cleanStr.includes('m')) {
            return parseFloat(cleanStr.replace('m', '')) * 1e6;
        } else if (cleanStr.includes('k')) {
            return parseFloat(cleanStr.replace('k', '')) * 1e3;
        }

        return parseFloat(cleanStr) || 0;
    }

    private formatVolume(volume: number): string {
        if (volume >= 1e9) {
            return `$${(volume / 1e9).toFixed(1)}B`;
        } else if (volume >= 1e6) {
            return `$${(volume / 1e6).toFixed(1)}M`;
        } else if (volume >= 1e3) {
            return `$${(volume / 1e3).toFixed(1)}K`;
        }
        return `$${volume.toFixed(0)}`;
    }

    private calculateAggregatedConfidence(priceDataArray: PriceData[], minConfidence: number): number {
        // Use weighted average of confidence scores, but cap at minimum confidence
        const avgConfidence = priceDataArray.reduce((sum, data) => sum + data.confidence, 0) / priceDataArray.length;

        // Boost confidence if multiple sources agree (within 1% of each other)
        const prices = priceDataArray.map(d => d.price);
        const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const priceVariance = prices.every(price => Math.abs(price - avgPrice) / avgPrice < 0.01);

        const confidenceBoost = priceVariance && priceDataArray.length > 1 ? 1.5 : 1;

        return Math.min(99.9, avgConfidence * confidenceBoost);
    }

    private determineAggregatedStatus(priceDataArray: PriceData[]): 'active' | 'degraded' | 'offline' {
        const activeCount = priceDataArray.filter(d => d.status === 'active').length;
        const totalCount = priceDataArray.length;

        if (activeCount === totalCount) {
            return 'active';
        } else if (activeCount > 0) {
            return 'degraded';
        } else {
            return 'offline';
        }
    }

    /**
     * Validates price data for anomalies
     * @param priceData Price data to validate
     * @param historicalAverage Optional historical average for comparison
     * @returns true if data appears valid, false otherwise
     */
    validatePriceData(priceData: PriceData, historicalAverage?: number): boolean {
        if (!priceData || priceData.price <= 0) {
            return false;
        }

        // Check for extreme price movements (more than 50% change)
        if (Math.abs(priceData.change24h) > 50) {
            this.logger.warn(`Extreme price movement detected for ${priceData.pair}: ${priceData.change24h}%`);
            return false;
        }

        // Check against historical average if provided
        if (historicalAverage && historicalAverage > 0) {
            const deviation = Math.abs(priceData.price - historicalAverage) / historicalAverage;
            if (deviation > 0.3) { // 30% deviation threshold
                this.logger.warn(`Price deviation detected for ${priceData.pair}: ${(deviation * 100).toFixed(1)}%`);
                return false;
            }
        }

        return true;
    }
}
