export interface Session {
  id?: number;
  userId: number;
  token: string;
  device: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
