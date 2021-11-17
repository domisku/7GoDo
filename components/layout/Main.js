import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskDetails from "../UI/TaskDetails";
import Loading from "../UI/Loading";
import { useContext } from "react";
import SidebarContext from "../../context/sidebar-context";

function Main(props) {
  const ctx = useContext(SidebarContext);

  return (
    <>
      {!props.dataDidLoad && <Loading />}
      <Header />
      <Sidebar />
      <main className={`transition-all ease-in-out duration-320 overflow-hidden z-10 ${props.taskData ? 'w-custom' : 'w-full'} absolute left-0 pl-6 pt-16 pb-28 h-full`}>
        <div className={`h-screen transition-all duration-300 ${ctx.sidebarExpanded ? 'pl-72' : 'pl-20'} ${props.taskData && ctx.sidebarExpanded ? 'hidden lg:block' : props.taskData || ctx.sidebarExpanded ? 'hidden sm:block' : ''}`}>{props.children}</div>
      </main>
      <TaskDetails
        taskData={props.taskData}
        clearTaskData={props.clearTaskData}
        taskCompletedHandler={props.taskCompletedHandler}
        taskDeletedHandler={props.taskDeletedHandler}
        markAsImportantHandler={props.markAsImportantHandler}
        changeTaskNameHandler={props.changeTaskNameHandler}
        changeNotesHandler={props.changeNotesHandler}
      />
    </>
  );
}

export default Main;
