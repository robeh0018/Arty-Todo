import {FirebaseAuthUser} from "../models";

export class FirebaseAuthResponse {

  public static success(payload: FirebaseAuthUser) {

    return {
      success: true,
      payload,
      error: null,
    }
  }

  public static fail(error: string) {

    return {
      success: false,
      payload: null,
      error,
    }
  }
}
