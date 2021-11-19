import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";

function HeaderHome() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-around top-0 items-center h-20 fixed w-full bg-white z-20">
      <Link href="/">
        <h1 className="text-3xl sm:text-4xl text-red-500 cursor-pointer pl-2 font-medium transition transform hover:translate-x-3">
          7GoDo <Icon icon={faForward} />
        </h1>
      </Link>
      {!session && (
        <ul className="flex h-20">
          <Link href="/signin">
            <li className="flex items-center h-full px-2 sm:px-6 sm:text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Log In
            </li>
          </Link>
        </ul>
      )}
      {session && (
        <ul className="flex h-20">
          <Link href="/app/today">
            <li className="flex items-center h-full px-2 sm:px-6 sm:text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Open App
            </li>
          </Link>
          <Link href="/signout">
            <li className="flex items-center h-full px-2 sm:px-6 sm:text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Log Out
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default HeaderHome;
