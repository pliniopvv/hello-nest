/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('/courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {
    }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.coursesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body) {
        return this.coursesService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body) {
        return this.coursesService.update(id,body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.coursesService.remove(id);
    }
}
