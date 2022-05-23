export function env(envS: string) {
    return process.env[envS];
}

export function log(cod: number, tag: string, ...log: any[]) {
    if (cod == 0)
        console.log("[ INFO ] ", tag, ...log);
}