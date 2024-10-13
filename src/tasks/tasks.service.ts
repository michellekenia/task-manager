import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from './interfaces/task.interface'
import { RedisService } from './redis.service';

@Injectable()
export class TasksService {

  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise <Task>{
    const { title } = createTaskDto
    const task = await this.prisma.task.create ({
      data: { title }
    });

    await this.redisService.set(`task:${task.id}`, JSON.stringify(task));
    return task;

  }

  /*findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }*/
  
}
