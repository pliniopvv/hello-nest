import { Course } from './entity/course.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do Framework Nest.JS',
      description: 'Fundamentos do Framework Nest.JS',
      tags: ['Node.JS','Nest.JS']
    }
  ];
  private idCount: number = 2;

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    let course = this.courses.find(c => c.id == id);
    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return course;
  }

  create(courseDto: any) {
    let course = {id: this.idCount, ...courseDto};
    this.courses.push(course);
    this.idCount++;
    return course;
  }

  update(id:number, courseDto: any) {
    let ic = this.courses.findIndex(c => c.id == id);
    this.courses[ic] = courseDto;
  }

  remove(id: number) {
    let ic = this.courses.findIndex(c => c.id == id);
    if (ic >= 0) {
      this.courses.splice(ic,1);
    }
  }
}
