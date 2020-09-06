import {TodoModel, HelloModel} from "../models";

export interface RootState {
    todos: RootState.TodoState;
    hello: RootState.HelloState;
    router?: any;
}

export namespace RootState {
    export type TodoState = TodoModel[];
    export type HelloState = HelloModel;
}
