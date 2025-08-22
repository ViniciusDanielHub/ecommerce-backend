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
exports.RequestPasswordResetUseCase = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("../../repositories/auth.repository");
const common_2 = require("@nestjs/common");
const crypto_1 = require("crypto");
const date_fns_1 = require("date-fns");
let RequestPasswordResetUseCase = class RequestPasswordResetUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email é obrigatório');
        }
        const user = await this.authRepository.findByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const expires = (0, date_fns_1.addHours)(new Date(), 1); // 1 hora
        await this.authRepository.setResetPasswordToken(email, token, expires);
        // Aqui você enviaria o e-mail (omiti para simplificar)
        return {
            message: 'Token de recuperação gerado e enviado por e-mail',
            success: true,
            token
        };
    }
};
exports.RequestPasswordResetUseCase = RequestPasswordResetUseCase;
exports.RequestPasswordResetUseCase = RequestPasswordResetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(auth_repository_1.AUTH_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], RequestPasswordResetUseCase);
//# sourceMappingURL=request-password-reset.use-case.js.map