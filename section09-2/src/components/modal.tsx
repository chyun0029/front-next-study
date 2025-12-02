"use client";

import style from "./modal.module.css";
import {ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useRouter} from "next/navigation";

export default function Modal(
    { children }: { children: ReactNode }
) {

    // dialog 태그가 처음 렌더링이 됐을때는 모달이 화면에 보이지 않게하기 위한
    const dialogRef = useRef<HTMLDialogElement>(null);

    const router = useRouter();

    useEffect(() => {
        if(!dialogRef.current?.open){ // 모달이 꺼져있는 상태라면
            dialogRef.current?.showModal(); // 모달을 강제로 켜서 띄우기
            dialogRef.current?.scrollTo({
                top: 0, // 모달이 켜질때 스크롤을 맨 위에서 시작하게 하기
            })
        }
    }, []);

    return createPortal(
        <dialog
            onClose={() => router.back()} // 키보드 esc 이벤트 처리
            onClick={(e) => {
                // 모달의 배경이 클릭이된거면 -> 뒤로가기
                if ((e.target as any).nodeName === 'DIALOG'){ // nodeName 타입 지원이 아직 안되서 as 단언으로 처리
                    router.back();
                }
            }}
            className={style.modal} ref={dialogRef}>
            {children}
        </dialog>,
        document.getElementById('modal-root') as HTMLElement
    );
}