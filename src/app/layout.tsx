import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Slab, Bebas_Neue } from "next/font/google";
import { Providers } from "@/store/provider";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Customy App",
  description: "Sistema de Gerenciamento de Clientes e Anotações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${robotoSlab.variable} ${bebasNeue.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
