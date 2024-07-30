import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container px-4 mx-auto">{children}</main>
    </>
  );
}
