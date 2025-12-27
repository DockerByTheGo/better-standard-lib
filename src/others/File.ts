class FileNameConstrcutors {
  JSON(name: string) {
    return new FileName(name, "json");
  }
}

export class FileName {
  constructor(public readonly name: string, public readonly extension: string) {

  }

  public fullName = `${this.name}.${this.extension}`;
}
