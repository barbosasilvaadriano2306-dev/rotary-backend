import { Controller, Post, Get, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  // --- MEMBROS ---
  @Post('auth/register')
  async register(@Body() data: any) {
    return this.prisma.user.create({ data });
  }

  @Get('members')
  async getMembers() {
    return this.prisma.user.findMany({ orderBy: { nome: 'asc' } });
  }

  // --- EVENTOS (Agora salvando no banco!) ---
  @Post('events')
  async createEvent(@Body() data: any) {
    return this.prisma.evento.create({ data });
  }

  @Get('events')
  async getEvents() {
    return this.prisma.evento.findMany({ orderBy: { data: 'asc' } });
  }

  // --- MURAL DE NOTÍCIAS (Posts) ---
  @Post('posts')
  async createPost(@Body() data: any) {
    return this.prisma.post.create({ data });
  }

  @Get('posts')
  async getPosts() {
    return this.prisma.post.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
  }

@Post('auth/login')
  async login(@Body() data: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && user.senha === data.senha) {
      return user; // Sucesso: devolve o usuário
    } else {
      throw new Error('E-mail ou senha incorretos');
    }
  }
