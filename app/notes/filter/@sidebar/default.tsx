import Link from "next/link";
import { Tags } from "@/types/note";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {

    const tags: (Tags | "all")[] = ["all", "Todo", "Personal", "Work", "Meeting", "Shopping"];

    return (
        <ul className={css.menuList}>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${tag}`}
                        className={css.menuLink}
                    >
                        {tag === "all" ? "All notes" : tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}