import axios from 'axios';
import type { CreateNoteData, Note } from '../types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage: number;
  tag?: string;
}

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function fetchNotes({
  page,
  search,
  perPage,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return {
    notes: Array.isArray(data.notes) ? data.notes : [],
    totalPages: data.totalPages ?? 1,
  };
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}