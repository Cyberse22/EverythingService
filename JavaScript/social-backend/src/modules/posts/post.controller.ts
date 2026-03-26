import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private postsService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body, @Req() req) {
    return this.postsService.createPost(req.user.userId, body.content);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}