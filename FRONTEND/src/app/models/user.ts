export class User {

    constructor(
        public name: string,
        public surname1: string,
        public surname2: string,
        public birthDate: Date,
        public phone: string,
        public postalCode: string,
        public town: string,
        public address: string,
        public email: string,
        public nif: string,
        public activated: boolean,
        public documents?: Array<any>,
        public password?: string,
    ) {

    }
}
