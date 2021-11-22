import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faCalendar,
  faExclamationCircle,
  faGlobe,
  faListUl,
  faForward,
  faPlus,
  faChevronRight,
  faChevronLeft,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import listToDatabase from "../../utils/listToDatabase";
import { useRouter } from "next/router";
import SidebarContext from "../../context/sidebar-context";
import deleteList from "../../utils/deleteList";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Sidebar() {
  const [newList, setNewList] = useState("");

  const ctx = useContext(SidebarContext);

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const { data } = useSWR(
    session ? `/api/${session.user.name || session.user.email}/lists` : null,
    fetcher
  );

  async function formSubmitHandler(event) {
    event.preventDefault();

    const listData = {
      user: session.user.name || session.user.email,
      list: newList,
    };

    setNewList("");

    mutate(
      `/api/${session.user.name || session.user.email}/lists`,
      [listData, ...data],
      false
    );

    const status = await listToDatabase(listData);
    if (status !== 201) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}/lists`);
  }

  async function listDeletedHandler(event) {
    event.stopPropagation();

    const filteredData = data.filter((list) => list._id !== event.target.id);

    mutate(
      `/api/${session.user.name || session.user.email}/lists`,
      [...filteredData],
      false
    );

    const status = await deleteList({ id: event.target.id });
    if (status !== 200) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}/lists`);

    if (router.query.listId) router.replace("/app/today");
  }

  return (
    <nav
      className={`fixed z-30 top-0 left-0 h-screen transition-all duration-300 ${
        ctx.sidebarExpanded ? "w-72" : "w-20"
      } bg-gray-50 overflow-y-scroll overflow-x-hidden`}
    >
      <Link href="/">
        <h1
          className={`${
            !ctx.sidebarExpanded ? "invisible" : ""
          } w-32 text-3xl text-red-500 cursor-pointer mb-10 font-medium pt-6 pl-6 whitespace-nowrap`}
        >
          7GoDo
          <Icon
            className={`${!ctx.sidebarExpanded ? "invisible" : "ml-1.5"}`}
            icon={faForward}
          />
        </h1>
      </Link>
      <button
        onClick={ctx.toggleSidebar}
        className={`absolute top-5 transition-all duration-100 ${
          !ctx.sidebarExpanded ? "w-10/12" : "w-12"
        } h-12 right-1.5 flex justify-center items-center text-xl text-right hover:bg-white rounded-full text-gray-500 bg-gray-100 shadow-lg`}
      >
        <Icon
          icon={ctx.sidebarExpanded ? faChevronLeft : faChevronRight}
          fixedWidth
        />
      </button>
      <ul className="mb-10 text-lg cursor-pointer whitespace-nowrap">
        <Link href="/app/today">
          <li
            className={`py-1.5 pl-6 hover:bg-white ${
              router.pathname === "/app/today"
                ? "bg-gray-400 hover:bg-gray-400 text-white"
                : ""
            }`}
          >
            <Icon className="mr-3" icon={faBullseye} fixedWidth />
            {ctx.sidebarExpanded && "Today"}
          </li>
        </Link>
        <Link href="/app/important">
          <li
            className={`py-1.5 pl-6 hover:bg-white ${
              router.pathname === "/app/important"
                ? "bg-gray-400 hover:bg-gray-400 text-white"
                : ""
            }`}
          >
            <Icon className="mr-3" icon={faExclamationCircle} fixedWidth />
            {ctx.sidebarExpanded && "Important"}
          </li>
        </Link>
        <Link href="/app/calendar">
          <li
            className={`py-1.5 pl-6 hover:bg-white ${
              router.pathname === "/app/calendar"
                ? "bg-gray-400 hover:bg-gray-400 text-white"
                : ""
            }`}
          >
            <Icon className="mr-3" icon={faCalendar} fixedWidth />
            {ctx.sidebarExpanded && "Calendar"}
          </li>
        </Link>
        <Link href="/app/all">
          <li
            className={`py-1.5 pl-6 hover:bg-white ${
              router.pathname === "/app/all"
                ? "bg-gray-400 hover:bg-gray-400 text-white"
                : ""
            }`}
          >
            <Icon className="mr-3" icon={faGlobe} fixedWidth />
            {ctx.sidebarExpanded && "All tasks"}
          </li>
        </Link>
      </ul>
      <ul className="text-lg cursor-pointer whitespace-nowrap">
        {data &&
          data.map((list) => {
            return (
              <Link
                href={
                  list._id ? `/app/list/${list._id}?title=${list.list}` : "#"
                }
              >
                <li
                  id={list._id}
                  className={`group h-10 flex items-center py-1.5 pl-6 hover:bg-white ${
                    router.query.listId === list._id && list._id
                      ? "bg-gray-400 hover:bg-gray-400 text-white"
                      : ""
                  }`}
                >
                  <Icon className="mr-3" icon={faListUl} fixedWidth />
                  {ctx.sidebarExpanded && (
                    <span className="pointer-events-none truncate w-8/12">
                      {list.list}
                    </span>
                  )}
                  {ctx.sidebarExpanded && (
                    <button
                      id={list._id}
                      onClick={listDeletedHandler}
                      className="invisible group-hover:visible transition duration-300 hover:text-red-500 text-sm ml-auto mr-3"
                    >
                      <Icon
                        className="pointer-events-none"
                        icon={faTrashAlt}
                        fixedWidth
                      />
                    </button>
                  )}
                </li>
              </Link>
            );
          })}
      </ul>
      <form
        onSubmit={formSubmitHandler}
        onClick={() => (!ctx.sidebarExpanded ? ctx.toggleSidebar() : null)}
        className="py-1.5 h-10 pl-6 pb-6 w-full text-lg hover:bg-white whitespace-nowrap"
      >
        <button type="submit" disabled={!newList}>
          <Icon className="mr-3 text-red-500" icon={faPlus} fixedWidth />
        </button>
        <input
          value={newList}
          onChange={(event) => setNewList(event.target.value)}
          className="text-red-500 bg-transparent outline-none placeholder-red-500"
          placeholder={ctx.sidebarExpanded ? "New list" : ""}
        ></input>
      </form>
    </nav>
  );
}

export default Sidebar;
