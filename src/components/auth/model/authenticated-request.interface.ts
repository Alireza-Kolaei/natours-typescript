import { Request } from 'express';
import UserRoles from '../../user/model/user-roles.enum';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    photo?: string;
    role: UserRoles;
    isEmailVerified: boolean;
    password: string;
    active: boolean;
    passwordChangedAt: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    changedPasswordAfter(JWTTimestamp: number): boolean;
    correctPassword(candidatePassword: string, userPassword: string): boolean;
    createPasswordResetToken(): string;
  };
}
