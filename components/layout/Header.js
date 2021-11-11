import Link from "next/link";
import Search from "../Search/Search";
import { useSession } from "next-auth/react";

function Header() {
    const { data: session, status } = useSession();

    return (
        <nav className='fixed z-20 top-0 w-full flex justify-center items-center h-12 bg-red-500'>
            <Search />
            <Link href="/signout">
                <button 
                className='absolute right-0 mr-6 flex items-center justify-center h-9 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white border-2 border-transparent hover:border-white' 
                title={session ? `Logged in as ${session.user.name || session.user.email}` : ''}>
                    Log Out
                </button>
            </Link>
        </nav>
    );
}

export default Header;