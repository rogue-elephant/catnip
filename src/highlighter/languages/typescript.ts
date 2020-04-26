import { Javascript } from "./javascript";

export class Typescript extends Javascript {
    constructor(){
        super();
        this.reservedKeywords.concat('extends', 'export', 'import');
     }
}