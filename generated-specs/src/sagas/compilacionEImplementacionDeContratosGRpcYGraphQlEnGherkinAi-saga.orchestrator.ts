import { Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { PrismaService } from '../prisma/prisma.service';
import {
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiInitiatedEvent,
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAuthorizedEvent,
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompletedEvent,
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiFailedEvent,
  AuthorizeCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand,
  CompleteCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand,
  CompensateCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand,
} from './compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi-saga.contracts';

@Injectable()
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiSagaOrchestrator {
  private readonly logger = new Logger(CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiSagaOrchestrator.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Main entry point for events into the saga.
   * This acts as the state machine transition engine.
   */
  async handleEvent(event: any) {
    if (event instanceof CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiInitiatedEvent) {
      await this.handleInitiated(event);
    } else if (event instanceof CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAuthorizedEvent) {
      await this.handleAuthorized(event);
    } else if (event instanceof CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompletedEvent) {
      await this.handleCompleted(event);
    } else if (event instanceof CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiFailedEvent) {
      await this.handleFailed(event);
    }
  }

  private async handleInitiated(event: CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiInitiatedEvent) {
    this.logger.log(`Saga initiated: ${event.correlationId}`);
    
    // Save initial state to DB
    await this.prisma.sagaInstance.create({
      data: {
        id: event.correlationId,
        sagaType: 'CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi',
        currentState: 'STARTED',
        entityId: event.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiId,
        metadata: JSON.stringify(event.metadata),
      },
    });

    // Dispatch next command via EventBus (or Outbox)
    this.eventBus.publish(new AuthorizeCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand(event.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiId, event.metadata));
  }

  private async handleAuthorized(event: CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAuthorizedEvent) {
    this.logger.log(`Saga authorized: ${event.correlationId}`);

    const saga = await this.prisma.sagaInstance.findUnique({ where: { id: event.correlationId } });
    if (!saga) throw new Error(`Saga not found: ${event.correlationId}`);

    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'COMPLETING', updatedAt: new Date() },
    });

    this.eventBus.publish(new CompleteCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand(saga.entityId));
  }

  private async handleCompleted(event: CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompletedEvent) {
    this.logger.log(`Saga completed: ${event.correlationId}`);
    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'COMPLETED', updatedAt: new Date() },
    });
  }

  private async handleFailed(event: CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiFailedEvent) {
    this.logger.warn(`Saga failed: ${event.correlationId}, reason: ${event.reason}`);
    
    const saga = await this.prisma.sagaInstance.findUnique({ where: { id: event.correlationId } });
    if (!saga) throw new Error(`Saga not found: ${event.correlationId}`);

    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { 
        currentState: 'COMPENSATING', 
        errorReason: event.reason,
        updatedAt: new Date() 
      },
    });

    this.eventBus.publish(new CompensateCompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCommand(saga.entityId, event.reason));
    
    // Once compensation command is sent, we can mark it failed
    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'FAILED', updatedAt: new Date() },
    });
  }
}

// Global Event Handler to route events into the Saga Orchestrator
@EventsHandler(
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiInitiatedEvent,
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiAuthorizedEvent,
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiCompletedEvent,
  CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiFailedEvent,
)
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiSagaEventHandler implements IEventHandler<any> {
  constructor(private readonly orchestrator: CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiSagaOrchestrator) {}

  async handle(event: any) {
    await this.orchestrator.handleEvent(event);
  }
}
