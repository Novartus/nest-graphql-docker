import * as bcrypt from 'bcrypt';

export class AuthHelper {
  static validate(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
