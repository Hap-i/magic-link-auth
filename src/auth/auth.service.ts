import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UsersService,
    private jwtService: JwtService,
  ) {}
  validateUser(email: string) {
    const user = this.userservice.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
