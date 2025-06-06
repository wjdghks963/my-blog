import { Tag } from "@prisma/client";

export interface UserInfo {
  email: string;
  name: string;
  image: string;
}

export type MutationResult = { ok: boolean };

export type Category = {
  category: string;
  posts: { id: number; title: string }[];
};

export type TagWithId = {
  tagId: number;
  tag: string;
};
