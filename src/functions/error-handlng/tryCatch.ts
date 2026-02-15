export function TryCatch<
    TFunc extends () => any,
    TSuccess extends (arg: ReturnType<TFunc>) => unknown,
    TError extends (arg: Error) => unknown
>(v: TFunc, succesHandler: TSuccess, errorHandler: TError): ReturnType<TSuccess> | ReturnType<TError> {
    try {
        return succesHandler(v())
    }catch(e){ 
        return errorHandler(e)
    }
}