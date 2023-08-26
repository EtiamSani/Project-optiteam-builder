import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class EditSkillsDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}