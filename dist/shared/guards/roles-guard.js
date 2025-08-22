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
exports.RolesGuard = void 0;
// src/shared/guards/roles-guard.ts
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
const auth_repository_1 = require("../../core/auth/repositories/auth.repository");
let RolesGuard = class RolesGuard {
    constructor(reflector, authRepo) {
        this.reflector = reflector;
        this.authRepo = authRepo;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(), //metodo especifico
            context.getClass(), //classe do controller
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // rota pública / sem roles
        }
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user?.userId)
            return false;
        // Busca o usuário no DB e valida o papel atual
        const userFromDb = await this.authRepo.findById(user.userId);
        if (!userFromDb)
            return false;
        return requiredRoles.includes(userFromDb.role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(auth_repository_1.AUTH_REPOSITORY)),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], RolesGuard);
//# sourceMappingURL=roles-guard.js.map