import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.repo.findOne({ where: { username } });

    if (!user) {
      console.log("Login attempt: user not found:", username);
      return { success: false, message: 'User not found' };
    }

    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password check result:", isPasswordValid);

    if (!isPasswordValid) {
      return { success: false, message: 'Wrong password' };
    }

    console.log("Login successful for:", username);

    return { success: true, message: 'Login successful', user };
  }

  // новий метод для створення користувача
  async createUser(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ username, password: hashed });
    return this.repo.save(user);
  }
}

