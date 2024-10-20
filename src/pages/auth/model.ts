export interface SocialLoginResult {
  provider: SocialType;
  user: User;
  token: string;
}

export interface SocialLoginProvider {
  initialize(): Promise<void>;
  loginWithPopup(): Promise<SocialLoginResult>;
  loginWithRedirect(): Promise<void>;
  getRedirectResult(): Promise<SocialLoginResult | null>;
  logout(): Promise<void>;
}

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

export type SocialType = "google" | "kakao";
