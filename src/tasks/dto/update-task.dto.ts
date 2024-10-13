import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '@prisma/client';


export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsString()
    @IsNotEmpty({ message: 'O título da tarefa não poder ser vazio.'})
    title: string;

    @IsEnum(Status, { message: 'Status inválido. Deve ser PENDING ou COMPLETED.' })
    status: Status;
}
