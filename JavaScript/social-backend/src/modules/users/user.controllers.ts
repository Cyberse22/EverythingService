import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get(':email')
  getEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post('create')
  create(@Body() user: UserService) {
    return this.userService.create(user);
  }
}