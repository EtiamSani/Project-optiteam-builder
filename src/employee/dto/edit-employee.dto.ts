import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

  export class EditEmployeeDto {
    @IsString()
    @IsOptional()
    lastname?: string;
    @IsString()
    @IsOptional()  
    firstname?: string;
    @IsString()
    @IsOptional()
    job?: string; 
    @IsString()
    @IsOptional()        
    personality?: string;
    @IsNotEmpty()  
    @IsOptional()
    teamId?: number;
  }