import TaskList from "../../../components/TaskList";
import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";

function List() {
    const router = useRouter();

    return (
        <>
        <Head>
            <title>{router.query.title}</title>
            <meta name='description' content='Create and explore personal lists' />
        </Head>
        <TaskList listId={router.query.listId} listTitle={router.query.title} />
        </>
    );
}

export default List;