import React from "react";
import {Switch, Route} from 'react-router-dom';


import SignUp from "../pages/signUp";
import SignIn from "../pages/signIn";

const Routes: React.FC = () => (

    <Switch>
        <Route path="/" exact component={SignIn}></Route>
        <Route path="/signUp" exact component={SignUp}></Route>

    </Switch>

);

export default Routes;
