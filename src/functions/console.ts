class Logger {
    log(msg: any): void {
        console.log("----------------------------------------------------------------");
        console.log(msg);
        console.log("----------------------------------------------------------------");
    }
}

export const logger = new Logger();
