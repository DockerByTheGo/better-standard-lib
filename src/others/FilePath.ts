export class FilePath<T extends string = string> {
    constructor(public readonly value: string) {

    }

    getParts = this.value.split("/");

    exists() {
        return true
    }

    create() { }

    delete() { }
}

class FilePathBuilder {
    private readonly parts: string[] = [];
    constructor(private initial: string) { }

    addPart(part: string) {
        this.parts.push("/" + part);
        return this;
    }

    build() {
        return new FilePath(this.parts.join(""));
    }
}