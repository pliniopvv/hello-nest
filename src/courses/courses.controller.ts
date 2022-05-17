/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    list(@Res() res) {
        return res.status(200).send(`Cursos works!`);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return `Curso #${id}`;
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    create(@Body() body) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body) {
        return `${id}\n${body}`;
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return `Curso #${id} deletado`;
    }
}
