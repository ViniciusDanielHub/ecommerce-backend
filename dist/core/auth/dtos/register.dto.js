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
exports.RegisterDto = void 0;
// src/use-cases/auth/dtos/register.dto.ts
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../../shared/validators/match-decorator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters' }),
    (0, class_validator_1.Matches)(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' }),
    (0, class_validator_1.Matches)(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' }),
    (0, class_validator_1.Matches)(/(?=.*\d)/, { message: 'Password must contain at least one number' }),
    (0, class_validator_1.Matches)(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password confirmation is required' }),
    (0, match_decorator_1.Match)('password', { message: 'Passwords do not match' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=register.dto.js.map