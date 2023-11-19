export default class Message {
  private id: object | undefined;
  private userId: object;
  private content: string;
  private date: Date | undefined;

  constructor(userId: object, content: string, date?: Date) {
    this.userId = userId;
    this.content = content;
    this.date = date;
  }

  getId(): object | undefined {
    return this.id;
  }

  getUserId(): object {
    return this.userId;
  }

  getContent(): string {
    return this.content;
  }

  getDate(): Date | undefined {
    return this.date;
  }

  setId(newId: object): void {
    this.id = newId;
  }

  setUserId(newUserId: object): void {
    this.userId = newUserId;
  }

  setContent(newContent: string): void {
    this.content = newContent;
  }

  setDate(): void {
    this.date = new Date();
  }
}
