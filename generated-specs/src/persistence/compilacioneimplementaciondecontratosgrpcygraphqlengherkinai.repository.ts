import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { currentTenant } from '../infrastructure/multitenancy/tenant.storage';
import type { CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi } from '@prisma/client';

@Injectable()
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi | null> {
    return this.prisma.tenant.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.findUnique({ where: { id } });
  }

  /** Creates a row for the tenant of the authenticated request (never a default tenant). */
  async save(data: Omit<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi> {
    return this.prisma.tenant.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.create({
      data: { ...data, tenantId: currentTenant() },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tenant.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.delete({ where: { id } });
  }
}
