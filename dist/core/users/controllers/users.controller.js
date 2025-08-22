"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
// src/core/users/controllers/users.controller.ts
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../shared/guards/roles-guard");
const roles_decorator_1 = require("../../../shared/decorators/roles.decorator");
const get_user_use_case_1 = require("../use-cases/get-user.use-case");
const client_1 = require("@prisma/client");
let UsersController = class UsersController {
    constructor(getUserUseCase) {
        this.getUserUseCase = getUserUseCase;
    }
    // Acesso permitido para todos os usuários autenticados
    async getMe(req) {
        return this.getUserUseCase.execute(req.user.userId);
    }
    // Acesso exclusivo para administradores
    async getAllUsers() {
        return { message: 'Aqui listamos todos os usuários, mas só admins podem ver' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(client_1.Role.USER, client_1.Role.ADMIN),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard) // Autenticação e depois autorização
    ,
    __metadata("design:paramtypes", [get_user_use_case_1.GetUserUseCase])
], UsersController);
//# sourceMappingURL=users.controller.js.map