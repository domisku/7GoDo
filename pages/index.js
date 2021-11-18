import Head from "next/head";
import ContentHome from "../components/home/ContentHome";
import Footer from "../components/layout/Footer";
import HeaderHome from "../components/layout/HeaderHome";

export default function Home() {
  return (
    <>
      <Head>
        <title>GoDo</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Save precious minutes of your time by organizing your day with GoDo!"
        />
      </Head>
      <HeaderHome></HeaderHome>
      <ContentHome></ContentHome>
      <Footer></Footer>
    </>
  );
}
