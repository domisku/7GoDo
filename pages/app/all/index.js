import Tasks from "../../../components/Tasks/Tasks";
import Head from "next/dist/shared/lib/head";

function All() {
  return (
    <>
      <Head>
        <title>All Tasks</title>
        <meta name="description" content="View all of your tasks" />
      </Head>
      <Tasks filter={"all"} />
    </>
  );
}

export default All;

All.requireAuth = true;
