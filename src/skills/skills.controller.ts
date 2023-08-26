import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './dto';

@Controller('skills')
export class SkillsController {
    constructor(private skillsService: SkillsService) { }

    @Get()
    getSkills() {
        
        return this.skillsService.getSkills();
    }
    
    @Get(':id')
    getSkillsById(@Param('id', ParseIntPipe) skillId: number) {
        
        return this.skillsService.getSkillsById(skillId);
    }
    
    @Patch(':id')
    editSkill(@Param('id', ParseIntPipe) skillId: number, @Body() dto: CreateSkillsDto) {
        return this.skillsService.editSkill(skillId, dto);
    }

    @Post()
    createSkill(@Body() dto: CreateSkillsDto,
    ) {
        return this.skillsService.createSkill(dto);
    }
    
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteSkill(@Param('id', ParseIntPipe) skillId: number) {
        return this.skillsService.deleteSkill(
            skillId,
        );
    }
}
