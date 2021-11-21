import Head from "next/head";
import ContentHome from "../components/home/ContentHome";
import Footer from "../components/layout/Footer";
import HeaderHome from "../components/home/HeaderHome";
import { useSession } from "next-auth/react";
import Loading from "../components/UI/Loading";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") return <Loading />;

  return (
    <>
      <Head>
        <title>7GoDo</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Save precious minutes of your time by organizing your day with 7GoDo!"
        />
      </Head>
      <HeaderHome></HeaderHome>
      <ContentHome></ContentHome>
      <Footer></Footer>
    </>
  );
}
