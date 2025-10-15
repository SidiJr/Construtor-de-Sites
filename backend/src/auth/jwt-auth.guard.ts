import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  id: number;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Token não fornecido');

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Token inválido');

    const decoded = this.jwtService.verify<JwtPayload>(token);
    request['user'] = decoded;

    return true;
  }
}
