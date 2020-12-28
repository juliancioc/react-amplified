export function loginApp(status) {
  return {
    type: "LOGIN_REQUIRED",
    payload: {
      status,
    },
  };
}

export function createAccount(status) {
  return {
    type: "CREATE_ACCOUNT",
    payload: {
      status,
    },
  };
}

export function forgotPassword(status) {
  return {
    type: "FORGOT_PASSWORD",
    payload: {
      status,
    },
  };
}

export function infoAccount(status) {
  return {
    type: "INFO_ACCOUNT",
    payload: {
      status,
    },
  };
}

export function infoUserInactive(status) {
  return {
    type: "INFO_USER_ACTIVE",
    payload: {
      status,
    },
  };
}
