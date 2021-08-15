import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async facebookLogin(req: Request) {
    return {
      statusCode: HttpStatus.OK,
      data: req,
    };
  }

  async googleLogin(req: Request) {
    return {
      statusCode: HttpStatus.OK,
      data: req,
    };
  }
}
