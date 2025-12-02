import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import {NextPage} from "next";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({
    Component,
    pageProps
}: AppProps & {
    Component: NextPageWithLayout;
}) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
    // ?? ~ : 페이지별 레이아웃 설정이 없으면 기본 레이아웃 적용

    return (
        <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
        </GlobalLayout>
    );
}
// React의 App 컴포넌트 역할 (모든 페이지의 최상위 컴포넌트)
