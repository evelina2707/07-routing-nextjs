import Link from 'next/link';
import css from './NotesPage.module.css';

type Note = {
  id: number;
  title: string;
  content: string;
  tag?: string;
};

type Props = {
  notes: Note[];
};

export default function NotesPage({ notes }: Props) {
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2>Notes</h2>
        <button className={css.button}>New note</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}