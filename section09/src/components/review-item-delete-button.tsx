'use client'

import {useActionState, useEffect, useRef} from "react";
import {deleteReviewAction} from "@/actions/delete-review.action";

export default function ReviewItemDeleteButton(
    {reviewId, bookId}: {reviewId: number, bookId: number}
) {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

    useEffect(() => {
        if(state && !state.status){
            alert(state.error);
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction}>
            <input name='reviewId' value={reviewId} hidden readOnly/>
            <input name='bookId' value={bookId} hidden readOnly/>
            {isPending ? (
                <div>...</div>
            ) : (
                <div onClick={() => formRef.current?.requestSubmit()}>
                    삭제하기
                </div>
            )}
            {/*requestSubmit은 일반 submit과 다르게 form 내부의 유효성 검사를 통과해야 제출이 된다. 안전*/}
        </form>
    )
}