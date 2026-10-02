// --------------------------------------------------------------------------
// Saga Contracts for CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi
// --------------------------------------------------------------------------

// === Events ===
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiInitiatedEvent {
  constructor(public readonly correlationId: string, public readonly compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiId: string, public readonly metadata: any) {}
}
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAuthorizedEvent {
  constructor(public readonly correlationId: string) {}
}
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompletedEvent {
  constructor(public readonly correlationId: string) {}
}
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiFailedEvent {
  constructor(public readonly correlationId: string, public readonly reason: string) {}
}

// === Commands ===
export class AuthorizeCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand {
  constructor(public readonly compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiId: string, public readonly metadata: any) {}
}
export class CompleteCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand {
  constructor(public readonly compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiId: string) {}
}
export class CompensateCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand {
  constructor(public readonly compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiId: string, public readonly reason: string) {}
}
