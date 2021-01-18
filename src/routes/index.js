import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import Marking from "../pages/marking/Marking";

export const ROUTES = [
  {
    path: "/",
    key: "main",
    exact: true,
    component: () => <Marking></Marking>
  },
  {
    path: "/marking",
    key: "marking",
    exact: true,
    component: () => <Marking></Marking>
  },
  {
    path: "/login",
    key: "login",
    component: () => <Login></Login>
  },
  {
    path: "/signUp",
    key: "signup",
    component: () => <SignUp></SignUp>
  }
]

export const ROUTES_PATH = {
  Main: "/",
  Marking: "/marking",
  Login: "/login",
  SignUp: "/signUp"
}
