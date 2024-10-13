import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'O título da tarefa não poder ser vazio.'})
    title: string;
}
