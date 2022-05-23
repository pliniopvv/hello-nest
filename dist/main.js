"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const Utils_tools_1 = require("./utils/Utils.tools");
dotenv.config({ path: ".env" });
let env_select = (0, Utils_tools_1.env)('ENV_SELECT');
console.log("[ INFO ] ENV SELECIONADO > ", env_select);
if (env_select == (0, Utils_tools_1.env)('ENV_PROD')) {
    console.log("[ INFO ] ENV FILE CARREGADO > ", (0, Utils_tools_1.env)('ENV_PROD_FILE'));
    dotenv.config({ path: (0, Utils_tools_1.env)('ENV_PROD_FILE') });
}
else if (env_select == (0, Utils_tools_1.env)('ENV_DEV')) {
    console.log("[ INFO ] ENV FILE CARREGADO > ", (0, Utils_tools_1.env)('ENV_DEV_FILE'));
    dotenv.config({ path: (0, Utils_tools_1.env)('ENV_DEV_FILE') });
}
console.log("[ INFO ] DB SELECIONADO > ", (0, Utils_tools_1.env)('DB_SELECTION'));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map