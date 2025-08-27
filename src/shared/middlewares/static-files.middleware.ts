import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class StaticFilesMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }

  use(req: Request, res: Response, next: NextFunction) {
    if (req.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), req.url);

      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      } else {
        return res.status(404).json({ message: 'Arquivo não encontrado' });
      }
    }

    next();
  }
}
