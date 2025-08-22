// src/use-cases/auth/dtos/register.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { Match } from 'src/shared/validators/match-decorator'; 

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character' })
  password!: string;

  @IsNotEmpty({ message: 'Password confirmation is required' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword!: string;
}
