export default class User {
  private id: object | undefined;
  private username: string;
  private password: string;
  private date: Date | undefined;

  constructor(username: string, password: string, date?: Date) {
    this.username = username;
    this.password = password;
    this.date = date;
  }

  getId(): object | undefined {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getDate(): Date | undefined {
    return this.date;
  }

  setId(newId: object): void {
    this.id = newId;
  }

  setUsername(newUsername: string): void {
    this.username = newUsername;
  }

  setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  setDate(): void {
    this.date = new Date();
  }
}
