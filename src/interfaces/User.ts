import { UserRole } from "./Role";
import { Depot } from "./Depot";

export interface User {
  id: number;
  name: string;
  email: string;
  access_level: string;
  language: string;
  depots: Depot[];
  role: UserRole;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
