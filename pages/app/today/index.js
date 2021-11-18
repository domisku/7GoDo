import TaskList from "../../../components/TaskList";
import Head from "next/dist/shared/lib/head";

function Today() {
    return (
        <>
        <Head>
            <title>Today</title>
            <meta name='description' content='Plan your day' />
        </Head>
        <TaskList filter={'today'} />
        </>
    );
}

export default Today;
