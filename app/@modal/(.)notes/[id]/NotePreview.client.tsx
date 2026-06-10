'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading note...</p>
      </Modal>
    );
  }
  if (error) {
    return (
      <Modal onClose={handleClose}>
        <p>Failed to load note.</p>
      </Modal>
    );
  }
  if (!note) {
    return (
      <Modal onClose={handleClose}>
        <p>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div>
        <h2>{note.title}</h2>
        <div>{note.content}</div>
        <div>
          <span>Tag: {note.tag}</span>
        </div>
        <div>
          <span>
            Created: {new Date(note.createdAt).toLocaleString()}<br />
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </Modal>
  );
}