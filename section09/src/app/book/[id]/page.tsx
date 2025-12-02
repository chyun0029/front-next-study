import style from "./page.module.css";
import {notFound} from "next/navigation";
import {BookData, ReviewData} from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

// export const dynamicParams = false;

export function generateStaticParams(){
    return [{id: "1"}, {id: "2"}, {id: "3"}]
}

async function BookDetail({bookId}: {bookId: string}){
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
    );
    if (!response.ok) {
        if(response.status === 404){ // 5강 추가
            notFound();
        }
        return <div>오류가 발생했습니다..</div>;
    }
    const book = await response.json();
    const {title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

async function ReviewList({bookId}: {bookId: string}){
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
        {next: {tags: [`review-${bookId}`]}} // 5강 태그 기반, 데이터 캐시 재검증
    );
    if(!response.ok){
        // error.tsx로 처리
        throw new Error(`Review fetch failed : ${response.status}`);
    }
    const reviews: ReviewData[] = await response.json();

    return <section>
        {reviews.map(review => (
            <ReviewItem key={`review-item-${review.id}`} {...review} />
        ))}
    </section>;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // 해당 책 상세 정보를 메타 정보에 넣으면 좋으니 API 호출
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
        { cache: "force-cache"}
    ); // 위 BookDetail()에서 요청이 겹쳐도 Request Memoization으로 중복 API 호출 방지해주는중

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const book: BookData = await response.json();

    return {
        title: `${book.title} - 한입북스`,
        description: book.description,
        openGraph: {
            title: `${book.title} - 한입북스`,
            description: book.description,
            images: [book.coverImgUrl],
        },
    }
}

export default function Page({
   params,
}: {
    params: { id: string };
}) {
    return (
        <div className={style.container}>
            <BookDetail bookId={params.id}/>
            <ReviewEditor bookId={params.id} />
            <ReviewList bookId={params.id} />
        </div>
    );
    // const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
    // );
    // if (!response.ok) {
    //     if(response.status === 404){ // 5강 추가
    //         notFound();
    //     }
    //     return <div>오류가 발생했습니다..</div>;
    // }
    // const book = await response.json();
    // const {title, subTitle, description, author, publisher, coverImgUrl} = book;
    //
    // return (
    //     <div className={style.container}>
    //         <div
    //             className={style.cover_img_container}
    //             style={{backgroundImage: `url('${coverImgUrl}')`}}
    //         >
    //             <img src={coverImgUrl}/>
    //         </div>
    //         <div className={style.title}>{title}</div>
    //         <div className={style.subTitle}>{subTitle}</div>
    //         <div className={style.author}>
    //             {author} | {publisher}
    //         </div>
    //         <div className={style.description}>{description}</div>
    //     </div>
    // );
}
