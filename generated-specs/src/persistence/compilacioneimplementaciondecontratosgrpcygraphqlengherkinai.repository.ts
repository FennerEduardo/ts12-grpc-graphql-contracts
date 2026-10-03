import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi } from '@prisma/client';

@Injectable()
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi | null> {
    return this.prisma.tenant.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.findUnique({ where: { id } });
  }

  async save(data: Omit<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi> {
    return this.prisma.tenant.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tenant.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.delete({ where: { id } });
  }
}
