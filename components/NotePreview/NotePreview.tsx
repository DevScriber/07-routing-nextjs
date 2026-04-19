import type Note from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
    note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
    return (
        <div className={css.container}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.tag}>Tag: {note.tag}</p>
            <div className={css.content}>{note.content}</div>
            <p className={css.date}>
                Created: {new Date(note.createdAt).toLocaleString()}
            </p>
        </div>
    );
}