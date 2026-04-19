import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface FilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilterPage({ params }: FilterPageProps) {

  const resolvedParams = await params;

  const currentTag = resolvedParams.slug[0];

  const data = await fetchNotes({
    page: 1,
    search: "",
    tag: currentTag,
  });

  return <NoteList notes={data.notes} />;
}