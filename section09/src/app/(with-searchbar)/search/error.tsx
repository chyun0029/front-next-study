"use client";
// 서버 or 클라이언트 어디든지 에러가 발생할 수 있기에 클라이언트 컴포넌트로 설정
// 클라이언트 컴포넌트는 서버측에서도 동일하게 실행되기 때문

import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Error(
    {error, reset}: {error: Error; reset: ()=> void}
) {

    const router = useRouter();

    useEffect(() => {
        console.log(error.message);
    }, [error])

    return (
        <div>
            <h3>검색 과정에서 오류가 발생했습니다</h3>
            <button onClick={() => {
                startTransition(()=>{ // 아래 두줄 일괄 처리 되도록
                    router.refresh() // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
                    reset() // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
                });
            }}>다시 시도</button>
        </div>
    );
};