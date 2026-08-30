import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('register')
  async register(@Body() data: any) {
    // Salva o membro no banco de dados que você criou no Railway
    const user = await this.prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha, // Em produção usaríamos criptografia
        cargo: data.cargo,
      },
    });
    return { message: "Membro cadastrado com sucesso!", id: user.id };
  }
}
