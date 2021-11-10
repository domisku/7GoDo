import TaskList from "../../../components/TaskList";
import { useRouter } from "next/router";

function List() {
    const router = useRouter();

    console.log(router.query)

    return (
        <TaskList listId={router.query.listId} listTitle={router.query.title} />
    );
}

export default List;