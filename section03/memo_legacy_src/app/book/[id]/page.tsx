// 폴더명에 [...id], [[...id]] 등으로 캐치 옵션 가능
export default async function Page({
    params
}:{
    params:Promise<{ id: string }>;
}){
    const {id} = await params;
    return (
        <div>
            book/[id] 페이지 : {id}
        </div>
    );
}