import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseEnumPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.interface';
import { Status } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('status')
  async findByStatus(@Query('status', new ParseEnumPipe(Status)) status: Status): Promise<Task[]> {
    return this.tasksService.findByStatus(status)
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.removeTask(id)
  }
}
