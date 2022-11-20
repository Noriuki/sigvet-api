import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService, passwordHash } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Public } from 'src/decorators/public-route.decorator';
import { User, UserDto } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { CreateBaseClass } from './base.controller';
@Controller('user')
export class UserController extends CreateBaseClass(UserDto) {
  constructor(
    private readonly userService: UserService,

    private readonly authService: AuthService,
  ) {
    super(userService);
  }

  @Post()
  async insert(@Res() res: Response, @Body() model: UserDto): Promise<any> {
    await this.transform(model);

    const { password, ...rest } = model;

    rest.password_hash = await passwordHash(password);

    const result: User = await this.baseService.upsert(rest);

    return res.status(201).json({ success: true, result });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/reset')
  async passwordReset(@Body() body: any, @Res() res: Response): Promise<any> {
    const result = await this.userService.passwordReset(body.email);
    return res.json({ success: true, result });
  }

  @Get('/active/:clinicId')
  async getActiveUsers(
    @Res() res: Response,
    @Param('clinicId', ParseIntPipe) clinicId: number,
  ) {
    const result = await this.userService.getActiveUsers(clinicId);
    return res.json({ success: true, result });
  }
}
