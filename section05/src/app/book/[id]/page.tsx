import style from "./page.module.css";
import {notFound} from "next/navigation";

// export const dynamicParams = false;

export function generateStaticParams(){
    return [{id: "1"}, {id: "2"}, {id: "3"}]
    // (AI note) 사전 렌더링할 id 목록을 지정
    // id가 1,2,3인 도서에 대해서는 빌드 시점에 미리 HTML 생성
    // 나머지 도서들은 최초 요청 시점에 서버에서 HTML 생성 후 캐싱 (ISR)

    // 4번부터는 요청시 실시간 생성되어 html 만들어저 풀 라우트 캐싱됨
    // .next/server/app/book 에서 4,5,6...html 파일이 생성 확인 가능
}

export default async function Page({
   params,
}: {
    params: Promise<{ id: string | string[] }>;
}) {
    const {id} = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
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
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    );
}
