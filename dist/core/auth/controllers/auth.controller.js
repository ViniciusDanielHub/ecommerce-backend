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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_use_case_1 = require("../domain/use-cases/register.use-case");
const login_use_case_1 = require("../domain/use-cases/login.use-case");
const refresh_token_use_case_1 = require("../domain/use-cases/refresh-token-use-case");
const delete_user_account_use_case_1 = require("../domain/use-cases/delete-user-account.use-case");
const register_dto_1 = require("../dtos/register.dto");
const login_dto_1 = require("../dtos/login.dto");
const refresh_token_dto_1 = require("../dtos/refresh-token-dto");
const public_decorator_1 = require("../../../shared/decorators/public.decorator");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const request_password_reset_use_case_1 = require("../domain/use-cases/request-password-reset.use-case");
const reset_password_use_case_1 = require("../domain/use-cases/reset-password.use-case");
const request_password_reset_dto_1 = require("../dtos/request-password-reset.dto");
const reset_password_dto_1 = require("../dtos/reset-password.dto");
let AuthController = class AuthController {
    constructor(registerUseCase, loginUseCase, refreshTokenUseCase, deleteAccountUseCase, requestPasswordResetUseCase, resetPasswordUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.deleteAccountUseCase = deleteAccountUseCase;
        this.requestPasswordResetUseCase = requestPasswordResetUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
    }
    register(dto) {
        return this.registerUseCase.execute(dto);
    }
    login(dto) {
        return this.loginUseCase.execute(dto.email, dto.password);
    }
    async refresh(dto) {
        return this.refreshTokenUseCase.execute(dto.userId, dto.refreshToken);
    }
    async deleteAccount(req) {
        const userId = req.user.userId;
        return this.deleteAccountUseCase.execute(userId);
    }
    async requestPasswordReset(dto) {
        return this.requestPasswordResetUseCase.execute(dto.email);
    }
    async resetPassword(dto) {
        return this.resetPasswordUseCase.execute(dto.token, dto.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('request-password-reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_password_reset_dto_1.RequestPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [register_use_case_1.RegisterUseCase,
        login_use_case_1.LoginUseCase,
        refresh_token_use_case_1.RefreshTokenUseCase,
        delete_user_account_use_case_1.DeleteUserAccountUseCase,
        request_password_reset_use_case_1.RequestPasswordResetUseCase,
        reset_password_use_case_1.ResetPasswordUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map