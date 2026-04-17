import css from "./NoteList.module.css"
import type Note from "@/types/note"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes']
            })
        },

        onError: (error) => {
            console.error("Failed to delete note:", error);
        }
    })

    if (notes.length === 0) return null;


    return (
        <>
            <ul className={css.list}>
                {notes.map((note: Note) => (
                    <li key={note.id} className={css.listItem}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{note.tag}</span>
                            <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
                            <button onClick={() => mutate(note.id)} className={css.button}>{isPending ? "Deleting..." : "Delete"}</button>
                        </div>
                    </li>))
                }
            </ul>
        </>
    )
}