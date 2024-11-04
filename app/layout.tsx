import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/redux";
import { Cairo } from "next/font/google";
import { Setup } from "@/Components/utils";
import CustomLayout from "./CustomLayout";

const cairo = Cairo({ subsets: ["latin"],  });



export const metadata: Metadata = {
  title: "Justice",
  description: "",
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
