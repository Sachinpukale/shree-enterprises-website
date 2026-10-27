import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

import BootstrapClient from "@/components/BootstrapClient";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shree Enterprises | Electrical & Water Solutions",
  description:
    "Professional electrical wiring, water purification, residential and commercial support, and elevator maintenance services in Pune.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="top">
        <Navbar />
        <BootstrapClient />
        {children}
        <Footer />
      </body>
    </html>
  );
}
