import { serialize } from 'cookie';

interface StoreCookieProps {
  cookieValue: string;
  cookieName: string;
}

export function storeCookie({ cookieValue, cookieName }: StoreCookieProps) {
  return serialize(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 2,
    path: '/'
  });
}
