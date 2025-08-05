import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{
      backgroundColor: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "1rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    }}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ padding: "0.5rem 0" }}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ paddingBottom: "0.5rem", borderBottom: "1px solid #e2e8f0" }}>
    {children}
  </div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
    {children}
  </h2>
);


