import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Bg from "../images/bg.jpg";  

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      setPrincipal(identity.getPrincipal().toText());
      setIsAuthenticated(true);
      navigate("/home/overview");
    }
  };

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
        setIsAuthenticated(true);
        navigate("/home/overview");
      },
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="bg-white shadow-lg p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Network Identity Login</h2>
        {isAuthenticated ? (
          <div>
            <p className="mb-4">Logged in as: <span className="font-mono">{principal}</span></p>
           </div>
        ) : (
          <Button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white">Login with Internet Identity</Button>
        )}
      </div>
    </div>
  );
};

export default Login;
