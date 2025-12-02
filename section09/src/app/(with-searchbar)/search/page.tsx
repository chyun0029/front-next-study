import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import {Metadata} from "next";

async function SearchResult ({q}:{q: string}) {
    await delay(500);
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
        { cache: "force-cache" } // 페이지는 동적이라도 검색 결과는 캐싱해서 조금이라도 빠르게 가능
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다..</div>;
    }

    const books: BookData [] = await response.json();

    if (books.length === 0) { // api에서 없는 결과 빈 배열 반환이길래 error.tsx 확인하도록 내가 추가함
        throw new Error();
    }

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

// export const metadata: Metadata
// 동적인 값으로 메타 데이터를 설정할 경우(검색어에 따라 다름) 위 방법은 안되고
// 약속된 아래 함수로 사용
export async function generateMetadata({
    searchParams,
}: {
    searchParams:  Promise<{ q?: string }>;
}): Promise<Metadata> {
    // 현재 페이지 메타 데이터를 동적으로 생성하는 역할을 합니다
    const {q} = await searchParams;
    return {
        title: `${q} : 한입북스 검색`,
        description: `${q}의 검색 결과입니다.`,
        openGraph: {
            title: `${q} : 한입북스 검색`,
            description: `${q}의 검색 결과입니다.`,
            images: ["/thumbnail.png"],
        }
    };
}

export default function Page({
   searchParams,
}: {
    // searchParams: Promise<{ q?: string }>;
    searchParams: { q?: string };
}) {
    // const {q} = await searchParams;
    //
    // await delay(1500); // 1.5초 강제 지연
    // const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    //     { cache: "force-cache" } // 페이지는 동적이라도 검색 결과는 캐싱해서 조금이라도 빠르게 가능
    // );
    // if (!response.ok) {
    //     return <div>오류가 발생했습니다..</div>;
    // }
    // const books: BookData [] = await response.json();
    //
    // return (
    //     <div>
    //         {books.map((book) => (
    //             <BookItem key={book.id} {...book} />
    //         ))}
    //     </div>
    // );
    return (
        // key값 주어서 쿼리스트링 검색어 바뀔때마다 새로 로딩되도록
        <Suspense
            key={searchParams.q || ""}
            fallback={
                <BookListSkeleton count={3} />
            }
        >
            <SearchResult q={searchParams.q || ""}/>
        </Suspense>
    )
}