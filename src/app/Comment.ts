import {User} from "./user";

export class Comment {

  constructor(
    public id: string,
    public content: string,
    public owner?: string,
    public username?: string,
    public idea?: string,
    public timestamp: number = new Date().getTime(),
    public aproved: boolean = true,
  ) {}

}
