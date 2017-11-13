export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public isManager?: boolean,
        public isApproved?: boolean,
        public password?: string
    ) { }
}
