import Main from "../../../components/layout/Main";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import taskToDatabase from "../../../utils/taskToDatabase";
import updateTask from "../../../utils/updateTask";
import useSWR, { useSWRConfig } from "swr";


const fetcher = (url) => fetch(url).then(res => res.json());

function Today() {
    const { mutate } = useSWRConfig();
    const { data: session, status } = useSession();
    const { data, error } = useSWR(session ? `/api/${session.user.name || session.user.email}`: null, fetcher);
    
    const [click, setClick] = useState(false);
    const [input, setInput] = useState('');

    console.log(data);


    async function formSubmitHandler(event) {
        event.preventDefault();

        const date = new Date();
        const dateYMD = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        const taskData = 
        {
            user: session.user.name || session.user.email,
            task: input,
            date: dateYMD,
            status: 'ongoing'
        };

        setInput('');

        mutate(`/api/${session.user.name || session.user.email}`, [taskData, ...data], false);

        await taskToDatabase(taskData);

        mutate(`/api/${session.user.name || session.user.email}`);
    }

    function taskCompletedHandler(event) {
        updateTask({ id: event.target.id });

        const filteredData = data.filter((task) => task._id === event.target.id);
        //to be completed
    }

    return (
        <Main>
            <h2 className='text-xl font-medium mb-4'>Today</h2>
            <div className='custom-gradient'>
                <form className='h-12 pl-4 py-2.5 text-lg text-red-500 hover:bg-red-50' onSubmit={formSubmitHandler}>
                    <button type='submit' disabled={!input}><Icon className='mr-3' icon={faPlus} fixedWidth ></Icon></button>
                    <input className='w-11/12 outline-none bg-transparent placeholder-red-500' placeholder='Add a new task' value={input} onChange={(event) => setInput(event.target.value)}></input>
                </form>
                {data && data.map((task) => {return task.status === 'ongoing' ? <div key={task._id} className='h-12 pl-4 py-2.5 text-lg cursor-pointer hover:bg-red-50'><Icon id={task._id} onClick={taskCompletedHandler} className='mr-3' icon={faCircle} fixedWidth />{task.task}</div> : null;
                })}
                <div className='h-12 pl-4 py-2.5 text-lg hover:bg-red-50' onClick={() => setClick(!click)}>
                    {!click ? <Icon className='mr-3' icon={faCircle} fixedWidth /> : <Icon className='mr-3' icon={faCheckCircle} fixedWidth /> }
                    Palaistyti zole
                </div>
                <div className='pl-4 py-2.5 text-lg'>Palaistyti zole</div>
            </div> 
            <h2 className='text-xl font-medium mb-4 mt-4'>Completed</h2>
            <div className='custom-gradient'>
                {data && data.map((task) => {return task.status === 'completed' ? 
                    <div key={task._id} className='h-12 pl-4 py-2.5 text-lg cursor-pointer hover:bg-red-50'><Icon id={task._id} onClick={taskCompletedHandler} className='mr-3' icon={faCircle} fixedWidth />{task.task}</div> : null;
                })}
            </div>
        </Main>
    );
}

export default Today;