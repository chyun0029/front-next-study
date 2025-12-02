// CSS Module : css 클래스명이 자동으로 고유한 값으로 변환되어 전역 css 설정 충돌을 방지
import style from './index.module.css'
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode, useEffect} from "react";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType, InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head"; // SEO 설정용. next/head임 조심

// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
// 서버사이드에서만 실행됨
// export const getServerSideProps = async () => { // SSR
export const getStaticProps = async () => { // SSG
    // window.location; // <- 브라우저에서만 사용 가능
    // console.log('이런 로그 브라우저에서는 확인 못함');
    // console.log('실행 터미널 로그로는 찍힘');

    // 이러면 직렬 요청임
    // const allBooks = await fetchBooks();
    // const recoBooks = await fetchRandomBooks();

    // 병렬 요청
    const [allBooks, recoBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks()
    ]);

    return {
        props: {
            allBooks,
            recoBooks,
        },
        // revalidate: 3, // (ISR 기본) 몇 초 주기로 페이지를 재생성할지 설정
        // 새로고침하면 이제 추천도서 랜덤하게 나옴
        // 없으면 현재 SSG 이기에 새로고침해도 고정 도서 화면
    };
};

// 이녀석도 data를 포함하기에 서버 사이드에서 한번 실행 후
// 브라우저에 js bundle이 로드되고 컴포넌트가 마운트된 클라이언트 사이드에서 또 한번 실행됨
export default function Home({
                                 allBooks, recoBooks
// }: InferGetServerSidePropsType<typeof getServerSideProps>) { // SSR
                             }: InferGetStaticPropsType <typeof getStaticProps>) { // SSG
    // console.log(allBooks); // 2번 실행
    // window.location // 브라우저에서는 O, 서버 사이드에서는 X 에러
    // useEffect(() => { // 이건 브라우저에서만 한번 실행
    //     console.log('1');
    // }, [])
    // InferGetServerSidePropsType : getServerSideProps 함수가 반환하는 props 타입을 추론

    return (
        <>
            <Head> {/* SEO 설정용 Head */}
                <title>도서 목록</title>
                <meta property="og:image" content="/thumbnail.png" /> {/*content의 경로는 public 폴더 기준*/}
                <meta property="og:title" content="한입북스" />
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
            </Head>
            <div className={style.container}>
                <section>
                    <h3>지금 추천하는 도서</h3>
                    {recoBooks.map((book) => (<BookItem key={book.id} {...book}/>))}
                </section>
                <section>
                    <h3>등록된 모든 도서</h3>
                    {allBooks.map((book) => (<BookItem key={book.id} {...book}/>))}
                </section>
            </div>
        </>
)
}
// 총 2번 실행

// 페이지별 레이아웃 설정
Home.getLayout = (page:ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}