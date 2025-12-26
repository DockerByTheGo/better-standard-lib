function newFunctionArg<T, TDefaultValue extends T | undefined = undefinedl>(args: {
    schema: T,
    defaultValue?: T
    validator?: (v: T) => boolean // replace with using iVlidatopr in future 
}
) {
    return class FunctionArgument {
        constructor(public readonly value: T) {

        }

        private validator:  = args.validator

        static def = () => new FunctionArgument(args.defaultValue)

    }
}
class MessageArg extends newFunctionArg({schema: "", defaultValue: "d"}){}

function sendMessage(msg: MessageArg){
    return 2
}

sendMessage(MessageArg.def())