import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.userModel.findOne({ username: dto.username });
    if (userExists) throw new ConflictException('Username already taken');

    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({ username: dto.username, password: hash });
    await newUser.save();
    return { message: 'Registration successful' };
  }

  async login(dto: LoginDto): Promise<{ access_token: string } | null> {
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user) return null;
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) return null;

    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}