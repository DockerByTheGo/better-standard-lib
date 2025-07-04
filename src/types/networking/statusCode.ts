import { ContextSafeType } from "../baseContextSafeTypet.ts";

export class StatusCode extends ContextSafeType<number> {
    customValidator(v: number): boolean {
        return (v >= 1 && v <= 600);
    }
}
