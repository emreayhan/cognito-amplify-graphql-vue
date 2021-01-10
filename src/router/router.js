import Home from "@/views/Home";
import About from "@/views/About";
import List from "@/views/List";
import SignUp from "@/views/SignUp";
export default [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/list",
    name: "List",
    component: List
  }
];
