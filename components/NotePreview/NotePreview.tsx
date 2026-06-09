import css from "./NotePreview.module.css";

type Note = {
  id: number;
  title: string;
  content: string;
  date?: string;
  tag?: string;
};

type Props = {
  note: Note;
  onClose: () => void;
};

export default function NotePreview({ note, onClose }: Props) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>

        <div className={css.content}>{note.content}</div>

        {note.date && <div className={css.date}>{note.date}</div>}

        <button className={css.backBtn} onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
}