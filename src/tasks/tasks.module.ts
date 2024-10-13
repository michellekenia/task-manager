import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisService } from './redis.service';

@Module({
  imports: [PrismaModule], 
  controllers: [TasksController],
  providers: [TasksService, RedisService],
})
export class TasksModule {}
