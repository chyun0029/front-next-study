"use client";

import style from "./review-editor.module.css";
import {createReviewAction} from "@/actions/create-review.action";
import {useActionState, useEffect} from "react";

export default function ReviewEditor({bookId}: {bookId: string}){
    const [state, formAction, isPending] = useActionState(createReviewAction, null);
    // isPending: useActionState가 관리하는 서버 액션(createReviewAction)이 실행중인지 여부

    useEffect(()=>{
        if(state && !state.status){
            alert(state.error);
        }
    }, [state]);

    return (
        <section>
            <form className={style.form_container} action={formAction}>
                <input hidden readOnly name="bookId" value={bookId}/>
                <textarea disabled={isPending} required name="content" placeholder="리뷰 내용"/>
                <div className={style.submit_container}>
                    <input disabled={isPending} required name="author" placeholder="작성자"/>
                    <button disabled={isPending} type="submit">
                        {isPending ? "..." : "작성하기"}
                    </button>
                </div>
            </form>
        </section>
    );
}