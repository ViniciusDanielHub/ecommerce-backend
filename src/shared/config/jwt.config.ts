// shared/config/jwt.config.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecret-dev-only',
};
