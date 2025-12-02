'use server';

import { revalidatePath } from 'next/cache';
import {delay} from "@/util/delay";

export async function createReviewAction(
    _: any, // 6강부터 추가, (state: any)인데 사용 안할거라 언더바로 설정
    formData: FormData
){
    // 터미널에서 확인 가능
    // console.log('Server Action Called')
    // console.log(formData)

    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();
    console.log(bookId, author, content);

    if(!bookId || !content || !author){
        return {
            // 6강부터는 useActionState에 받도록 다음 작성
            status: false,
            error: "리뷰 내용과 작성자를 입력해주세요",
        };
    }

    try{
        await delay(2000); // 6강) 이렇게 딜레이가 있다면 멈춰있는시간동안 사용자가 답답할수 있다
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
                method: 'POST',
                body: JSON.stringify({bookId, content, author}),
            }
        );
        console.log(response.status);
        // revalidatePath(`/book/${bookId}`); // 4강

        /** 5강 다양한 재검증 방식
        // 1.특정 주소의 해당하는 페이지만 재검증
        revalidatePath(`/book/${bookId}`);

        // 2. 특정 경로의 모든 동적 페이지를 재검증
        revalidatePath("/book/[id]", "page");

        // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
        revalidatePath("/(with-searchbar)", "layout")

        // 4. 모든 데이터 재검증
        revalidatePath("/", "layout")

        // 5. 태그 기준, 데이터 캐시 재검증
        revalidatePath(`review-${bookId}`); ///book/[id]/page.tsx
         => 가장 효율적임
         => 태그값을 가지고 있는 Fetch 메서드의 데이터 캐시만 삭제해주기 때문이다
         => 4강 방법의 문제는 많은 캐시를 삭제해버린다 (비효율적, 불필요한 삭제)
        */
        if(!response.ok){
            throw new Error(response.statusText);
        }
        revalidatePath(`review-${bookId}`);
        return {
            status: true,
            error: "",
        }
    }catch(error){
        console.log(error);
        return {
            status: false,
            error: `리뷰 저장에 실패했습니다 : ${error}`,
        }
    }
}