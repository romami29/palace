import React, { useEffect, useState } from "react";

const COLOR_VARS = [
  { name: "--background-color", label: "Background Color" },
  { name: "--text-color", label: "Text Color" },
  { name: "--accent-color", label: "Accent Color" },
  { name: "--border-color", label: "Border Color" },
  { name: "--button-text-color", label: "Button Text Color" },
  { name: "--logo-gradient", label: "Logo Gradient" },
  { name: "--button-gradient", label: "Button Gradient" },
  { name: "--hero-background", label: "Hero Background" },
  { name: "--hero-overlay", label: "Hero Overlay" },
  { name: "--navbar-background", label: "Navbar Background" },
  { name: "--font-family", label: "Font Family" },
  { name: "--button-hover-shadow", label: "Button Hover Shadow" },
];

const ThemeEditor = () => {
  const [colors, setColors] = useState([]);
  const [cssOutput, setCssOutput] = useState("");

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const initialColors = COLOR_VARS.map((varObj) => ({
      name: varObj.name,
      label: varObj.label,
      value: varObj.name === "--font-family" 
        ? styles.getPropertyValue(varObj.name).trim() || "Arial, sans-serif" 
        : styles.getPropertyValue(varObj.name).trim(),
    }));
    setColors(initialColors);
  }, []);

  const handleColorChange = (index, newValue) => {
    const updatedColors = [...colors];
    updatedColors[index].value = newValue;
    setColors(updatedColors);
    document.documentElement.style.setProperty(updatedColors[index].name, newValue);
  };

  const handleInputTypeChange = (index, type) => {
    const updatedColors = [...colors];
    updatedColors[index].type = type;
    setColors(updatedColors);
  };

  const handleGradientChange = (index, newValue) => {
    const updatedColors = [...colors];
    updatedColors[index].value = newValue;
    setColors(updatedColors);
    document.documentElement.style.setProperty(updatedColors[index].name, newValue);
  };

  const exportTheme = () => {
    const cssContent =
      ":root {\n" +
      colors.map((color) => `  ${color.name}: ${color.value};`).join("\n") +
      "\n}";
    setCssOutput(cssContent);
  };

  return (
    <div style={{ padding: "20px", background: "#222", color: "#fff", borderRadius: "8px", margin: "20px auto", maxWidth: "600px" }}>
      <h2>Theme Editor</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {colors.map((color, index) => (
          <div key={color.name} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <label style={{ flex: "1", color: "#ccc" }}>{color.label}</label>
            {color.name === "--font-family" ? (
              <input
                type="text"
                value={color.value}
                onChange={(e) => handleColorChange(index, e.target.value)}
                placeholder="Enter font family (e.g., Arial, sans-serif)"
                style={{ flex: "2", padding: "5px", borderRadius: "4px", border: "1px solid #444", background: "#111", color: "#fff" }}
              />
            ) : color.name.includes("gradient") ? (
              <>
                <select
                  value={color.type || "color"}
                  onChange={(e) => handleInputTypeChange(index, e.target.value)}
                  style={{ flex: "1", padding: "5px", borderRadius: "4px", border: "1px solid #444", background: "#111", color: "#fff" }}
                >
                  <option value="color">Color</option>
                  <option value="gradient">Gradient</option>
                </select>
                {color.type === "gradient" ? (
                  <input
                    type="text"
                    value={color.value}
                    onChange={(e) => handleGradientChange(index, e.target.value)}
                    placeholder="Enter gradient (e.g., linear-gradient(...))"
                    style={{ flex: "2", padding: "5px", borderRadius: "4px", border: "1px solid #444", background: "#111", color: "#fff" }}
                  />
                ) : (
                  <input
                    type="color"
                    value={/^#/.test(color.value) ? color.value : "#000000"}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    style={{ width: "40px", height: "40px", border: "none" }}
                  />
                )}
              </>
            ) : (
              <>
                <input
                  type="color"
                  value={/^#/.test(color.value) ? color.value : "#000000"}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  style={{ width: "40px", height: "40px", border: "none" }}
                />
                <input
                  type="text"
                  value={color.value}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  style={{ flex: "2", padding: "5px", borderRadius: "4px", border: "1px solid #444", background: "#111", color: "#fff" }}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={exportTheme}
        style={{ marginTop: "20px", padding: "10px 20px", background: "#00ff88", border: "none", borderRadius: "4px", color: "#000", cursor: "pointer" }}
      >
        Export CSS
      </button>
      {cssOutput && (
        <div style={{ marginTop: "20px" }}>
          <h4>Exported CSS:</h4>
          <textarea
            value={cssOutput}
            readOnly
            style={{ width: "100%", height: "150px", background: "#111", color: "#fff", borderRadius: "4px", border: "1px solid #444", padding: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ThemeEditor;
