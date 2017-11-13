export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public type: number,
        public password?: string
    ) { }
}
