import { SocialLoginProvider, SocialLoginResult } from "./model";

declare global {
  interface Window {
    Kakao: any;
  }
}

export class KakaoLoginProvider implements SocialLoginProvider {
  private clientId: string;
  private initialized: boolean = false;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao) {
          window.Kakao.init(this.clientId);
          this.initialized = true;
          resolve();
        } else {
          reject(new Error("Failed to load Kakao SDK"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load Kakao SDK"));
      document.body.appendChild(script);
    });
  }

  async loginWithPopup(): Promise<SocialLoginResult> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      window.Kakao.Auth.login({
        success: (authObj: any) => {
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (response: any) => {
              resolve(this.processResult(response, authObj.access_token));
            },
            fail: reject,
          });
        },
        fail: reject,
        redirectUri: "http://localhost:5173/",
      });
    });
  }

  async loginWithRedirect(): Promise<void> {
    await this.ensureInitialized();
    window.Kakao.Auth.authorize({
      redirectUri: window.location.origin,
    });
  }

  async getRedirectResult(): Promise<SocialLoginResult | null> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      window.Kakao.Auth.getStatusInfo((result: any) => {
        if (result.status === "connected") {
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (response: any) => {
              resolve(this.processResult(response, result.access_token));
            },
            fail: reject,
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  async logout(): Promise<void> {
    await this.ensureInitialized();
    if (window.Kakao.Auth.getAccessToken()) {
      await new Promise<void>((resolve) => {
        window.Kakao.Auth.logout(() => resolve());
      });
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  private processResult(userInfo: any, token: string): SocialLoginResult {
    return {
      provider: "kakao",
      user: userInfo,
      token: token,
    };
  }
}
