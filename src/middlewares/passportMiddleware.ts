import passport from 'passport';
export const passportMiddleware = passport.authenticate('jwt', { session: false });
