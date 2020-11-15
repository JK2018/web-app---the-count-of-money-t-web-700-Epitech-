import { hasRoles } from './../../auth/decorator/roles.decorator';
import { RolesGuard } from './../../auth/guards/role.guard';
import { UserRole } from './../models/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { map, catchError } from 'rxjs/operators';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable, of } from 'rxjs';

@Controller('users')
export class UserController {

    constructor(private userService : UserService)  {}

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(":id")
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    @Delete(":id")
    deleteOne(@Param() params): Observable<any> {
        return this.userService.deleteOne(params.id)
    }

    @Put(":id")
    updateOne(@Param() params, @Body() user : User): Observable<any> {
        return this.userService.updateOne(params.id, user)
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}
