import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CompilacineImplementacindeContratosgRPCyGraphQLengherkinai } from '@prisma/client';

@Injectable()
export class CompilacineImplementacindeContratosgRPCyGraphQLengherkinaiRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<CompilacineImplementacindeContratosgRPCyGraphQLengherkinai | null> {
    return this.prisma.compilacineimplementacindecontratosgrpcygraphqlengherkinai.findUnique({ where: { id } });
  }

  async save(data: Omit<CompilacineImplementacindeContratosgRPCyGraphQLengherkinai, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompilacineImplementacindeContratosgRPCyGraphQLengherkinai> {
    return this.prisma.compilacineimplementacindecontratosgrpcygraphqlengherkinai.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.compilacineimplementacindecontratosgrpcygraphqlengherkinai.delete({ where: { id } });
  }
}
