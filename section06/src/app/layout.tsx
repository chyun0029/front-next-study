import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import {BookData} from "@/types";

async function Footer() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: "force-cache" }
        // force-cache로 정적 페이지처럼 동작하도록 -> Full Route Caching
        // 없으면 Footer 컴포넌트 때문에 모든 페이지가 동적 페이지처럼 동작해버림
    );
    // => (without-searchbar) page.tsx의 AllBooks 함수에서도 중복 요청되는 상황
    // 한번만 요청해서 2군데서 공유 사용하게 된다.
    // 로그에는 2번 뜨지만(이슈 상황), 실제로는 1번만 요청됨 (Next.js가 최적화 처리)
    if (!response.ok) {
        return <footer>제작 @winterlood</footer>;
    }
    const books: BookData [] = await response.json();
    const bookCount = books.length;
    return <footer>
        <div>제작 @winterlood</div>
        <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
}

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div className={style.container}>
            <header>
                <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
            {/*<footer>제작 @winterlood</footer>*/}
            <Footer/>
        </div>
        </body>
        </html>
    );
}
