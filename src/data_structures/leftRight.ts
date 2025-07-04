import type { Validator } from "../utils/validator";

export type ILeftRight<LeftType, RightType> = {
    handleLeft: <HandleLeftReturnType>(handler: (v: LeftType) => Promise<HandleLeftReturnType>) => Promise<this>;
    handleRight: <HandleRightReturnType>(handler: (v: RightType) => Promise<HandleRightReturnType>) => Promise<this>;
    handleLeftWhichReturnsTheResultedValue: <ReturnType>(handler: (v: LeftType) => Promise<ReturnType>) => Promise<ReturnType>;

    handleRightWhichReturnsTheResultedValue: <ReturnType>(handler: (v: RightType) => Promise<ReturnType>) => Promise<ReturnType>;
    getRaw: () => Promise<[LeftType, RightType]>;
};

export class LeftRight<LeftType, RightType> implements ILeftRight<LeftType, RightType> {
    private left: LeftType;
    private right: RightType;
    constructor(left: LeftType, right: RightType) {
        this.left = left;
        this.right = right;
    }

    async handleLeft<HandleLeftReturnType>(handler: (v: LeftType) => Promise<HandleLeftReturnType>): Promise<this> {
        await handler(this.left);
        return this;
    }

    async handleRight<HandleRightReturnType>(handler: (v: RightType) => Promise<HandleRightReturnType>): Promise<this> {
        await handler(this.right);
        return this;
    }

    async handleLeftWhichReturnsTheResultedValue<ReturnType>(handler: (v: LeftType) => Promise<ReturnType>): Promise<ReturnType> {
        return await handler(this.left);
    }

    async handleRightWhichReturnsTheResultedValue<ReturnType>(handler: (v: RightType) => Promise<ReturnType>): Promise<ReturnType> {
        return await handler(this.right);
    }

    async getRaw(): Promise<[LeftType, RightType]> {
        return [this.left, this.right];
    }
}

export class Either<L, R> { // for when the type system is not enough toi handle differentiating between two types, see example for more
    private left: L;
    private right: R;
    private isLeft: Validator<L>;
    constructor(left: L, right: R, isLeft: (v: L | R) => boolean) {
        this.isLeft = isLeft;
        this.left = left;
        this.right = right;
    }

    async handleLeft(handler: (v: L) => Promise<void>): Promise<this> {
        if (this.isLeft(this.left)) {
            handler(this.left);
        }
        return this;
    }

    async handleRight(handler: (v: R) => Promise<void>): Promise<this> {
        if (!this.isLeft(this.left)) {
            handler(this.right);
        }
        return this;
    }
}

export class LeftRightWithMemory<Left, Right> implements ILeftRight<Left, Right> {
    private left: Left;
    private right: Right;
    private didParentSucceed: boolean = false;
    private isLeft: Validator<Left>;
    constructor(left: Left, right: Right, isLeft: Validator<Left>, didParentSucceed = false) {
        this.left = left;
        this.right = right;
        this.didParentSucceed = didParentSucceed;
        this.isLeft = isLeft;
    }

    async handleLeft<HandleLeftReturnType>(handler: (v: Left) => Promise<HandleLeftReturnType>): Promise<this> {
        if (this.didParentSucceed) {
            return this;
        }

        if (this.isLeft(this.left)) {
            handler(this.left);
            this.didParentSucceed = true;
        }

        return this;
    }

    async handleRight<HandleRightReturnType>(handler: (v: Right) => Promise<HandleRightReturnType>): Promise<this> {
        if (this.didParentSucceed) {
            return this;
        }

        if (!this.isLeft(this.left)) {
            handler(this.right);
            this.didParentSucceed = true;
        }

        return this;
    }

    handleLeftWhichReturnsTheResultedValue<ReturnType>(handler: (v: Left) => Promise<ReturnType>): Promise<ReturnType> {
        return handler(this.left);
    }

    handleRightWhichReturnsTheResultedValue<ReturnType>(handler: (v: Right) => Promise<ReturnType>): Promise<ReturnType> {
        return handler(this.right);
    }

    async getRaw(): Promise<[Left, Right]> {
        return [this.left, this.right];
    }
}

class LeftOrRight<V> {
    private value: V;
    private tag: "left" | "right";
    constructor(v: V, tag: "left" | "right") {
        this.value = v;
        this.tag = tag;
    }

    public getTag() {
        return this.tag;
    }

    public get v(): V {
        return this.value;
    }
}

export class LeftInstance<T> extends LeftOrRight<T> {
    constructor(v: T) {
        super(v, "left");
    }
}

export class RightInstance<T> extends LeftOrRight<T> {
    constructor(v: T) {
        super(v, "right");
    }
}

export class ClassicalEither<Left, Right> {
    private value: Left | Right;
    private isLeft: boolean;
    constructor(v: LeftInstance<Left> | RightInstance<Right>) {
        this.isLeft = v.getTag() === "left";
        this.value = v.v;
    }

    handleLeft(handler: (v: Left) => void): this {
        if (this.isLeft) {
            handler(this.value as Left);
        }
        return this;
    }

    handleRight(handler: (v: Right) => void): this {
        if (!this.isLeft) {
            handler(this.value as Right);
        }

        return this;
    }
}
