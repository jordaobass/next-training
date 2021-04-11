import React, {createContext, useCallback, useState} from 'react'
import api from "../services/api";


interface AuthState {
  token: string;
  userName: string;
}

interface SignInCredencials {
  email: string;
  password: string
}

interface AuthContextData {
  token: string

  signIn(credencials: SignInCredencials): Promise<void>

  signOut(): void
}

const AuthHook = createContext<AuthContextData>(
    {} as AuthContextData,
);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>(() => {

    const token = localStorage.getItem('@GoBarber:token');
    const userName = localStorage.getItem('@GoBarber:user');

    if (token && userName) {
      return {token, userName};
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({email, password}) => {
    console.log(email);
    console.log(password);

    const response = await api.post('usuario/authenticate'
        , {UserName: email, Password: password}
    );

    const {token, userName} = response.data

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', userName);
    console.log(response.data);
    setData({token, userName})

  }, []);

  const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');
        setData({} as AuthState)
      },
      [],
  );

  return (
      <AuthHook.Provider value={{token: data.token, signIn, signOut}}>
        {children}
      </AuthHook.Provider>);
};


export {AuthHook, AuthProvider}
