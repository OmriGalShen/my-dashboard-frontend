export class User {
  username: string;
  email: string;
  password: string;
}

export class OnlineClient {
  username: string;
  loginTime: Date;
  lastUpdated: Date;
  ip: string;
}

export class ClientDetails {
  username: string;
  registerTime: Date;
  loginCount: number;
}

export class RegisterClient {
  username: string;
  password: string;
  email: string;
}
