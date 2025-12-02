import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import Head from "next/head";

export const getServerSideProps = async (
    context: GetServerSidePropsContext // SSR
    // context: GetStaticPropsContext // search 페이지는 SSG 불가능.
    // 빌드 타임에 검색어를 모르니 검색 결과를 서버로부터 불러오는 사전렌더링 동작 불가능
    // 해오던 react fetch처럼 브라우저에서 api 호출하는 방법으로 가능
) => {
    const q = context.query.q; // 쿼리 스트링을 SSG에서는 사용 불가능
    const books = await fetchBooks(q as string);

    return {
        props: {
            books,
        }
    };
};

export default function Page({
                                 books
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // const router = useRouter();
    // // console.log(router);
    // // const q = router.query.q;
    // const {q} = router.query; // 쿼리 스트링 사용
    // return <h1>Search {q}</h1>;
    return (
        <div>
            <Head> {/* SEO 설정용 Head */}
                <title>한입북스 - 검색결과</title>
                <meta property="og:image" content="/thumbnail.png" /> {/*content의 경로는 public 폴더 기준*/}
                <meta property="og:title" content="한입북스 - 검색결과" />
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
            </Head>
            {books.map((book) => (
                <BookItem key={book.id}{...book} />
            ))}
        </div>
    );
}

// 페이지별 레이아웃 설정
Page.getLayout = (page:ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}