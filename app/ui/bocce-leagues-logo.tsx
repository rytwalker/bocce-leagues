import { koulen } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function BocceLeaguesLogo() {
  return (
    <div
      className={`${koulen.className} flex flex-row items-center leading-none text-white`}
    >
      <Link href="/">
        <Image
          src="logo.svg"
          width={100}
          height={100}
          alt="Bocce Leagues Logo"
        />
      </Link>
    </div>
  );
}
