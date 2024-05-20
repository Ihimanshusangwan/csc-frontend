import { useEffect } from "react";
import LoginForm from "./LoginForm";

function Login({ setIsLoggedIn }:{
  setIsLoggedIn: any
}) {
  useEffect(() => {
    document.title = "Login Page";
  }, []);
  return (
    <div>
    
      <div className="mx-auto d-flex justify-content-center align-item-center">
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
}

export default Login;
