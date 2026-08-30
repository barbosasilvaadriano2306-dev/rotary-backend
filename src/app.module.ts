import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller'; // <--- Verifique se isso está aqui!

@Module({
  imports: [],
  controllers: [AppController], // <--- E isso aqui!
  providers: [PrismaService],
})
export class AppModule {}
