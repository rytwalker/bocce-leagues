import { Inter } from "next/font/google";
import { Lusitana } from "next/font/google";
import { Koulen } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const koulen = Koulen({ subsets: ["latin"], weight: ["400"] });
