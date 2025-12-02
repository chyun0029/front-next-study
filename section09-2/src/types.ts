export interface BookData {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  description: string;
  coverImgUrl: string;
}

// API 응답에 맞게
export interface ReviewData {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    bookId: number;
}