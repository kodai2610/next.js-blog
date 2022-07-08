import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import homeStyles from "../styles/Home.module.css"; //defaultエクスポート。名前は自由に設定できる
import { getPostsData } from "../lib/post";

//SSGで取得
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id,title,date,path

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Next.jsの勉強用マイクロブログです</p>
      </section>

      <section>
        <h2>🗒エンジニアのブログ</h2>
        <div className={homeStyles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image
                  src={thumbnail}
                  width="950px"
                  height="400px"
                  alt="サムネ1"
                  className={homeStyles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
