import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/domain/auth.module';
import { UsersModule } from 'src/core/users/users.module';
import { AdminModule } from 'src/core/admin/admin.module';
import { ProductModule } from 'src/core/products/product.module'; 
import { AppController } from './app.controller';
import { SharedModule } from 'src/shared/modules/shared.module';
import { StaticFilesMiddleware } from 'src/shared/middlewares/static-files.middleware';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UsersModule,
    AdminModule,
    ProductModule, 
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StaticFilesMiddleware).forRoutes('*');
  }
}