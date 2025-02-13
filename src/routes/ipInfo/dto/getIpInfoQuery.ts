import { IsIP } from 'class-validator';

export class GetIpInfoQuery {
  @IsIP()
  ip: string;
}
