import { IsEnum, IsString, IsUUID } from 'class-validator';
import { Role } from '@prisma/client';

export class PromoteUserDto {
  @IsUUID()
  @IsString()
  userId!: string;

  @IsEnum(Role)
  newRole!: Role;
}