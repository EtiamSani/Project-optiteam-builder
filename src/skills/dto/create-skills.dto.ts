import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateSkillsDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}