"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = sanitizeUser;
function sanitizeUser(user) {
    const { password, refreshToken, ...cleanedUser } = user;
    return cleanedUser;
}
//# sourceMappingURL=sanitize-user.js.map