import { IsIP } from 'class-validator';

export class DeleteIpInfoBody {
  @IsIP()
  ip: string;
}
