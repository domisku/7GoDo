import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";

function HeaderHome() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="flex justify-around top-0 items-center h-20 fixed w-full bg-white">
      <Link href="/">
        <h1 className="text-4xl text-red-500 cursor-pointer font-medium transition transform hover:translate-x-3">
          GoDo <Icon icon={faForward} />
        </h1>
      </Link>
      {!session && (
        <ul className="flex h-20">
          <Link href="/signin">
            <li className="flex items-center h-full px-6 text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Log In
            </li>
          </Link>
          <Link href="/signin">
            <li className="flex items-center h-full px-6 text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Register
            </li>
          </Link>
        </ul>
      )}
      {session && (
        <ul className="flex h-20">
          <Link href="/app">
            <li className="flex items-center h-full px-6 text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Open App
            </li>
          </Link>
          <Link href="signout">
            <li className="flex items-center h-full px-6 text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">
              Log Out
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default HeaderHome;
