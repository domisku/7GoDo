import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskDetails from "../UI/TaskDetails";

function Main(props) {
  return (
    <>
      <Header />
      <Sidebar />
      <main className={`overflow-hidden z-10 ${props.taskData ? 'w-8/12' : 'w-10/12'} absolute left-0 pl-6 pt-16 pb-11 ml-72 h-full`}>
        {props.children}
      </main>
      <TaskDetails
        taskData={props.taskData}
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
