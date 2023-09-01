import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class EditEmployeeDto {
  @IsNotEmpty({ message: 'Le champ nom est vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsOptional()
  @Matches(/^[A-Za-z]+$/, { message: 'Le nom doit contenir uniquement des lettres' })
  lastname?: string;

  @IsNotEmpty({ message: 'Le champ prénom est vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsOptional()
  @Matches(/^[A-Za-z]+$/, { message: 'Le prénom doit contenir uniquement des lettres' })
  firstname?: string;

  @IsNotEmpty({ message: 'Le champ métier est vide' })
  @IsString({ message: 'Le métier doit être une chaîne de caractères' })
  @IsOptional()
  job?: string;

  @IsNotEmpty({ message: 'Le champ personalité est vide' })
  @IsString({ message: 'La personalité doit être une chaîne de caractères' })
  @IsOptional()
  personality?: string;

  
  @IsOptional()
  teamId?: number;

  profilepicture?: string;
}