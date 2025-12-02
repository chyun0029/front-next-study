import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import {BookData} from "@/types";

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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        // {cache: "no-store"} // default 값임 (Ver 15부터). 현재 옵션은 동적 페이지로 동작
        {cache: "force-cache"} // 정적 페이지처럼 동작하도록 변경 (전체 책 조회는 고정)
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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        // {cache: "force-cache"}
        {next: {revalidate: 3}} // revalidate 옵션으로 동적 페이지로 동작하지는 않음.
        // 그대로 둬서 정적 페이지처럼 동작하게
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

export default function Home() {

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {/*{books.map((book) => (*/}
                {/*    <BookItem key={book.id} {...book} />*/}
                {/*))}*/}
                <RecoBooks />
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {/*{allBooks.map((book) => (*/}
                {/*    <BookItem key={book.id} {...book} />*/}
                {/*))}*/}
                <AllBooks />
            </section>
        </div>
    );
}
