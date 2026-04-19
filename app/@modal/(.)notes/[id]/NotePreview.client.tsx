"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface NotePreviewClientProps {
    id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
    const router = useRouter();

    const {
        data: note,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    const handleClose = () => {
        router.back();
    };

    return (
        <Modal onClose={handleClose}>
            {isLoading && <p>Loading note...</p>}

            {isError && (
                <p style={{ color: "red" }}>
                    Error: {error instanceof Error ? error.message : "Failed to load note"}
                </p>
            )}

            {note && <NotePreview note={note} />}
        </Modal>
    );
}