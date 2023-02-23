export class Admin {
    constructor(
        public _id: {
            $oid: string;
        },
        public email: string,
        public name: string,
        public authority: boolean   
    ) {
            
    }
}
    