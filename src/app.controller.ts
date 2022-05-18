import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { config } from 'dotenv';

config();

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('login/:social')
  async loginSocial(@Param() params, @Req() req, @Res() res) {
    const social = params.social;
    if (social == 'google') {
      return res.redirect('/api/find-my-compost/auth/google');
    } else if (social == 'facebook') {
      return res.redirect('/api/find-my-compost/auth/facebook');
    }
    return HttpStatus.OK;
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('auth/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    return HttpStatus.OK;
  }

  @Get('auth/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async redirectFacebook(@Req() req, @Res() res) {
    const payload = await this.authService.loginWithSocial(
      req.user,
      'facebook',
    );
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));
    return res.redirect(
      'https://vps.digitalternative.be/find-my-compost#/login/?payload=' +
        encodedPayload,
    );
  }

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async redirectGoogle(@Req() req, @Res() res) {
    const payload = await this.authService.loginWithSocial(req.user, 'google');
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));
    return res.redirect(
      'https://vps.digitalternative.be/find-my-compost#/login/?payload=' +
        encodedPayload,
    );
  }
}
