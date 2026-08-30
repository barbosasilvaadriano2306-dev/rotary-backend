import { Controller, Post, Get, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  // 1. Rota de Cadastro (O que já tínhamos)
  @Post('auth/register')
  async register(@Body() data: any) {
    return this.prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        cargo: data.cargo || 'ROTARIANO',
      },
    });
  }

  // 2. Rota de Membros (O que estava faltando!)
  @Get('members')
  async getMembers() {
    // Busca todos os usuários do banco de dados (O Elefante Azul)
    return this.prisma.user.findMany({
      orderBy: { nome: 'asc' }, // Organiza por ordem alfabética
    });
  }

  // 3. Rota de Eventos/Agenda
  @Get('events')
  async getEvents() {
    // Por enquanto, enviamos uma lista fixa para o MVP
    return [
      { 
        id: '1', 
        titulo: 'Reunião Ordinária', 
        data: 'Próxima Terça, 20:00', 
        local: 'Hotel Marriott Guarulhos' 
      },
      { 
        id: '2', 
        titulo: 'Ação Social: Entrega de Alimentos', 
        data: 'Sábado, 09:00', 
        local: 'Bairro Pimentas' 
      }
    ];
  }
}
