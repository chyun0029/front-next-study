// 그냥 백엔드 요청응답 받기에는 너무 빠른 상황이니
// 강제 지연을 주기 위한 함수 추가
export async function delay(ms: number){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve("");
        }, ms)
    });
}
/**
주의사항)
1. loading.tsx는 동일 경로와 해당 경로 아래 모든 비동기 컴포넌트들을 스트리밍 되도록 설정해준다.
    ex) search/setting/page.tsx만들어주면 상위의 loading.tsx가 있어서 적용된다.
2. async 컴포넌트에만 스트리밍 적용된다 (async function Page())
3. Page 컴포넌트에만 적용된다
4. 브라우저에서 쿼리스트링이 있는상태에서 변경될때는 적용X
    ex) ~/search?q=자바 -> ~search?q=한입
*/
