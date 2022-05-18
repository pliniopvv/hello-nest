import { Course } from './entity/course.entity';
import { Injectable } from '@nestjs/common';

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

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses.find(c => c.id == id);
  }

  create(courseDto: any) {
    this.courses.push(courseDto);
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
