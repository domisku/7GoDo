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
import router from "next/router";
import { v4 as uuidv4 } from "uuid";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Tasks(props) {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const { data } = useSWR(
    session ? `/api/${session.user.name || session.user.email}` : null,
    fetcher
  );

  const [input, setInput] = useState("");
  const [taskData, setTaskData] = useState("");

  let audio = new Audio("/ping.mp3");

  async function formSubmitHandler(event) {
    event.preventDefault();

    const taskData = {
      _id: createId(),
      user: session.user.name || session.user.email,
      task: input,
      date: props.date || formatTodaysDate(),
      status: "ongoing",
      important: props.filter === "important" ? "true" : "false",
      listId: props.listId || null,
    };

    setInput("");

    mutate(
      `/api/${session.user.name || session.user.email}`,
      [taskData, ...data],
      false
    );

    const status = await taskToDatabase(taskData);
    if (status !== 201) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  function createId() {
    return uuidv4();
  }

  function formatTodaysDate() {
    const date = new Date();
    const dateYMD = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    return dateYMD;
  }

  async function taskCompletedHandler(event) {
    let value;

    const updatedData = data.map((task) => {
      if (task._id === event.target.id && task.status === "ongoing") {
        task.status = "completed";
        value = "completed";
      } else if (task._id === event.target.id && task.status === "completed") {
        task.status = "ongoing";
        value = "ongoing";
      }
      return task;
    });

    if (value === "completed") {
      audio.play();
    }

    mutate(
      `/api/${session.user.name || session.user.email}`,
      [...updatedData, {}],
      false
    );

    setTaskData(...updatedData.filter((task) => task._id === event.target.id));

    const response = await updateTask({
      id: event.target.id,
      update: "status",
      value,
    });
    if (response.status !== 200) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  function taskClickHandler(event) {
    const taskDetails = data.filter((task) => task._id === event.target.id);
    setTaskData(...taskDetails);
  }

  async function taskDeletedHandler(id) {
    const filteredData = data.filter((task) => task._id !== id);

    mutate(
      `/api/${session.user.name || session.user.email}`,
      [...filteredData],
      false
    );

    setTaskData("");

    const status = await deleteTask({ id });
    if (status !== 200) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  async function markAsImportantHandler(event) {
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

    const response = await updateTask({
      id: event.target.id,
      update: "important",
      value,
    });
    if (response.status !== 200) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  async function changeTaskNameHandler(event) {
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

    setTaskData(...updatedData.filter((task) => task._id === event.target.id));

    const response = await updateTask({
      id: event.target.id,
      update: "task",
      task: event.target.value,
    });
    if (response.status !== 200) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  async function changeNotesHandler(event) {
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

    setTaskData(...updatedData.filter((task) => task._id === event.target.id));

    const response = await updateTask({
      id: event.target.id,
      update: "notes",
      notes: event.target.value,
    });
    if (response.status !== 200) router.push("/error");

    mutate(`/api/${session.user.name || session.user.email}`);
  }

  function clearTaskData() {
    setTaskData("");
  }

  let filteredDataNotEmpty = data
    ? data.filter(
        (task) =>
          task.status === "completed" &&
          (props.filter === "important"
            ? task.important === "true"
            : props.filter === "today"
            ? task.date === formatTodaysDate()
            : true) &&
          (props.listId
            ? task.listId === props.listId
            : task.listId === null) &&
          (props.date ? props.date === task.date : true) &&
          (props.query
            ? task.task.toLowerCase().includes(props.query.toLowerCase())
            : true)
      )[0]
    : null;

  return (
    <Main
      dataDidLoad={data}
      taskData={taskData}
      clearTaskData={clearTaskData}
      taskCompletedHandler={taskCompletedHandler}
      taskDeletedHandler={taskDeletedHandler}
      markAsImportantHandler={markAsImportantHandler}
      changeTaskNameHandler={changeTaskNameHandler}
      changeNotesHandler={changeNotesHandler}
    >
      <h2 className="w-11/12 break-words text-xl font-medium mb-4">
        {props.filter === "today"
          ? "Today"
          : props.filter === "important"
          ? "Important"
          : props.filter === "all"
          ? "All tasks"
          : props.listTitle
          ? props.listTitle
          : props.date
          ? [props.date, props.weekday].join(", ")
          : props.query
          ? 'Search results for: "' + props.query + '"'
          : "Tasks"}
      </h2>
      {!props.query && (
        <form
          className="relative right-2 h-14 flex items-center mr-10 pr-5 pl-4 py-2.5 text-lg bg-white shadow-lg text-red-500 mb-4 rounded-lg"
          onSubmit={formSubmitHandler}
        >
          <button type="submit" disabled={!input}>
            <Icon className="mr-3" icon={faPlus} fixedWidth></Icon>
          </button>
          <input
            className="w-9/12 outline-none bg-transparent placeholder-red-500"
            placeholder="New task"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></input>
        </form>
      )}
      <div className={`overflow-y-scroll h-custom pr-6`}>
        <div>
          {data &&
            data
              .filter(
                (task) =>
                  task.status === "ongoing" &&
                  (props.filter === "important"
                    ? task.important === "true"
                    : props.filter === "today"
                    ? task.date === formatTodaysDate()
                    : true) &&
                  (props.listId
                    ? task.listId === props.listId
                    : task.listId === null) &&
                  (props.date ? props.date === task.date : true) &&
                  (props.query
                    ? task.task
                        .toLowerCase()
                        .includes(props.query.toLowerCase())
                    : true)
              )
              .map((task, index) => {
                return (
                  <>
                    <div
                      key={task._id}
                      id={task._id}
                      onClick={taskClickHandler}
                      className={`w-full ${
                        taskData._id === task._id ? "h-full" : "h-12"
                      } pl-4 py-2.5 text-lg cursor-pointer flex items-center rounded-lg ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                      } ${
                        taskData._id === task._id && task._id
                          ? "hover:bg-gray-400 bg-gray-400 text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <Icon
                        id={task._id}
                        onClick={taskCompletedHandler}
                        className="mr-3"
                        icon={faCircle}
                        fixedWidth
                      />
                      <span
                        className={`${
                          taskData._id === task._id ? "" : "truncate"
                        } w-11/12 break-words pointer-events-none`}
                      >
                        {task.task}
                      </span>
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
        <h2 className="text-xl font-medium mb-4 mt-4">
          {filteredDataNotEmpty && "Completed"}
        </h2>
        <div className="mb-6">
          {data &&
            data
              .filter(
                (task) =>
                  task.status === "completed" &&
                  (props.filter === "important"
                    ? task.important === "true"
                    : props.filter === "today"
                    ? task.date === formatTodaysDate()
                    : true) &&
                  (props.listId
                    ? task.listId === props.listId
                    : task.listId === null) &&
                  (props.date ? props.date === task.date : true) &&
                  (props.query
                    ? task.task
                        .toLowerCase()
                        .includes(props.query.toLowerCase())
                    : true)
              )
              .map((task, index) => {
                return (
                  <div
                    key={task._id}
                    id={task._id}
                    onClick={taskClickHandler}
                    className={`line-through w-full ${
                      taskData._id === task._id ? "h-full" : "h-12"
                    } pl-4 py-2.5 text-lg cursor-pointer flex items-center rounded-lg ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                    } ${
                      taskData._id === task._id
                        ? "hover:bg-gray-400 bg-gray-400 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="mr-3" icon={faCheckCircle} fixedWidth />
                    <span
                      className={`${
                        taskData._id === task._id ? "" : "truncate"
                      } w-11/12 break-words pointer-events-none`}
                    >
                      {task.task}
                    </span>
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

export default Tasks;
