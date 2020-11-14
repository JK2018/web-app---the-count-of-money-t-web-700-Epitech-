import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {

    constructor(private userService : UserService)  {}

    @Put()
    create(@Body() user: User): Observable<User> {
        return this.userService.create(user);
    }

    @Get(":id")
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    @Delete(":id")
    deleteOne(@Param() params): Observable<any> {
        return this.userService.deleteOne(params.id)
    }

    @Post(":id")
    updateOne(@Param() params, @Body() user : User): Observable<any> {
        return this.userService.updateOne(params.id, user)
    }
}
