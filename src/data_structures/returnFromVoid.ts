export class ReturnFromSubfunctionWithOUtsideRefernce<StateType> {
    private value: StateType;
    private func: (v: StateType) => void;
    constructor(v: StateType, func: (v: StateType) => void) {
        this.value = v;
        this.func = func;
    }

    e() {

    }

    private run(): StateType {

    }
}

export function ReturnFromSubfunction<ReturnType>(func: (v: ReturnType) => unknown): ReturnType {
    const v = null;
    return func(v);
}

const f = ReturnFromSubfunction<number>((v) => {
    [1, 3, 4].forEach((h) => { if (v === 5) { v = h; } });
});

const v: string = "";
new ReturnFromSubfunctionWithOUtsideRefernce(v, (v) => {
    [1, 2, 4].forEach((h) => {
        v = h.toString();
    });
});
