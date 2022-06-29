import { atom } from "jotai";

type User = {
  id: string;
  name: string;
  email: string;
};

export const userAtom = atom<User | null>(null);
