import {ExecutionContext, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Observable} from "rxjs";

@Injectable()
export class DiscordGuard extends AuthGuard('discord') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { provider } = request.params;

        if (provider === 'discord') {
            return super.canActivate(context);
        } else {
            return true
        }
    }
}
