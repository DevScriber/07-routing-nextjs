"use client";

import NoteList from "@/components/NoteList/NoteList";
import type Note from "@/types/note";

interface NotesClientProps {
    notes: Note[];
}

export default function NotesClient({ notes }: NotesClientProps) {
    return <NoteList notes={notes} />;
}