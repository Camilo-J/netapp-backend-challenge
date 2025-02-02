import { Strategy } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { getUserByEmail } from '../models/user';
import { Request } from 'express';

type Payload = {
  email: string;
  id: string;
};

const passportConfig = (passport: PassportStatic) => {
  const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['token'];
    }
    return token;
  };

  const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET || 'default_secret'
  };

  passport.use(
    new Strategy(jwtOptions, async (jwt_payload: Payload, done) => {
      const user = await getUserByEmail(jwt_payload.email);

      if (user) return done(null, user);

      return done(null, false);
    })
  );
};
export default passportConfig;
