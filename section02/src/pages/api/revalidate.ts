import {NextApiRequest, NextApiResponse} from "next";

// npm run start하고 새탭에서 http://localhost:3000/api/revalidate 직접 요청 보내야
// http://localhost:3000 페이지의 추천 도서 바뀜
export default async function handler (
    // 여기에 api 요청을 보내서 index 페이지를 재생성하는 역할
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
        await res.revalidate('/'); // revalidate(재생성) 할 경로
        return res.json({revalidate: true});
    } catch (err) {
        res.status(500).send('Revalidation Failed');
    }
}