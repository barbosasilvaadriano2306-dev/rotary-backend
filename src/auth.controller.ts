import { Controller, Post, Get, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Post('auth/register')
  async register(@Body() data: any) {
    return this.prisma.user.create({ data });
  }

  @Get('members')
  async getMembers() {
    return this.prisma.user.findMany();
  }

  @Get('events')
  async getEvents() {
    // Retorna alguns eventos fixos para o MVP
    return [
      { id: '1', titulo: 'Reunião Ordinária', data: 'Terça, 20:00', local: 'Hotel Marriott' },
      { id: '2', titulo: 'Ação Social Pimentas', data: 'Sábado, 09:00', local: 'Comunidade Pimentas' }
    ];
  }
}
