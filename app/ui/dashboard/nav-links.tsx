"use client";

import {
  UserGroupIcon,
  CalendarIcon,
  HomeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Matches", href: "/dashboard/matches", icon: PencilSquareIcon },
  {
    name: "Teams",
    href: "/dashboard/teams",
    icon: UserGroupIcon,
  },
  { name: "Schedules", href: "/dashboard/schedules", icon: CalendarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-patina-100 hover:text-patina-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "patina-100 text-patina-600": pathname === link.href,
              },
            )}
            href={link.href}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
