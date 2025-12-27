export class TypeError<TName extends string, TMessage extends string> {
  constructor(public readonly name: TName, public readonly msg: TMessage) {

  }
}
