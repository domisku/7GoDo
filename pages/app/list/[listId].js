import Tasks from "../../../components/Tasks/Tasks";
import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";

function List() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.title}</title>
        <meta name="description" content="Create and explore personal lists" />
      </Head>
      <Tasks listId={router.query.listId} listTitle={router.query.title} />
    </>
  );
}

export default List;

List.requireAuth = true;
