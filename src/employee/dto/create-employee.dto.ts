import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  job: string;
  @IsString()
  @IsNotEmpty()
  personality: string;
  @IsOptional()
  teamId?: number;  
  profilepicture?: string;
  
  @IsNotEmpty()
  userId: number;
}