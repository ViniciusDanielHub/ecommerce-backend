"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password, role = 'user', refreshToken, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.refreshToken = refreshToken;
        this.createdAt = createdAt;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map