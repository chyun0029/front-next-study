import { BookData } from "@/tpyes";

export default async function fetchBooks(q?:string): Promise<BookData []> {
    // const url = `http://localhost:12345/book`;
    let url = `http://localhost:12345/book`;

    if(q){ // 검색 조건에 대한 API 추가. let으로 선언해야 바꿀수 있음
        url += `/search?q=${encodeURIComponent(q)}`;
    }

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
    }
    catch (err) {
        console.error(err);
        return [];
    }
}