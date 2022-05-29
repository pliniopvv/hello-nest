import { Logger } from "@nestjs/common";

export function env(envS: string) {
    return process.env[envS];
}
let logger = new Logger();
export function log(cod: number, tag: string, ...log: any[]) {
    if (cod == 0)
        logger.log(log, tag);
        // console.log("[ INFO ] ", tag, ...log);
}