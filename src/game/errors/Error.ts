class Error<T>{
    private error: T;
    
    constructor(error: T){
        this.error = error;
    }

    public getError(): T {
        return this.error;
    }
};

export default Error;