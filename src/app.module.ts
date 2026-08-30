import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController], // <-- Aqui estamos avisando o NestJS que o AppController existe
  providers: [PrismaService],
})
export class AppModule {}
