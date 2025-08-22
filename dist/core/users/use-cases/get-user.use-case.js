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
exports.GetUserUseCase = void 0;
// src/core/users/use-cases/get-user.use-case.ts
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
const sanitize_user_1 = require("../../../shared/utils/sanitize-user");
let GetUserUseCase = class GetUserUseCase {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    async execute(userId) {
        const user = await this.authRepo.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return (0, sanitize_user_1.sanitizeUser)(user);
    }
};
exports.GetUserUseCase = GetUserUseCase;
exports.GetUserUseCase = GetUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_repository_1.AUTH_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetUserUseCase);
//# sourceMappingURL=get-user.use-case.js.map