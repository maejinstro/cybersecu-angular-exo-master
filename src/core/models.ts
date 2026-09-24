export const API_URL = 'http://localhost:3000';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  items?: Item[];
}

export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  userId: number;
  user?: User;
}
