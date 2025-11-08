import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(60rem_60rem_at_0%_0%,theme(colors.sky.50),transparent_60%),radial-gradient(50rem_50rem_at_100%_100%,theme(colors.indigo.50),transparent_60%)]">
      <Header />
      <main className="mx-auto max-w-screen-2xl px-6 py-8">{children}</main>
    </div>
  );
}
