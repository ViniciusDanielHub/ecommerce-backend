import { Module } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/domain/auth.module';
import { UsersModule } from 'src/core/users/users.module';
import { AdminModule } from 'src/core/admin/admin.module';
import { ProductModule } from 'src/core/products/product.module'; 
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdminModule,
    ProductModule, 
  ],
  controllers: [AppController],
})
export class AppModule { }