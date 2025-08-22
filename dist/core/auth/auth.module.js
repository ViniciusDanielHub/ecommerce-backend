"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
// src/core/auth/auth.module.ts
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./controllers/auth.controller");
const prisma_auth_repository_1 = require("../../infrastructure/auth/prisma/prisma-auth.repository");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
const register_use_case_1 = require("./domain/use-cases/register.use-case");
const login_use_case_1 = require("./domain/use-cases/login.use-case");
const refresh_token_use_case_1 = require("./domain/use-cases/refresh-token-use-case");
const auth_repository_1 = require("./repositories/auth.repository");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'default_secret',
                    signOptions: { expiresIn: '1d' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: auth_repository_1.AUTH_REPOSITORY,
                useClass: prisma_auth_repository_1.PrismaAuthRepository,
            },
            register_use_case_1.RegisterUseCase,
            login_use_case_1.LoginUseCase,
            refresh_token_use_case_1.RefreshTokenUseCase,
        ],
        exports: [auth_repository_1.AUTH_REPOSITORY, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map