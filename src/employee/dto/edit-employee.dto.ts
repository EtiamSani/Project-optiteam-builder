import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastname?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstname?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  job?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  personality?: string;
  @IsNotEmpty()
  @IsOptional()
  teamId?: number;
}