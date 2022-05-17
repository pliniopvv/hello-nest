/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    list() {
        return `Cursos works!`;
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return `Curso #${id}`;
    }
}
