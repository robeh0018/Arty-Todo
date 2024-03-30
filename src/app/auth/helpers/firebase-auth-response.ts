import {FirebaseAuthUser} from "../models";

export class FirebaseAuthResponse<T> {

  public static successWithUserAsPayload(payload: FirebaseAuthUser) {

    return {
      success: true,
      payload,
      error: null,
    }
  }

  public static successWithMessageAsPayload(payload: string) {

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
