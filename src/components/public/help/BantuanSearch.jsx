import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BantuanSearch({ placeholder, value, onChange }) {
  return (
    <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-2 bg-white shadow-sm mx-12 my-6">
      <Input
        className="border-none shadow-none focus-visible:ring-0 text-sm flex-1 p-0 h-auto"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Button size="sm" className="bg-[#1e3a5f] hover:bg-[#152d4a] text-white flex items-center gap-1 px-4">
        <Search className="w-3 h-3" />
        Search
      </Button>
    </div>
  );
}