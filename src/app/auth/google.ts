import { SocialLoginProvider, SocialLoginResult } from "./model";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  User,
  Auth,
} from "firebase/auth";
import { initializeApp, FirebaseOptions, getApps } from "firebase/app";

export class GoogleLoginProvider implements SocialLoginProvider {
  private auth: Auth;

  constructor(firebaseConfig: FirebaseOptions) {
    try {
      const existingApp = getApps().find((app) => app.name === "[DEFAULT]");
      if (existingApp) {
        this.auth = getAuth(existingApp);
      } else {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
      }
    } catch (error) {
      console.error("Firebase 초기화 오류:", error);
      throw error;
    }
  }

  async initialize(): Promise<void> {
    return Promise.resolve();
  }

  async loginWithPopup(): Promise<SocialLoginResult> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return this.processResult(result.user);
  }

  async loginWithRedirect(redirectUrl?: string): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();

      if (redirectUrl) {
        provider.setCustomParameters({
          login_hint: "user@example.com",
          prompt: "select_account",
        });
      }

      await signInWithRedirect(this.auth, provider);
    } catch (error) {
      console.error("리다이렉트 오류:", error);
      throw error;
    }
  }

  async getRedirectResult(): Promise<SocialLoginResult | null> {
    try {
      const result = await getRedirectResult(this.auth);

      if (result && result.user) {
        return this.processResult(result.user);
      }

      return null;
    } catch (error) {
      console.error("리다이렉트 결과 가져오기 오류:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  private async processResult(user: User): Promise<SocialLoginResult> {
    const token = await user.getIdToken();
    return {
      provider: "google",
      user: {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
      token: token,
    };
  }
}
