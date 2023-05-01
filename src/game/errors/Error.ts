class Error<T>{
    private error: T;
    
    constructor(error: T){
        this.error = error;
    }

    public getErrorMessage(): T {
        return this.error;
    }
};

export default Error;