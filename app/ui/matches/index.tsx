import { Button } from "@/app/ui/core/button";
import Games from "./games";

export default function Matches({ matches, isEditable = false }: any) {
  return (
    <div className="max-w-md">
      {Object.keys(matches).map((match: any) => (
        <div className="flex items-center gap-4">
          <div className="bg-white mb-4 p-4 rounded-xl flex-grow">
            <Games games={matches[match]} />
          </div>
          {isEditable && <Button intent="link">Edit</Button>}
        </div>
      ))}
    </div>
  );
}
