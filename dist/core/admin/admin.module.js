"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./controllers/admin.controller");
const auth_module_1 = require("../auth/domain/auth.module");
const promote_user_use_case_1 = require("./use-cases/promote-user.use-case");
const get_all_users_use_case_1 = require("./use-cases/get-all-users.use-case");
const delete_user_use_case_1 = require("./use-cases/delete-user.use-case");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [admin_controller_1.AdminController],
        providers: [
            promote_user_use_case_1.PromoteUserUseCase,
            get_all_users_use_case_1.GetAllUsersUseCase,
            delete_user_use_case_1.DeleteUserUseCase,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map