import TaskList from "../../../components/TaskList";
import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";

function Search() {
    const router = useRouter();

    return (
        <>
        <Head>
            <title>Search</title>
            <meta name='description' content='Search for tasks that you have added' />
        </Head>
        <TaskList query={router.query.query} />
        </>
    );
}

export default Search;