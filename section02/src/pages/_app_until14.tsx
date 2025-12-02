import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect} from "react";

// React의 App 컴포넌트 역할 (모든 페이지의 최상위 컴포넌트)
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test"); // 페이지 이동 (CSR)
    // .replace("/test"); // 뒤로가기 방지하면서 페이지 이동
    // .back(); // 뒤로가기
  };
  useEffect(() => {
    router.prefetch('/test'); // prefetch를 직접 지정하고 싶을때
  }, []);

  return <>
    <header>
      {/*페이지 이동은 CSR 방식*/}
      {/* 아래 라우팅들은 자동 prefetch 되어 미리 로딩된다.
        false 옵션 주면 prefetch 해제 */}
      <Link href={"/"}>index</Link>
      &nbsp;
      <Link href={"/search"} prefetch={false}>search</Link>
      &nbsp;
      <Link href={"/book/1"}>book/1</Link>
      <div>
        <button onClick={onClickButton}>/test 페이지로 이동</button>
      </div>
    </header>
    <Component {...pageProps} />
  </>;
}
