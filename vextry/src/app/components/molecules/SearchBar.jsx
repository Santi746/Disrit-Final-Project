"use client";

export default function SearchBar() {
    return (
            <div className="w-full px-2">
                <div className="relative flex items-center w-full">
                    <div className="absolute left-4 text-[#5c7a5c]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search clubs, topics, or interests..." 
                        className="w-full bg-[#0a0f0a] border border-[#1f2e1f] rounded-md py-3.5 pl-[46px] pr-4 text-white placeholder-[#383d38] focus:outline-none focus:border-[#22c55e]/60 transition-colors text-[15px]"
                    />
                </div>
            </div>
    )
}