declare namespace CookieSessionInterfaces {
    export interface Request {
      session: {
        userId?: string;
      } & Express.Session;
    }
}
