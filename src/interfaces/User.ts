export interface User {
  id: number;
  name: string;
  email: string;
  access_level: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
