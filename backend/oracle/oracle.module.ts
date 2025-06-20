import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OracleController } from './oracle.controller';
import { OracleService } from './oracle.service';
import { PriceAggregatorService } from './price-aggregator.service';

@Module({
    imports: [HttpModule],
    controllers: [OracleController],
    providers: [OracleService, PriceAggregatorService],
    exports: [OracleService, PriceAggregatorService],
})
export class OracleModule { }
