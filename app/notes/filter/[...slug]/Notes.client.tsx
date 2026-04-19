"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";

interface Props {
    tag?: string;
}

const NotesClient = ({ tag }: Props) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);

    const { data } = useQuery({
        queryKey: ["notes", page, search, tag], // tag обязателен в ключе
        queryFn: () => fetchNotes({ page, search, tag }),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onChange={handleSearch} />
                {data && (
                    <Pagination
                        currentPage={page}
                        setCurrentPage={setPage}
                        totalPages={data.totalPages}
                    />
                )}
                <button onClick={() => setIsModalOpen(true)} className={css.button}>
                    Create note +
                </button>
            </header>
            <main>{data && <NoteList notes={data.notes} />}</main>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onCancel={() => setIsModalOpen(false)} />
                </Modal>
            )}
            <Toaster />
        </div>
    );
};

export default NotesClient;