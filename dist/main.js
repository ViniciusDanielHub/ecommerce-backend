"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./presentation/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // Remove propriedades não esperadas
        forbidNonWhitelisted: true, // Erro se o payload tem campos extras
        transform: true, // Converte tipos (ex: string -> number)
    }));
    await app.listen(3000);
    console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map