
import { Input } from "@/components/ui/input";
import { SearchIcon } from "./IconComponents";

function Header() {
    return (
        <header className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] py-6 px-4 md:px-6">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white">
                    <h1 className="text-3xl font-bold">Go! Forum</h1>
                    <p className="text-lg">Engage and Connect</p>
                </div>
                <div className="relative w-full max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search discussions..."
                        className="w-full rounded-full bg-white/20 px-10 py-2 text-white placeholder:text-gray-300 focus:outline-none"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
