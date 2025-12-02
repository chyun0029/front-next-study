import {ReactNode, Suspense} from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
    return (
        <div>
            {/*라우팅하면서 렌더링 시점 확인용*/}
            <div>{new Date().toLocaleString()}</div>
            {/*Suspense로 감싸서 클라이언트 측에서만 렌더링되도록 설정 (사전 렌더링에서 제외)*/}
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar/>
            </Suspense>
            {children}
        </div>
    );
}
