import { Html, Head, Main, NextScript } from "next/document";

// 모든 페이지에 공통 적용해야하는 html 코드 설정하는 컴포넌트
// 기존의 index.html 역할
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
