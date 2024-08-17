import BocceLeaguesLogo from "../ui/bocce-leagues-logo";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <nav className="bg-patina-400">
        <div className="flex shrink-0 items-end rounded-lg p-4">
          <BocceLeaguesLogo />
        </div>
      </nav>
      <div className="p-4 bg-gray-100">{children}</div>
    </main>
  );
}
