"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import type Note from "@/types/note";

interface Props {
    params: Promise<{ id: string }>;
}

export default function NotePreviewClient({ params }: Props) {
    const router = useRouter();
    const { id } = use(params);
    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        fetchNoteById(id)
            .then(setNote)
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <Modal onClose={() => router.back()}>
            {note ? <NotePreview note={note} /> : <p>Loading...</p>}
        </Modal>
    );
}