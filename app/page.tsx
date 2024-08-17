import BocceLeaguesLogo from "@/app/ui/bocce-leagues-logo";
import { koulen } from "@/app/ui/fonts";
import { Button } from "@/app/ui/core/button";
import { Link } from "./ui/core/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-limed-spruce-800 bg-hero bg-cover bg-bottom h-[100vh]">
        <div className="flex shrink-0 items-end rounded-lg  p-4">
          <BocceLeaguesLogo />
        </div>
        <div className="mt-12 flex grow flex-col gap-4 md:flex-row md:bg-white md:text-black md:max-w-md md:rounded-xl md:m-auto">
          <div className={`${koulen.className} text-white p-6 md:text-black`}>
            <h2 className={`text-[34px] text-white md:text-black`}>
              Start Your League Today!
            </h2>
            <p className="text-xl mb-8">
              Create, manage, and schedule your bocce league effortlessly. Get
              started in minutes!
            </p>
            <Button intent="transparent" fullWidth href="/dashboard">
              Join Now
            </Button>
            <div className="flex mt-4 justify-center">
              <Link href="/leagues" intent="gray">
                Browse Leagues
              </Link>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
