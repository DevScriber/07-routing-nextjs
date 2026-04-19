import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const currentTag = slug[0];

  const data = await fetchNotes({
    page: 1,
    search: "",
    tag: currentTag,
  });

  return <NotesClient notes={data.notes} />;
}