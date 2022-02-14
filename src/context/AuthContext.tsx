import React, { createContext, useEffect, useReducer } from "react";
import { AuthEnum } from "../enums";

export const AuthContext = createContext<{
  auth: Auth | null;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

type AuthState = {
  auth: Auth | null
}

type AuthAction = {
  type: AuthEnum
  payload: Auth | null
}

interface Auth {
  AuthorizationToken: {
    RefreshToken: string,
    Token: string,
    TokenExpires: string
  },
  User: {
    ClientRoles: string[],
    Email: string,
    FullName: string,
    Id: number,
    Initials: string,
    Products: string[]
  }
}


const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthEnum.LOG_IN:
      return { ...state, auth: action.payload }
    case AuthEnum.LOG_OUT:
      return { ...state, auth: null }
    case AuthEnum.REFRESH_TOKEN:
      return { ...state, auth: action.payload } 
    default:
      return state;
  }
}

export const AuthContextProvider: React.FC = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, {
    auth: null
  })
  
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}