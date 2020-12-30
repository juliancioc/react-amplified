import { Reducer } from "redux";

const INITIAL_STATE = {
  status: false,
  isCreateAccount: false,
  isForgotPassword: false,
  isActiveUser: true,
};

export const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUIRED": {
      const { status } = action.payload;
      return {
        ...state,
        status: status,
      };
    }
    default: {
      return state;
    }
  }
};

export const isCreateAccountUser = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "CREATE_ACCOUNT": {
      const { isCreateAccount } = action.payload.status;
      return {
        ...state,
        isCreateAccount: isCreateAccount,
      };
    }
    default: {
      return state;
    }
  }
};

export const isForgotPasswordUser = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "FORGOT_PASSWORD": {
      const { isForgotPassword } = action.payload.status;
      return {
        ...state,
        isForgotPassword: isForgotPassword,
      };
    }
    default: {
      return state;
    }
  }
};

export const isInfoAccountUser = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "INFO_ACCOUNT": {
      const { isInfoAccount } = action.payload.status;
      return {
        ...state,
        isInfoAccount: isInfoAccount,
      };
    }
    default: {
      return state;
    }
  }
};

export const isInfoActiveUser = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "INFO_USER_ACTIVE": {
      const { isActiveUser } = action.payload.status;
      return {
        ...state,
        isActiveUser: isActiveUser,
      };
    }
    default: {
      return state;
    }
  }
};
