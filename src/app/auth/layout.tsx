import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-60 w-80">{children}</div>
    </div>
  );
};

export default Layout;
