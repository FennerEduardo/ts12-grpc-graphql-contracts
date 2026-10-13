import { Module } from '@nestjs/common';
import type { Pool } from 'pg';
import { CommandService } from '../runtime/command-service';
import { PG_POOL } from '../runtime/runtime.module';
import { CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiController } from './compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai.controller';

@Module({
  controllers: [CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiController],
  providers: [{ provide: CommandService, useFactory: (pool: Pool) => new CommandService(pool), inject: [PG_POOL] }]
})
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiModule {}
