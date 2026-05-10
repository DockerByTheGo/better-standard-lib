type FunctionArgumentConfig<T> = {
  schema: T;
  defaultValue?: T;
  validator?: (v: T) => boolean;
};

function newFunctionArg<T>(args: FunctionArgumentConfig<T>) {
  return class FunctionArgument {
    constructor(public readonly value: T) {
      if (args.validator && !args.validator(value)) {
        throw new Error("Invalid function argument value.");
      }
    }

    static def = () => new FunctionArgument(args.defaultValue as T);
  };
}

class MessageArg extends newFunctionArg({ schema: "", defaultValue: "d" }) {}

function sendMessage(msg: MessageArg) {
  return msg.value.length;
}

void sendMessage;
