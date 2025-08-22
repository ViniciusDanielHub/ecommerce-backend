"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("../controllers/auth.controller");
const register_use_case_1 = require("./use-cases/register.use-case");
const login_use_case_1 = require("./use-cases/login.use-case");
const refresh_token_use_case_1 = require("./use-cases/refresh-token-use-case");
const delete_user_account_use_case_1 = require("./use-cases/delete-user-account.use-case");
const prisma_auth_repository_1 = require("../../../infrastructure/auth/prisma/prisma-auth.repository");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
const jwt_config_1 = require("../../../shared/config/jwt.config");
const auth_repository_1 = require("../repositories/auth.repository");
const jwt_strategy_1 = require("../../../shared/strategies/jwt.strategy");
const request_password_reset_use_case_1 = require("./use-cases/request-password-reset.use-case");
const reset_password_use_case_1 = require("./use-cases/reset-password.use-case");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || jwt_config_1.jwtConstants.secret,
                signOptions: { expiresIn: '1d' }, // tempo do token
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            jwt_strategy_1.JwtStrategy,
            prisma_service_1.PrismaService,
            register_use_case_1.RegisterUseCase,
            login_use_case_1.LoginUseCase,
            refresh_token_use_case_1.RefreshTokenUseCase,
            delete_user_account_use_case_1.DeleteUserAccountUseCase,
            request_password_reset_use_case_1.RequestPasswordResetUseCase,
            reset_password_use_case_1.ResetPasswordUseCase,
            {
                provide: auth_repository_1.AUTH_REPOSITORY,
                useClass: prisma_auth_repository_1.PrismaAuthRepository,
            },
        ],
        exports: [jwt_1.JwtModule, auth_repository_1.AUTH_REPOSITORY],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map