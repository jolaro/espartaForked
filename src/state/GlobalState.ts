import {
  getUser,
  removeAuthToken,
  getAuthTokenFromStorage,
  isLoggedIn,
  saveAuthToken,
  saveUser,
} from "./../utils/user_auth.util";
import { createState } from "@hookstate/core";
import { User } from "interfaces/User";

class GlobalState {
  private _authToken = createState(getAuthTokenFromStorage());
  private _isLoggedIn = createState(isLoggedIn());
  private _user = createState<User | null>(getUser());

  public get authToken(): string | null {
    return this._authToken.get();
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn.get();
  }

  public get user(): User | null {
    return this._user.get();
  }

  public signIn = (authToken: string, user: User) => {
    this._authToken.set(authToken);
    this._isLoggedIn.set(true);
    this._user.set(user);

    saveUser(user);
    saveAuthToken(authToken);
  };

  public signOut = () => {
    removeAuthToken();
    this._authToken.set(null);
    this._isLoggedIn.set(false);
  };
}

export default new GlobalState();
