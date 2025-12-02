import BookItem from "@/components/book-item";
import {BookData} from "@/types";

export default async function Page({
   searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const {q} = await searchParams;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
        { cache: "force-cache" } // 페이지는 동적이라도 검색 결과는 캐싱해서 조금이라도 빠르게 가능
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다..</div>;
    }
    const books: BookData [] = await response.json();

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}