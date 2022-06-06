import { UpdateCourseDto } from './dto/update-course.dto';
/* eslint-disable prettier/prettier */
import { Bind, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

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
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.coursesService.remove(id);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            dest: process.env.UPLOAD_DIR
        })
    )
    uploadFile(@UploadedFile() file) {
    console.log(file);
    }
}
