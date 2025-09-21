import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/redux";
import { Cairo } from "next/font/google";
import { Setup } from "@/Components/utils";
import CustomLayout from "./CustomLayout";

const cairo = Cairo({ subsets: ["latin"],display: 'swap', adjustFontFallback: false});



export const metadata: Metadata = {
  title: "مهارة قانونية",
  description: "",
  icons:{
    icon:'/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
        <body className={cairo.className + " light"}>
        <Provider>
          <Setup />
            <CustomLayout>
              {children}
            </CustomLayout>
        </Provider>
      </body>
    </html>
  );
}
