import { Analytics } from "@vercel/analytics/next"
import {Baloo_2} from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight : ['400','500','700']
});



export const metadata = {
  title: "thechat.in - Just chat",
  description: "Just chat , Nothing speacial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} antialiased`}
      >
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
