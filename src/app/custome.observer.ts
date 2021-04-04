import { Observer } from "rxjs";

export class CustomObserver implements Observer<string>{

    closed?: boolean | undefined;
    next(value: string) {
        console.debug("next called " + value);
    }
    error(err: any) {
        console.debug(" Error called " + err);
    };
    complete(){
        console.debug(" complete " );
    }

}