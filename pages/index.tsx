import type { NextPage } from "next";
import Layout from "@components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

// TODO:: Recent에는 쓴지 얼마 안된 포스트 5개 정도 POP은 조회수 많은 순으로
const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout title={"Jung's Blog"} url={""}>
      <div className="">
        <h1>Recent Posts</h1>
      </div>
      <div className="">
        <h1>Popular Posts</h1>
      </div>
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    </Layout>
  );
};

export default Home;
