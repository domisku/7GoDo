import Tasks from "../../../components/Tasks/Tasks";
import Head from "next/dist/shared/lib/head";

function Important() {
  return (
    <>
      <Head>
        <title>Important</title>
        <meta
          name="description"
          content="View and add tasks that are urgent or important to you"
        />
      </Head>
      <Tasks filter={"important"} />
    </>
  );
}

export default Important;

Important.requireAuth = true;
