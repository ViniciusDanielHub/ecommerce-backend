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
exports.PromoteUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
let PromoteUserUseCase = class PromoteUserUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(userId, newRole) {
        // Verificar se o usuário existe
        const user = await this.authRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        // Verificar se a role é diferente da atual
        if (user.role === newRole) {
            throw new common_1.BadRequestException(`Usuário já possui a role ${newRole}`);
        }
        // Atualizar a role do usuário
        const updatedUser = await this.authRepository.promoteUser(userId, newRole);
        return {
            message: `Usuário ${updatedUser.name} foi promovido para ${newRole} com sucesso`,
            user: updatedUser,
        };
    }
};
exports.PromoteUserUseCase = PromoteUserUseCase;
exports.PromoteUserUseCase = PromoteUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_repository_1.AUTH_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], PromoteUserUseCase);
//# sourceMappingURL=promote-user.use-case.js.map