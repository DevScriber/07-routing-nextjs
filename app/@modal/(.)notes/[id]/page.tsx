import NotePreviewClient from "./NotePreview.client";

interface Props {
    params: Promise<{ id: string }>;
}

export default function InterceptedNotePage({ params }: Props) {
    return <NotePreviewClient params={params} />;
}