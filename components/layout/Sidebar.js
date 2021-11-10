import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCalendar, faExclamationCircle, faGlobe, faListUl, faForward, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import listToDatabase from "../../utils/listToDatabase";

const fetcher = (url) => fetch(url).then(res => res.json());

function Sidebar() {
    const [newList, setNewList] = useState();

    const { mutate } = useSWRConfig();
    const { data: session, status } = useSession();
    const { data, error } = useSWR(session ? `/api/${session.user.name || session.user.email}/lists`: null, fetcher);

    async function formSubmitHandler(event) {
        event.preventDefault();

        const listData = 
        {
            user: session.user.name || session.user.email,
            list: newList,
        };

        setNewList('');

        mutate(`/api/${session.user.name || session.user.email}/lists`, [listData, ...data], false);

        await listToDatabase(listData);

        mutate(`/api/${session.user.name || session.user.email}/lists`);
    }

    return (
    <nav className='fixed z-30 top-0 left-0 h-screen w-1/6 bg-gray-50 overflow-y-scroll'>
        <Link href='/app'>
          <h1 className="text-3xl text-red-500 cursor-pointer mb-10 font-medium pt-6 pl-6">
            GoDo
            <Icon className="ml-1" icon={faForward} />
          </h1>
        </Link>
        <ul className='mb-10 text-lg cursor-pointer'>
            <Link href='/app/today'><li className='py-1.5 pl-6 hover:bg-white'><Icon className='mr-3' icon={faBullseye} fixedWidth />Today</li></Link>
            <Link href='/app/important'><li className='py-1.5 pl-6 hover:bg-white'><Icon className='mr-3' icon={faExclamationCircle} fixedWidth />Important</li></Link>
            <Link href='/app/calendar'><li className='py-1.5 pl-6 hover:bg-white'><Icon className='mr-3' icon={faCalendar} fixedWidth />Calendar</li></Link>
            <Link href='/app/all'><li className='py-1.5 pl-6 hover:bg-white'><Icon className='mr-3' icon={faGlobe} fixedWidth />All tasks</li></Link>
        </ul>
        <ul className='text-lg cursor-pointer'>
            {data && data.map((list, index) => {
                return <Link href={`/app/list/${list._id}?title=${list.list}`}><li id={list._id} className='py-1.5 pl-6 hover:bg-white'><Icon className='mr-3' icon={faListUl} fixedWidth />{list.list}</li></Link>
            })}
        </ul>
        <form onSubmit={formSubmitHandler} className='py-1.5 h-10 pl-6 pb-6 w-full text-lg hover:bg-white'>
            <button type='submit' disabled={!newList}><Icon className='mr-3 text-red-500' icon={faPlus} fixedWidth /></button>
            <input value={newList} onChange={(event) => setNewList(event.target.value)} className='text-red-500 bg-transparent outline-none placeholder-red-500' placeholder='New list'></input>
        </form>
    </nav>
    );
}

export default Sidebar;