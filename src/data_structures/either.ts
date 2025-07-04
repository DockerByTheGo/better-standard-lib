type EitherValue = {
    v: "left" | "right";
};

export class Either<L, R> {
    private v: L | R;
    constructor();

    if(config: {
        left: (v: L) => void;
        right: (v: R) => void;
    }) {}
}
