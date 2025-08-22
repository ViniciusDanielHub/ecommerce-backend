"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
// src/core/users/users.module.ts
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./controllers/users.controller");
const get_user_use_case_1 = require("./use-cases/get-user.use-case");
const auth_repository_1 = require("../auth/repositories/auth.repository");
const prisma_auth_repository_1 = require("../../infrastructure/auth/prisma/prisma-auth.repository");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("../../shared/guards/roles-guard");
const jwt_auth_guard_1 = require("../../shared/guards/jwt-auth.guard");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            prisma_service_1.PrismaService,
            get_user_use_case_1.GetUserUseCase,
            {
                provide: auth_repository_1.AUTH_REPOSITORY,
                useClass: prisma_auth_repository_1.PrismaAuthRepository,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard, // Primeiro valida o JWT
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard, // Depois valida as roles
            },
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map