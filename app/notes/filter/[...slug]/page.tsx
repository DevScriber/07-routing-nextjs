import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
    params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === "all" ? undefined : slug[0]; // Если "all", тег не шлем

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag], // Добавляем tag в ключ
        queryFn: () => fetchNotes({ page: 1, search: "", tag }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
};

export default NotesPage;