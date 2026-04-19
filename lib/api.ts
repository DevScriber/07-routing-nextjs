import axios from "axios";
import type Note from "@/types/note";
import type { Tags } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNoteProps {
  page: number;
  perPage?: number;
  search: string;
  tag?: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: Tags;
}

const url = "https://notehub-public.goit.study/api/notes";
const APIKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${APIKey}`,
  },
};

export async function fetchNotes({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNoteProps): Promise<FetchNotesResponse> {
  try {
    const response = await axios.get<FetchNotesResponse>(url, {
      ...options,
      params: {
        page,
        perPage,
        search,
        ...(tag && tag !== "all" ? { tag } : {}),
      },
    });

    return response.data;
  } catch (error) {
    console.log("TCL : fetchNotes : error:", error);
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await axios.get<Note>(`${url}/${id}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  try {
    const response = await axios.post<Note>(url, newNote, options);

    return response.data;
  } catch (error) {
    console.log("TCL : createNote : error:", error);
    throw error;
  }
}

export async function deleteNote(noteId: string): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`${url}/${noteId}`, options);

    return response.data;
  } catch (error) {
    console.log("TCL : deleteNote : error:", error);
    throw error;
  }
}
