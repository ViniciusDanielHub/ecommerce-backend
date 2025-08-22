// src/shared/types/request-with-user.ts
import { Request as ExpressRequest } from 'express';


export interface RequestWithUser extends ExpressRequest {
  user: {
    userId: string;
    email: string;
    role?: string;
  };
}
