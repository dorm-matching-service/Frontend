// src/types/user.ts
export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  consent_privacy: boolean;
  consent_privacy_at: string | null;
  consent_privacy_version: number | null;
  created_at: string;
  last_login: string | null;
  hasConsented: boolean;
}
