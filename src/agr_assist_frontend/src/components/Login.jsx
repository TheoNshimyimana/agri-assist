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
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="text-center text-white mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-400 drop-shadow-lg">
             AI-powered Agri-Assist
          </h1>
          <p className="text-lg md:text-xl text-white drop-shadow-lg mt-16  mx-auto max-w-4xl">
            Welcome to  AI-powered AGRI-Assist 🌱, an AI & Blockchain-powered platform for smart farming. Our system provides real-time insights and analytics to enhance agricultural productivity and sustainability.
          </p>
        </div>

        <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Network Identity Login
          </h2>

          {isAuthenticated ? (
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                Logged in as:{" "}
                <span className="font-mono text-sm text-blue-600">{principal}</span>
              </p>
            </div>
          ) : (
            <Button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-base"
            >
              Login with Internet Identity
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
