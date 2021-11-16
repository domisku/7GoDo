import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faBullseye,
  faCalendar,
  faExclamationCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function TaskDetails(props) {
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");

  function blurHandler(event) {
    setTaskName("");
    props.changeTaskNameHandler(event);
  }

  function notesBlurHandler(event) {
    setNotes("");
    props.changeNotesHandler(event);
  }

  return (
    <div className={`animate-slide fixed z-20 right-0 top-12 h-full bg-gray-200 ${!props.taskData ? 'hidden' : ''}`}>
      <div className="p-6 text-lg">
        <input
          value={taskName}
          id={props.taskData._id}
          onFocus={() => setTaskName(props.taskData.task)}
          onBlur={blurHandler}
          onChange={(event) => setTaskName(event.target.value)}
          className="text-xl font-medium mb-4 outline-none bg-transparent h-10 rounded-lg placeholder-black hover:bg-gray-100"
          placeholder={props.taskData.task}
        ></input>
        <div
          className="bg-gray-100 h-14 mb-2 flex items-center pl-4 cursor-pointer rounded-lg hover:bg-gray-50"
          id={props.taskData._id}
          onClick={(event) => props.taskCompletedHandler(event)}
        >
          <Icon className="mr-3 pointer-events-none" icon={faCheckCircle} fixedWidth />
          {props.taskData.status === "ongoing" ? 'Mark as completed' : 'Restore task'}
        </div>
        <div
          className="bg-gray-100 h-14 mb-2 flex items-center pl-4 cursor-pointer rounded-lg hover:bg-gray-50"
          id={props.taskData._id}
          onClick={(event) => props.markAsImportantHandler(event)}
        >
          <Icon className="mr-3 pointer-events-none" icon={faExclamationCircle} fixedWidth />
          {props.taskData.important === 'false' ? 'Mark as important' : 'Unmark'}
        </div>
        <div className="bg-gray-100 h-14 mb-2 flex items-center pl-4 rounded-lg">
          <Icon className="mr-3 pointer-events-none" icon={faCalendar} fixedWidth />
          {props.taskData.date}
        </div>
        <div
          className="bg-gray-100 h-14 mb-2 flex items-center pl-4 cursor-pointer rounded-lg hover:bg-gray-50"
          id={props.taskData._id}
          onClick={(event) => props.taskDeletedHandler(event.target.id)}
        >
          <Icon className="mr-3 pointer-events-none" icon={faTrashAlt} fixedWidth />
          Delete task
        </div>
        <textarea
          className={`bg-gray-100 h-28 mb-2 flex items-center pl-4 pt-2 pr-4 max-h-48 w-full rounded-lg outline-none hover:bg-gray-50 focus:bg-gray-50 ${props.taskData.notes ? 'placeholder-black' : ''}`}
          value={notes}
          id={props.taskData._id}
          onFocus={() => setNotes(props.taskData.notes)}
          onBlur={notesBlurHandler}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={props.taskData.notes || "Notes"}
        ></textarea>
      </div>
    </div>
  );
}

export default TaskDetails;
