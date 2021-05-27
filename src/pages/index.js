import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({posts}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header/>

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner/>
        {/* ProductFeed */}
        <ProductFeed products={posts}/>
      
        
       </main>

     
      
     </div>
  );
}


export async function getServerSideProps(context) {
  const session=await getSession(context);
	const res = await fetch('https://fakestoreapi.com/products');
	const posts = await res.json();
 
	return {
		props: {
			posts,
      session
		}
	};
}