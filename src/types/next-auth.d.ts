import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    providerToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    providerToken?: string;
  }
}
