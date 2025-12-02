/**
 파일명 [id].tsx <- /book/1, /book/abc
 파일명 [...id].tsx <- /book/1, /book/1/2/3 여러개의 아이디에 대응 가능 : Catch All Segment
 파일명 [[...id]].tsx <- /book, /book/1, /book/1/2/3 여러개의 아이디에 대응 가능 : Optional Catch All Segment
 */
// import {useRouter} from "next/router";
import style from './[id].module.css'
import {
    GetServerSidePropsContext,
    GetStaticPropsContext,
    InferGetServerSidePropsType,
    InferGetStaticPropsType
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from 'next/router';
import Head from "next/head";

const mockData = {
    "id": 1,
    "title": "한 입 크기로 잘라 먹는 리액트",
    "subTitle": "자바스크립트 기초부터 애플리케이션 배포까지",
    "description": "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
    "author": "이정환",
    "publisher": "프로그래밍인사이트",
    "coverImgUrl": "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg"
};

// SSG 동적 경로에 적용하기
export const getStaticPaths = async () => {
    return {
        paths: [
            {params: {id: '1'}},
            {params: {id: '2'}},
            {params: {id: '3'}}, // url parameter는 문자열만 허용
        ],
        fallback: true,
        /**
        <fallback 옵션>
        위에 없는 url 요청일 경우 대응. 3가지
        - false: 404 Not Fount 반환

        다음 옵션들은 빌드 타임에 없던 페이지라도 요청시 서버에서
        - 'blocking': 즉시 생성(SSR 방식)     ~ 하지만 요청응답 늘어질경우 빈화면
        - true: 즉시 생성(SSR 방식) + 데이터가 없는 폴백 상태의 페이지부터 반환

        <확인 방법>
        blocking: build시에는 1,2,3만 있지만 -> start해서는 4,5도 나옴
        true: 개발자도구-Network-No Throttle 3G로 속도 늦춤 변경
               -> 있는 페이지 11,12번 검색하면
                   if(router.isFallback) return '로딩중입니다';
               이 잠깐 보였다가 -> 데이터 로딩 후 화면 변경됨 확인
               -> 없는 페이지 13번~ 검색하면
                   if(!book) return <div>책 정보를 가져올 수 없습니다.</div>;
               이 잠깐 보였다가 -> 데이터 로딩 후 화면 변경됨 확인
               getStaticProps에 notFound: true; 추가해 놨다면 404 페이지 반환 가능
         */
    }
}

// export const getServerSideProps = async (
//     context: GetServerSidePropsContext // SSR
export const getStaticProps = async (
    context: GetStaticPropsContext // SSG
) => {
    const id = context.params!.id; // ! 느낌표로 param 있을거란걸 단언
    const book = await fetchOneBook(Number(id));

    if(!book){
        return {
            notFound: true,
        };
    }

    return {
        props: {
            book
        }
    };
};

export default function Page({
    book,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) { // SSR
}: InferGetStaticPropsType<typeof getStaticProps>) { // SSG
    // const router = useRouter();
    // const {id} = router.query; // 동적 라우팅 사용
    // return <h1>Book {id}</h1>;
    const router = useRouter();
    // if(router.isFallback) return '로딩중입니다';
    if(router.isFallback) {
        return <>
            <Head>
                {/*폴백 상태에서도 기본 메타 태그 반환하도록*/}
                <title>도서 목록</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content="한입북스" />
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
            </Head>
            <div>로딩중입니다...</div>;
        </>
    }
    if(!book) return <div>책 정보를 가져올 수 없습니다.</div>;
    const {id, title, subTitle,
        author, publisher, coverImgUrl, description } = book;
    return (
        <>
            <Head> {/* SEO 설정용 Head */}
                {/* 하지만 현재 페이지는 SSG 폴백 설정이 있기에 */}
                {/* 4,5,6...등 없는 페이지 요청시 SEO 설정이 안된채로 노출될 수 있음 */}
                {/* 해결 위해 89번째줄 -> 90번째줄 Fallback 상태에서의 SEO 설정 코드 추가 */}
                <title>{title}</title>
                <meta property="og:image" content={coverImgUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Head>
            <div className={style.container}>
                <div
                    className={style.cover_img_container}
                    style={{backgroundImage: `url(${coverImgUrl})`}}
                >
                    <img src={coverImgUrl}/>
                </div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>{author} | {publisher}</div>
                <div className={style.description}>{description}</div>
            </div>;
        </>
    );
}