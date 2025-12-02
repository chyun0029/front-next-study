import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import {BookData} from "@/types";

async function AllBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        {cache: "no-store"} // default 값임 (Ver 15부터)
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
