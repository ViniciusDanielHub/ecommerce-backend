import { Role } from '@prisma/client';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthRepository {
  register(data: { name: string; email: string; password: string }): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: string): Promise<any>;
  updateRefreshToken(userId: string, token: string | null): Promise<any>;
  findAll(): Promise<any[]>; 
  deleteUser(id: string): Promise<any>;
  promoteUser(userId: string, newRole: Role): Promise<any>;
  setResetPasswordToken(email: string, token: string, expires: Date): Promise<any>;
  findByResetToken(token: string): Promise<any>;
  updatePassword(userId: string, hashedPassword: string): Promise<any>;
}