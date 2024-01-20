import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "snuNav Recorder Client",
  description: "Client app to save coordinates in real-time to SNU Nav",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"dark"}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
