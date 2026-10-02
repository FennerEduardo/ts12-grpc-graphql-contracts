import { Module } from '@nestjs/common';
import { ApplicationCqrsModule } from './compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai/compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai.cqrs';

@Module({
  imports: [ApplicationCqrsModule]
})
export class AppModule {}
