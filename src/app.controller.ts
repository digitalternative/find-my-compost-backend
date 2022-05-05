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
  Session,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('login/:social')
  async loginSocial(
    @Param() params,
    @Req() req,
    @Res() res,
    @Session() session,
  ) {
    const social = params.social;
    session.redirectTo = req.headers.referer;
    if (social == 'google') {
      return res.redirect('/auth/google');
    } else if (social == 'facebook') {
      return res.redirect('/auth/facebook');
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
  async redirectFacebook(@Req() req, @Res() res, @Session() session) {
    const redirectTo = session.redirectTo;
    const payload = await this.authService.loginWithSocial(
      req.user,
      'facebook',
    );
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));
    return res.redirect(redirectTo + '#login/?payload=' + encodedPayload);
  }

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async redirectGoogle(@Req() req, @Res() res, @Session() session) {
    const redirectTo = session.redirectTo;
    const payload = await this.authService.loginWithSocial(req.user, 'google');
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));
    return res.redirect(redirectTo + '#login/?payload=' + encodedPayload);
  }
}
