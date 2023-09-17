import SideBar from "@/components/SideBar";
import "./globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify",
  description: "Music App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <SideBar>{children}</SideBar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
