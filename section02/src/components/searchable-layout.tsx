import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from './searchable-layout.module.css'

export default function SearchableLayout(
    {children}: { children: ReactNode
}) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const q = router.query.q as string;  // as string 작성 안하면 string[] 처럼 쿼리 배열도 고려가 되버린다
    useEffect(() => { // 새로고침 해도 검색어 유지하도록
        setSearch(q || "");
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };


    const onSubmit = () => {
        if(!search || q === search) return; // 값이 없거나 기존 검색어와 같으면 페이지 이동 안함
        router.push(`/search?q=${search}`);
    };

    // 키보드 입력 이벤트
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                    value={search}
                    onKeyDown={onKeyDown}
                    onChange={onChangeSearch}
                    placeholder="검색어를 입력하세요 ..."
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}