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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAuthRepository = void 0;
// src/infrastructure/auth/prisma/prisma-auth.repository.ts
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let PrismaAuthRepository = class PrismaAuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(data) {
        return this.prisma.user.create({ data });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async updateRefreshToken(userId, token) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: token },
        });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                // Não retorna password e refreshToken por segurança
            }
        });
    }
    async promoteUser(userId, newRole) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
    }
    async setResetPasswordToken(email, token, expires) {
        return this.prisma.user.update({
            where: { email },
            data: { resetPasswordToken: token, resetPasswordExpires: expires },
        });
    }
    async findByResetToken(token) {
        return this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: new Date(), // ainda não expirou
                },
            },
        });
    }
    async updatePassword(userId, hashedPassword) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
    }
};
exports.PrismaAuthRepository = PrismaAuthRepository;
exports.PrismaAuthRepository = PrismaAuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAuthRepository);
//# sourceMappingURL=prisma-auth.repository.js.map