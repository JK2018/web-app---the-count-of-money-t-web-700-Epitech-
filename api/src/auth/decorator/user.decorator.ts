// user.decorator.ts
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data, req) => {
        console.log(req)
        return req.user
    },
);