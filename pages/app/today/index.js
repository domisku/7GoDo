import Tasks from "../../../components/Tasks/Tasks";
import Head from "next/dist/shared/lib/head";

function Today() {
  return (
    <>
      <Head>
        <title>Today</title>
        <meta name="description" content="Plan your day" />
      </Head>
      <Tasks filter={"today"} />
    </>
  );
}

export default Today;

Today.requireAuth = true;
