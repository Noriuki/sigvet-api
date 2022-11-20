import { User } from 'src/entities/user.entity';
import { UserService } from '../services/user.service';
import { Injectable } from '@nestjs/common';
import { scrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    const password_hash = await passwordHash(password);

    if (
      user.email === email &&
      user.password_hash === password_hash &&
      user.active === 1
    ) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<any> {
    const payload = {
      fullName: `${user.firstName} ${user.lastName}`,
      id: user.id,
      role: user.role,
      clinicId: user.clinicId,
      email: user.email,
    };

    return {
      ...payload,
      token: await this.jwtService.signAsync(payload),
    };
  }
}

export function passwordHash(password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    scrypt(password, process.env.PASSWORD_HASH_SALT, 64, (err, derivedKey) => {
      if (err) reject(err);
      const passwordHash = `${derivedKey.toString('hex')}`;
      resolve(passwordHash);
    });
  });
}
