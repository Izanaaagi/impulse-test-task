import * as bcrypt from 'bcrypt';
import { HashService } from './hash.service';

export class BcryptAdapter extends HashService {
  generateSalt(rounds: number): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  hash(data: string | Buffer, saltOrRounds: string | number): Promise<string> {
    return bcrypt.hash(data, saltOrRounds);
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
