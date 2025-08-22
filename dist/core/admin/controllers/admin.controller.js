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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../../shared/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../shared/guards/roles-guard");
const promote_user_use_case_1 = require("../use-cases/promote-user.use-case");
const get_all_users_use_case_1 = require("../use-cases/get-all-users.use-case");
const promote_user_dto_1 = require("../dtos/promote-user.dto");
const delete_user_use_case_1 = require("../use-cases/delete-user.use-case");
let AdminController = class AdminController {
    constructor(promoteUserUseCase, getAllUsersUseCase, deleteUserUseCase) {
        this.promoteUserUseCase = promoteUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async getAllUsers() {
        return this.getAllUsersUseCase.execute();
    }
    async promoteUser(dto) {
        return this.promoteUserUseCase.execute(dto.userId, dto.newRole);
    }
    // Endpoint alternativo usando parâmetros da URL
    async promoteUserByParams(userId, newRole) {
        return this.promoteUserUseCase.execute(userId, newRole);
    }
    async deleteUser(userIdToDelete, req) {
        const adminUserId = req.user.userId;
        return this.deleteUserUseCase.execute(userIdToDelete, adminUserId);
    }
    findAll() {
        return 'Apenas ADMIN pode ver isso';
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)('promote-user'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promote_user_dto_1.PromoteUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "promoteUser", null);
__decorate([
    (0, common_1.Put)('users/:userId/role/:newRole'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('newRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "promoteUserByParams", null);
__decorate([
    (0, common_1.Delete)('users/:userId'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAll", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [promote_user_use_case_1.PromoteUserUseCase,
        get_all_users_use_case_1.GetAllUsersUseCase,
        delete_user_use_case_1.DeleteUserUseCase])
], AdminController);
//# sourceMappingURL=admin.controller.js.map