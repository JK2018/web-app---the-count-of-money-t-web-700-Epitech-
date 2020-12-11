import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAnonymousGuard extends AuthGuard('jwt') {
  // use this guard instead of jwt-auth if url handle anonymous user
  // no error is thrown if no user is found
  // req.user = false in case of anonymous user
  handleRequest(err, user, info) {
    return user;
  }
}
