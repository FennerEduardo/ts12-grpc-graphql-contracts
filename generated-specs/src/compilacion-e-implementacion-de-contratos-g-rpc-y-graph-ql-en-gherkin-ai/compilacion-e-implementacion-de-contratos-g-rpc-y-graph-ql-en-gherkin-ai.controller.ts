import { Body, Controller, Headers, HttpException, HttpStatus, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandService } from '../runtime/command-service';
import { DomainValidationError } from './domain/compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai.aggregate';
import { JwtTenantGuard } from '../auth/jwt-tenant.guard';

const STATUS = { created: HttpStatus.ACCEPTED, replayed: HttpStatus.OK, 'in-progress': HttpStatus.CONFLICT } as const;

// ghk:implements CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi
@Controller('api/v1/compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai')
@UseGuards(JwtTenantGuard)
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiController {
  constructor(@Inject(CommandService) private readonly commands: CommandService) {}

  /** POST /api/v1/compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai/:id/:command (process_compilacion_e_implementacion_de_contratos_g_rpc_y_graph_ql_en_gherkin_ai) */
  @Post(':id/:command')
  async handle(
    @Param('id') id: string,
    @Param('command') command: string,
    @Body() payload: Record<string, unknown> | undefined,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Headers('traceparent') traceparent: string | undefined,
    @Req() req: { tenantId: string },
    @Res({ passthrough: true }) res: { status(code: number): unknown }
  ) {
    try {
      const result = await this.commands.handle({ tenantId: req.tenantId, aggregateType: 'CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi', aggregateId: id, command, payload: payload ?? {}, idempotencyKey, traceparent });
      res.status(STATUS[result.status]);
      return result;
    } catch (err) {
      // By name: every feature's domain module declares its own DomainValidationError class.
      if (err instanceof DomainValidationError || (err as Error)?.name === 'DomainValidationError') throw new HttpException((err as Error).message, HttpStatus.UNPROCESSABLE_ENTITY);
      throw err;
    }
  }
}
