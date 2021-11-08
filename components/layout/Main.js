import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskDetails from "../UI/TaskDetails";

function Main(props) {
    return (
        <>
            <Header />
            <Sidebar />
            <main className='overflow-hidden z-10 w-8/12 absolute left-0 pl-6 pt-16 pb-11 ml-72 h-full'>{props.children}</main>
            <TaskDetails />
        </>
    );
}

export default Main;