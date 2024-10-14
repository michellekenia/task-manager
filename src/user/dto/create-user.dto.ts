import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

@IsString()
@IsNotEmpty({ message: 'username não pode ser vazio.'})
username: string

@IsString()
@IsNotEmpty({ message: 'senha não pode ser vazio.'})
password: string

}
