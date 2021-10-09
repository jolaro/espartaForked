import { getAuthTokenFromStorage, isLoggedIn, saveAuthToken } from "../utils/user_auth.util";
import { createState } from "@hookstate/core";

class GlobalState {
  public authToken = createState(getAuthTokenFromStorage());
  public isLoggedIn = createState(isLoggedIn());

  public setSignedIn = (authToken: string) => {
    this.authToken.set(authToken);
    this.isLoggedIn.set(true);
    saveAuthToken(authToken);
  };
}

export default new GlobalState();
