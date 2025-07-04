import type { Port } from "../port";

import { ContextSafeType } from "../../../errors-as-values/baseContextSafeTypet";

export class WebsocketUrl extends ContextSafeType<string> {
    customValidator(v: string): boolean {
        if (!v.includes("ws://")) {
            return false;
        }
        return true;
    }

    static unsafe
        = {
            withLocalhost: (port: Port) => {
                return new WebsocketUrl(`ws://localhost:${port.value}`);
            },
        };
}
