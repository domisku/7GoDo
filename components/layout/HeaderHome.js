import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

function HeaderHome() {
  return (
    <nav className="flex justify-around top-0 items-center h-20 fixed w-full bg-white">
      <h1 className="text-4xl text-red-500 cursor-pointer font-medium transition transform hover:translate-x-3">
        GoDo <Icon icon={faForward} />
      </h1>
      <ul className="flex h-20">
        <li className="flex items-center h-full px-6 text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">Log In</li>
        <li className="flex items-center h-full px-6 text-xl cursor-pointer border-b-2 border-transparent hover:border-red-500 hover:bg-red-50">Register</li>
      </ul>
    </nav>
  );
}

export default HeaderHome;
