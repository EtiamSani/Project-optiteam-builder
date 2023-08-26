import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class EditTeamDto {
    @IsString()
    @IsNotEmpty()
    name: string;

}