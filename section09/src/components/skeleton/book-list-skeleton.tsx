import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";

// count 개수만큼 BookItemSkeleton 컴포넌트 렌더링
export default function BookListSkeleton({count}: { count: number }) {
    return new Array(count)
        .fill(0) // 일단 0으로 채워놓고
        .map((_, idx) => (
            <BookItemSkeleton key={`book-item-skeleton-${idx}`} />
        ));
}