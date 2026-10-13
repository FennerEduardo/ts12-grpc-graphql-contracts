import { Module } from '@nestjs/common';
import { RuntimeModule } from './runtime/runtime.module';
import { CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiModule } from './compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai/compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai.module';

@Module({
  imports: [RuntimeModule, CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiModule]
})
export class AppModule {}
