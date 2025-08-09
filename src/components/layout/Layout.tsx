import { ReactNode } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import WhatsAppButton from "../common/WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Layout;
