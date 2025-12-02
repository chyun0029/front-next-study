// 리액트의 서버 컴포넌트라 async 키워드 사용 가능
import ClientComponent from "@/components/client-component";

export default async function Page({
 searchParams,
}: {
    searchParams: Promise<{q: string}>;
}) {
    // console.log(searchParams); // "GET /search?q=123" 터미널에 출력됨
    const {q} = await searchParams;
    return (
        <div>
            검색 페이지: {q}
            <ClientComponent>
                <></>
            </ClientComponent>
        </div>
    );
}