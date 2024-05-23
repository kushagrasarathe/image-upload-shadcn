import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import Footer from "@/components/footer";

const font = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
