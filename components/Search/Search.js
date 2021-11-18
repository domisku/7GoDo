import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Search() {
  const router = useRouter();

  const [query, setQuery] = useState(router.query.query || "");

  function queryChangeHandler(event) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    if (query) router.push(`/app/search?query=${query}`);
  }, [query]);

  return (
    <>
      <span>
        <Icon className="rotate-90 relative left-7" icon={faSearch} />
      </span>
      <input
        autoFocus={router.query.query}
        value={query}
        onChange={queryChangeHandler}
        placeholder="Search"
        className="w-4/12 sm:5/12 md:w-3/12 mr-3 sm:mr-0 bg-gray-100 outline-none hover:bg-white focus:bg-white pl-10 pr-3 rounded-lg h-9"
        type="text"
      ></input>
    </>
  );
}

export default Search;
