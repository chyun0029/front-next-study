import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// export const dynamic = "force-static"; // 이렇게 만들어버리면 검색이 안됨. 쿼리스트링 빈값 설정되기 때문
/**
 * 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
 * (페이지 내부 동적 함수나 데이터 캐싱 유무 상관없이)
 * 1. auto : 기본값, 아무것도 강제하지 않음
 * 2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
 * 3. force-static: 페이지를 강제로 Static 페이지로 설정
 * 4. error: 페이지를 강제로 Static 페이지 설정 (Static으로 설정하면 안되는 이유 있다면 -> 빌드 오류 발생)
 *              - 현재 페이지를 error로 설정하면 /search with 'dynamic = "error"' couldn't be...
 *                because it used `searchParams.q` 뜨면서 Error 발생
 *
 * 빌드해서 '/' 경로 확인해보면됨
 * auto로 그냥 사용할것
 * 다른 옵션은 디버깅이나 특수한 경우에만 사용 권장
 */

async function AllBooks() {
    await delay(1500); // 1.5초 후 로딩
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        // {cache: "force-cache"} // 5강) 오류 발생시키게 캐시 사용 주석처리
    )
    if(!response.ok) {
        return <div>오류가 발생했습니다..</div>
    }
    const allBooks : BookData[] = await response.json()
    // console.log(allBooks) // IDE 콘솔에서 바로 확인 가능

    return <div>
        {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

async function RecoBooks(){
    await delay(3000); // 3초 후 로딩
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        {next: {revalidate: 3}}
    )
    if(!response.ok) {
        return <div>오류가 발생했습니다..</div>
    }
    const recoBooks : BookData[] = await response.json()
    return <div>
        {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

// 3강에서 현재 페이지에 스트리밍 적용하기 위해 Dynamic 페이지로 변경
export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <Suspense fallback={
                    <>
                        <BookListSkeleton count={3} />
                        {/*<BookItemSkeleton />*/}
                        {/*<BookItemSkeleton />*/}
                        {/*<BookItemSkeleton />*/}
                    </>
                }>
                    <RecoBooks />
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense fallback={
                    <>
                        <BookListSkeleton count={3} />
                    </>
                }>
                    <AllBooks />
                </Suspense>
            </section>
        </div>
    );
}
