import * as loaderAction from "../../Actions/Loader/LoaderAction";
import { store } from "../../index";

export class FullWaitingSign {    

    constructor() {        
        
    }

    static async Show(dispatch, hasBackground = true, showText = true) {
        await store.dispatch( loaderAction.SetLoader(true, hasBackground, showText));
    }

    static async Remove(dispatch){
        await store.dispatch( loaderAction.SetLoader(false));
    }
}
