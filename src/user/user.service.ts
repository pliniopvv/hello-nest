import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/db/data-source';
import { User } from './entity/user.entity';

let debug_tag = 'user.service.ts';

@Injectable()
export class UserService {
  private dataSource = AppDataSource;

  async findAll() {
    return await this.dataSource.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    let user = await this.dataSource.manager.findOneBy(User, { id });
    if (!user) {
      throw new HttpException(`ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findLogin(login: string): Promise<User> {
    let user = await this.dataSource.manager.findOneBy(User, { login });
    if (!user) {
      throw new HttpException(`LOGIN ${login} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(dto: any) {
    let user = DtoToUser(dto);
    let retCourse = await this.dataSource.manager.save(user);
    return retCourse;
  }

  async update(id: number, dto: any) {
    let ic = await this.dataSource.manager.findOneBy(User, { id });
    this.dataSource.manager.save(ic);
  }

  async remove(id: number) {
    let user = await this.dataSource.manager.findOneBy(User, { id });
    return await this.dataSource.manager.remove(user);
  }
}
function DtoToUser(dto: any): User {
  let user: User = new User();
  user.nome = dto.nome;
  user.login = dto.login;
  user.password = dto.password;
  return user;
}