import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header() {
    return (
        <nav className='fixed z-20 top-0 w-full flex justify-center items-center h-12 bg-red-500'>
            <Icon className='rotate-90 relative left-7' icon={faSearch} />
            <input placeholder='Search' className='bg-gray-100 w-3/12 outline-none hover:bg-white focus:bg-white pl-10 pr-3 rounded-lg h-9' type='text'></input>
        </nav>
    );
}

export default Header;