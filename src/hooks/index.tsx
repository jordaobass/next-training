import React from 'react'

import {AuthHook, AuthProvider} from "./AuthHook";
import {ToastProvider} from "./ToastHook";


const AppProvider: React.FC = ({children}) => (
    <AuthProvider>
        <ToastProvider>{children} </ToastProvider>
    </AuthProvider>
);

export default AppProvider;
