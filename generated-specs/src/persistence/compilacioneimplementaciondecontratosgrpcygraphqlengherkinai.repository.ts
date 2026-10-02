import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi } from '@prisma/client';

@Injectable()
export class CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAiRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi | null> {
    return this.prisma.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.findUnique({ where: { id } });
  }

  async save(data: Omit<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi> {
    return this.prisma.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.compilacionEImplementacionDeContratosGRpcYGraphQlEnGherkinAi.delete({ where: { id } });
  }
}
