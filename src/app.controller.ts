import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  // 1. LOGIN - Verifica se o sócio existe e a senha está correta
  @Post('auth/login')
  async login(@Body() data: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && user.senha === data.senha) {
      return user;
    }
    
    throw new HttpException('E-mail ou senha incorretos', HttpStatus.UNAUTHORIZED);
  }

  // 2. CADASTRO - Cria um novo sócio
  @Post('auth/register')
  async register(@Body() data: any) {
    try {
      return await this.prisma.user.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          cargo: data.cargo || 'ROTARIANO',
        },
      });
    } catch (e) {
      throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  // 3. DIRETÓRIO - Lista todos os sócios
  @Get('members')
  async getMembers() {
    return this.prisma.user.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  // 4. AGENDA - Lista os eventos (Salvos no banco ou fixos para teste)
  @Get('events')
  async getEvents() {
    return [
      { id: '1', titulo: 'Reunião Ordinária', data: 'Terça, 20:00', local: 'Hotel Marriott' },
      { id: '2', titulo: 'Ação Social', data: 'Sábado, 09:00', local: 'Comunidade Pimentas' },
    ];
  }

  // 5. MURAL - Lista as notícias
  @Get('posts')
  async getPosts() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 6. PAINEL ADMIN - Página para você postar notícias
  @Get('admin')
  getAdmin() {
    return `
      <html>
        <body style="font-family: sans-serif; padding: 40px; background: #f4f4f4;">
          <h1 style="color: #005DAA">Painel Administrativo - Rotary</h1>
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3>Publicar Notícia no Mural</h3>
            <input id="t" placeholder="Título" style="width: 100%; padding: 10px; margin-bottom: 10px;"><br>
            <textarea id="c" placeholder="Conteúdo" style="width: 100%; padding: 10px; height: 100px;"></textarea><br>
            <button onclick="enviar()" style="background: #005DAA; color: white; padding: 10px 20px; border: none; cursor: pointer;">Publicar Agora</button>
          </div>
          <script>
            async function enviar() {
              const res = await fetch('/posts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ titulo: document.getElementById('t').value, conteudo: document.getElementById('c').value })
              });
              if(res.ok) alert('Sucesso! Verifique o aplicativo.');
            }
          </script>
        </body>
      </html>
    `;
  }

  @Post('posts')
  async createPost(@Body() data: any) {
    return this.prisma.post.create({ data });
  }
}
