import Head from 'next/head'
import ContentHome from '../components/home/ContentHome';
import Footer from '../components/layout/Footer';
import HeaderHome from '../components/layout/HeaderHome';

export default function Home() {
  return (
    <>
      <HeaderHome></HeaderHome>
      <ContentHome></ContentHome>
      <Footer></Footer>
    </>
  );
}
