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
exports.AdminUsersController = void 0;
// src/core/users/controllers/admin-users.controller.ts
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../shared/guards/roles-guard");
const roles_decorator_1 = require("../../../shared/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const prisma_auth_repository_1 = require("../../../infrastructure/auth/prisma/prisma-auth.repository");
let AdminUsersController = class AdminUsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async updateUserRole(id, role) {
        return this.usersService.updateRole(id, role);
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Patch)(':id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "updateUserRole", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, common_1.Controller)('admin/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN) // só admin acessa
    ,
    __metadata("design:paramtypes", [prisma_auth_repository_1.PrismaAuthRepository])
], AdminUsersController);
//# sourceMappingURL=admin-users.controller.js.map