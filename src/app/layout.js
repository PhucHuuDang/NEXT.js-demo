import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

// this is static metadata
export const metadata = {
    title: "Harry Dang",
    description: "The website demo for learn nextjs",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* Error: Hydration failed because the initial UI does not match what was rendered on the server.
            Warning: Expected server HTML to contain a matching <h1> in <html>. got this error cause put h1 outside body part
 */}
            {/* <h1>Main Layout</h1> */}
            <body suppressHydrationWarning className={inter.className}>
                <ThemeProvider>
                    <AuthProvider>
                        <div className="container">
                            <Navbar />
                            {children}
                            <Footer />
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
