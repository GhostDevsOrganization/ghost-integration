import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { PriceData, OracleStats, DataSource } from './interfaces/oracle.interface';

@Controller('oracle')
export class OracleController {
    constructor(private readonly oracleService: OracleService) { }

    @Get('stats')
    async getOracleStats(): Promise<OracleStats> {
        try {
            return await this.oracleService.getOracleStats();
        } catch (error) {
            throw new HttpException(
                'Failed to fetch oracle stats',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('prices')
    async getAllPrices(): Promise<PriceData[]> {
        try {
            return await this.oracleService.getAllPrices();
        } catch (error) {
            throw new HttpException(
                'Failed to fetch price data',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('price/:symbol')
    async getPrice(@Param('symbol') symbol: string): Promise<PriceData> {
        try {
            // Convert URL-safe symbol back to normal format
            const normalizedSymbol = symbol.replace('-', '/').toUpperCase();
            const priceData = await this.oracleService.getPriceData(normalizedSymbol);

            if (!priceData) {
                throw new HttpException(
                    `Price data not found for ${normalizedSymbol}`,
                    HttpStatus.NOT_FOUND,
                );
            }

            return priceData;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Failed to fetch price data',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('sources')
    async getDataSources(): Promise<DataSource[]> {
        try {
            return await this.oracleService.getDataSourcesStatus();
        } catch (error) {
            throw new HttpException(
                'Failed to fetch data sources status',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('health')
    async getHealth(): Promise<{ status: string; timestamp: string }> {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
        };
    }
}
