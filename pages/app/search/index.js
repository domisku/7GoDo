import Tasks from "../../../components/Tasks/Tasks";
import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";

function Search() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Search</title>
        <meta
          name="description"
          content="Search for tasks that you have added"
        />
      </Head>
      <Tasks query={router.query.query} />
    </>
  );
}

export default Search;

Search.requireAuth = true;
