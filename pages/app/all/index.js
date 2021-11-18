import TaskList from "../../../components/TaskList";
import Head from "next/dist/shared/lib/head";

function All() {
    return (
        <>
        <Head>
            <title>All Tasks</title>
            <meta name='description' content='View all of your tasks' />
        </Head>
        <TaskList filter={'all'} />
        </>
    );
}

export default All;