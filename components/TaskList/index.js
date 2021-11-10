import Main from "../layout/Main";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faPlus,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import taskToDatabase from "../../utils/taskToDatabase";
import updateTask from "../../utils/updateTask";
import deleteTask from "../../utils/deleteTask";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function TaskList(props) {
  const { mutate } = useSWRConfig();
  const { data: session, status } = useSession();
  const { data, error } = useSWR(
    session ? `/api/${session.user.name || session.user.email}` : null,
    fetcher
  );

  const [input, setInput] = useState("");
  const [taskData, setTaskData] = useState("");

  async function formSubmitHandler(event) {
    event.preventDefault();

    const taskData = {
      user: session.user.name || session.user.email,
      task: input,
      date: formatTodaysDate(),
      status: "ongoing",
      important: "false",
      listId: props.listId || null,
    };

    setInput("");

    mutate(
      `/api/${session.user.name || session.user.email}`,
      [taskData, ...data],
      false
    );

    await taskToDatabase(taskData);

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  function formatTodaysDate() {
      const date = new Date();
      const dateYMD = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      return dateYMD;
  }

  async function taskCompletedHandler(event) {
    if (event.target.id) {
      let value;

      const updatedData = data.map((task) => {
        if (task._id === event.target.id && task.status === "ongoing") {
          task.status = "completed";
          value = "completed";
        } else if (
          task._id === event.target.id &&
          task.status === "completed"
        ) {
          task.status = "ongoing";
          value = "ongoing";
        }
        return task;
      });

      if (value === "completed") {
        let audio = new Audio("/ping.mp3");
        audio.play();
      }

      mutate(
        `/api/${session.user.name || session.user.email}`,
        [...updatedData, {}],
        false
      );

      setTaskData(
        ...updatedData.filter((task) => task._id === event.target.id)
      );

      await updateTask({ id: event.target.id, update: "status", value });

      mutate(`/api/${session.user.name || session.user.email}`);
    }
  }

  function taskClickHandler(event) {
    if (event.target.id) {
      const taskDetails = data.filter((task) => task._id === event.target.id);
      setTaskData(...taskDetails);
    }
  }

  async function taskDeletedHandler(id) {
    const filteredData = data.filter((task) => task._id !== id);

    mutate(
      `/api/${session.user.name || session.user.email}`,
      [...filteredData],
      false
    );

    setTaskData("");

    await deleteTask({ id });

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  async function markAsImportantHandler(event) {
    if (event.target.id) {
      let value;

      const updatedData = data.map((task) => {
        if (task._id === event.target.id && task.important === "false") {
          task.important = "true";
          value = "true";
        } else if (task._id === event.target.id && task.important === "true") {
          task.important = "false";
          value = "false";
        }
        return task;
      });

      mutate(
        `/api/${session.user.name || session.user.email}`,
        [...updatedData, {}],
        false
      );

      await updateTask({ id: event.target.id, update: "important", value });

      mutate(`/api/${session.user.name || session.user.email}`);
    }
  }

  async function changeTaskNameHandler(event) {
    if (event.target.id) {
      const updatedData = data.map((task) => {
        if (task._id === event.target.id) {
          task.task = event.target.value;
        }
        return task;
      });

      mutate(
        `/api/${session.user.name || session.user.email}`,
        [...updatedData, {}],
        false
      );

      setTaskData(
        ...updatedData.filter((task) => task._id === event.target.id)
      );

      await updateTask({
        id: event.target.id,
        update: "task",
        task: event.target.value,
      });

      mutate(`/api/${session.user.name || session.user.email}`);
    }
  }

  async function changeNotesHandler(event) {
    if (event.target.id) {
      const updatedData = data.map((task) => {
        if (task._id === event.target.id) {
          task.notes = event.target.value;
        }
        return task;
      });

      mutate(
        `/api/${session.user.name || session.user.email}`,
        [...updatedData, {}],
        false
      );

      setTaskData(
        ...updatedData.filter((task) => task._id === event.target.id)
      );

      await updateTask({
        id: event.target.id,
        update: "notes",
        notes: event.target.value,
      });

      mutate(`/api/${session.user.name || session.user.email}`);
    }
  }

  return (
    <Main
      taskData={taskData}
      taskCompletedHandler={taskCompletedHandler}
      taskDeletedHandler={taskDeletedHandler}
      markAsImportantHandler={markAsImportantHandler}
      changeTaskNameHandler={changeTaskNameHandler}
      changeNotesHandler={changeNotesHandler}
    >
      <h2 className="text-xl font-medium mb-4">{props.filter === 'today' ? "Today" : props.filter === 'important' ? "Important" : props.filter === 'all' ? 'All tasks' : props.listTitle || 'Tasks'}</h2>
      <form
        className="h-12 pl-4 mr-10 py-2.5 text-lg text-red-500 border-b-2 border-red-500 rounded-lg"
        onSubmit={formSubmitHandler}
      >
        <button type="submit" disabled={!input}>
          <Icon className="mr-3" icon={faPlus} fixedWidth></Icon>
        </button>
        <input
          className="w-11/12 outline-none bg-transparent placeholder-red-500"
          placeholder="Add a new task"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
      </form>
      <div className={`overflow-y-scroll h-full pr-6`}>
        <div className="custom-gradient">
          {data &&
            data.filter((task) => task.status === "ongoing" && (props.filter === 'important' ? task.important === 'true' : props.filter === 'today' ? task.date === formatTodaysDate() : true) && (props.listId ? task.listId === props.listId : task.listId === null)
            ).map((task) => {
              return (
                <>
                  <div
                    key={task._id}
                    id={task._id}
                    onClick={taskClickHandler}
                    className={`h-12 pl-4 py-2.5 text-lg cursor-pointer flex items-center hover:bg-gray-200 ${
                      taskData._id === task._id && task._id
                        ? "hover:bg-gray-400 bg-gray-400 text-white"
                        : ""
                    }`}
                  >
                    <Icon
                      id={task._id}
                      onClick={taskCompletedHandler}
                      className="mr-3"
                      icon={faCircle}
                      fixedWidth
                    />
                    {task.task}
                    {task.important === "true" ? (
                      <Icon
                        className="ml-auto mr-4"
                        icon={faExclamationCircle}
                        fixedWidth
                      />
                    ) : null}
                  </div>
                </>
              );
            })}
        </div>
        <h2 className="text-xl font-medium mb-4 mt-4">Completed</h2>
        <div className="custom-gradient">
          {data &&
            data.filter((task) => task.status === "completed" && (props.filter === 'important' ? task.important === 'true' : props.filter === 'today' ? task.date === formatTodaysDate() : true) && (props.listId ? task.listId === props.listId : task.listId === null)).map((task) => {
              return (
                <div
                  key={task._id}
                  id={task._id}
                  onClick={taskClickHandler}
                  className={`line-through h-12 pl-4 py-2.5 text-lg cursor-pointer flex items-center hover:bg-gray-200 ${
                    taskData._id === task._id
                      ? "hover:bg-gray-400 bg-gray-400 text-white"
                      : ""
                  }`}
                >
                  <Icon className="mr-3" icon={faCheckCircle} fixedWidth />
                  {task.task}
                  {task.important === "true" ? (
                    <Icon
                      className="ml-auto mr-4"
                      icon={faExclamationCircle}
                      fixedWidth
                    />
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </Main>
  );
}

export default TaskList;
