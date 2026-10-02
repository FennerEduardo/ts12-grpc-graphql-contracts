import { CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAggregate, DomainValidationError } from './compilacion-e-implementacion-de-contratos-g-rpc-y-graph-ql-en-gherkin-ai.aggregate';

describe('CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAggregate', () => {
  it('starts in the initial state with no events', () => {
    const aggregate = new CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAggregate('agg-1');
    expect(aggregate.state).toBe('PENDING');
    expect(aggregate.version).toBe(0);
    expect(aggregate.pendingEvents).toHaveLength(0);
  });

  it('rejects an aggregate without id', () => {
    expect(() => new CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAggregate('')).toThrow(DomainValidationError);
  });

  it('processCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi records ProcessCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompleted and bumps the version', () => {
    const aggregate = new CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAggregate('agg-1');
    const event = aggregate.processCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi({ id: 'agg-1', payload: { source: 'test' } });
    expect(event.type).toBe('ProcessCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompleted');
    expect(event.version).toBe(1);
    expect(aggregate.version).toBe(1);
    expect(aggregate.pendingEvents).toEqual([event]);
  });

  it('processCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi rejects a command without id', () => {
    const aggregate = new CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAggregate('agg-1');
    expect(() => aggregate.processCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi({ id: '' })).toThrow(DomainValidationError);
    expect(aggregate.pendingEvents).toHaveLength(0);
  });
});
