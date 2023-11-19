export interface ServerToClientEvents {
  'chat message': (
    msg: string,
    result: string | undefined,
    username: string
  ) => void; //pasar a objeto
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  'chat message': (msg: string, username: string) => void;
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
