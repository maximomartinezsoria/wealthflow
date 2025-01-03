import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get(
          'CLERK_ISSUER_URL',
        )}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `${configService.get('CLERK_ISSUER_URL')}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload) {
    const userId = payload.sub;
    const clerkApiKey = this.configService.get('CLERK_API_KEY');
    const clerkApiUrl = `${this.configService.get(
      'CLERK_API_BASE_URL',
    )}/users/${userId}`;

    const { data: user } = await axios.get(clerkApiUrl, {
      headers: {
        Authorization: `Bearer ${clerkApiKey}`,
      },
    });

    return {
      userId: user.private_metadata?.userId,
    };
  }
}
