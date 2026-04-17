import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";


const NotesPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', 1, ''],
        queryFn: () => fetchNotes({ page: 1, search: '' })

    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    )
}

export default NotesPage;