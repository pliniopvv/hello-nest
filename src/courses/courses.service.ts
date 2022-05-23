import { Course } from './entity/course.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'src/utils/Utils.tools';
import { AppDataSource } from 'src/db/data-source';

let debug_tag = 'courses.services.ts';

@Injectable()
export class CoursesService {
  private dataSource = AppDataSource;

  async findAll() {
    return await this.dataSource.manager.find(Course);
  }

  async findOne(id: number) {
    let course = await this.dataSource.manager.findOneBy(Course, { id });
    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async create(courseDto: any) {
    let course = DtoToCourse(courseDto);
    let retCourse = await this.dataSource.manager.save(course);
    return retCourse;
  }

  async update(id: number, courseDto: any) {
    let ic: Course = await this.dataSource.manager.findOneBy(Course, { id });
    ic.name = courseDto.name;
    ic.tags = courseDto.tags;
    ic.description = courseDto.description;
    this.dataSource.manager.save(ic);
  }

  async remove(id: number) {
    let course = await this.dataSource.manager.findOneBy(Course, { id });
    return await this.dataSource.manager.remove(course);
  }
}
function DtoToCourse(dto: any): Course {
  let course = new Course();
  course.description = dto.description;
  course.name = dto.name;
  course.tags = dto.tags;
  return course;
}