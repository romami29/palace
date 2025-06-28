import React from "react";

const LoginPage = () => {
  const handleLogin = (provider) => {
    const baseUrl = process.env.REACT_APP_API_URL || "";
    window.location.href = `${baseUrl}/api/auth/${provider}`;
  };

  return (
    <div className="page-section">
      <div className="main-content">
        <h2 className="section-title">Connexion</h2>
        <div className="login-options">
          <button
            className="btn"
            onClick={() => handleLogin("google")}
            style={{ marginBottom: "1rem" }}
          >
            Se connecter avec Google
          </button>
          <button
            className="btn"
            onClick={() => handleLogin("facebook")}
            style={{ marginBottom: "1rem" }}
          >
            Se connecter avec Facebook
          </button>
          <button className="btn" onClick={() => handleLogin("apple")}>
            Se connecter avec Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
