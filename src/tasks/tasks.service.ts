import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from './interfaces/task.interface'
import { Status } from '@prisma/client';

@Injectable()
export class TasksService {

  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto
    const task = await this.prisma.task.create({
      data: { title }
    });
    return task

  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async findByStatus(status: Status): Promise<Task[]> {
    const allowedStatuses = [Status.PENDING, Status.COMPLETED]
    return this.prisma.task.findMany({ where: { status } })
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async removeTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id }
    })
  }

}
