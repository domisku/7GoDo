import Calendar  from "react-calendar";
import TaskList from "../../../components/TaskList";
import 'react-calendar/dist/Calendar.css';


function Calenda() {
    return (
        <>
            <TaskList />
            <div className='absolute z-50 bottom-0 right-0 rounded-lg'>
                <Calendar className='rounded-lg shadow-2xl p-1 pr-0 grayscale opacity-70 hover:opacity-100' />
            </div>
        </>
    );
}

export default Calenda;