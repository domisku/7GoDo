import TaskList from "../../../components/TaskList";
import { useRouter } from "next/router";

function Search() {
    const router = useRouter();

    return (
        <TaskList query={router.query.query} />
    );
}

export default Search;