import { IsIP } from 'class-validator';

export class IpInfoQuery {
  @IsIP()
  ip: string;
}
