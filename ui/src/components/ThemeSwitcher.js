import React, { useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState({
    "--background-color": "#000",
    "--text-color": "#fff",
    "--accent-color": "#00ff88",
    "--border-color": "#333",
    "--button-text-color": "#000",
    "--logo-gradient": "linear-gradient(90deg, #fff, #00ff88, #fff)",
    "--button-gradient": "linear-gradient(45deg, #00ff88, #ff0088)",
    "--hero-background": "linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%)",
    "--hero-overlay": `radial-gradient(
      circle at 20% 50%,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 0, 136, 0.1) 0%,
      transparent 50%
    )`,
    "--button-hover-shadow": "rgba(0, 255, 136, 0.4)",
    "--navbar-background": "rgba(0, 0, 0, 0.9)",
  });

  const handleThemeChange = (key, value) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      [key]: value,
    }));
    document.documentElement.style.setProperty(key, value);
  };

  return (
    <div className="theme-switcher">
      <h3>Theme Switcher</h3>
      <div>
        <label>
          Background Color:
          <input
            type="color"
            value={theme["--background-color"]}
            onChange={(e) => handleThemeChange("--background-color", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Text Color:
          <input
            type="color"
            value={theme["--text-color"]}
            onChange={(e) => handleThemeChange("--text-color", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Accent Color:
          <input
            type="color"
            value={theme["--accent-color"]}
            onChange={(e) => handleThemeChange("--accent-color", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Border Color:
          <input
            type="color"
            value={theme["--border-color"]}
            onChange={(e) => handleThemeChange("--border-color", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
