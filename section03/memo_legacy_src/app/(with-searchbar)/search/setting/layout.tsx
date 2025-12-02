export default function Layout({
   children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div>세팅 헤더</div>
            {children}
        </div>
    );
}