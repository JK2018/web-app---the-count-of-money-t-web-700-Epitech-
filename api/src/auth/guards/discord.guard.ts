import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordGuard extends AuthGuard('discord') {
    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //     const request = context.switchToHttp().getRequest();
    //     const { provider } = request.params;
    //
    //     return provider === 'discord';
    // }
}
