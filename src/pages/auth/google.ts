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
import { initializeApp, FirebaseOptions } from "firebase/app";

export class GoogleLoginProvider implements SocialLoginProvider {
  private auth: Auth;

  constructor(firebaseConfig: FirebaseOptions) {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  async initialize(): Promise<void> {
    // Firebase의 경우 constructor에서 이미 초기화되었으므로 추가 작업 불필요
    return Promise.resolve();
  }

  async loginWithPopup(): Promise<SocialLoginResult> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return this.processResult(result.user);
  }

  async loginWithRedirect(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(this.auth, provider);
  }

  async getRedirectResult(): Promise<SocialLoginResult | null> {
    const result = await getRedirectResult(this.auth);
    return result ? this.processResult(result.user) : null;
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
