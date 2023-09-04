import { messageType } from "../@types/All";

export default class Message {
  constructor(
    public type: messageType,
    public payload: string,
    public author: string | null
  ) {}

  public toString() {
    return JSON.stringify(this);
  }
}
