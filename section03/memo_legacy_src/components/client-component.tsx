"use client";

import ServerComponent from "@/components/server-component";

export default function ClientComponent({
    children
}:{
    children: React.ReactNode
}) {
    console.log("클라이언트 컴포넌트");
    return (
        // <ServerComponent />
        // -> import하는 순간 서버 컴포넌트를 클라이언트 컴포넌트로 변환하여 실행
        // 권장하지 않음 (성능 저하 우려)
        <div>{children}</div>
        // -> children으로 전달받는 방법 권장
        // -> children은 서버 컴포넌트를 유지 (클라이언트 컴포넌트로 변경X)
    );
}