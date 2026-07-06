import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="relative mt-10">
      <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />

      <Input
        placeholder="Search recipes or ingredients..."
        className="h-14 pl-12 text-lg"
      />
    </div>
  );
}
