import TaskList from "../../../components/TaskList";
import Head from "next/dist/shared/lib/head";

function Important() {
    return (
        <>
            <Head>
                <title>Important</title>
                <meta name='description' content='View and add tasks that are urgent or important to you' />
            </Head>
            <TaskList filter={"important"} />
        </>
    );
}

export default Important;