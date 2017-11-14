import {User} from "./user";

export class Idea {

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public owner?: string,
    public username?: string,
    public timestamp: number = new Date().getTime(),
    public positiveVotes: number = 0,
    public negativeVotes: number = 0,
    public published: boolean = true,
    public shortDescription: string = "",
  ) { }
}
