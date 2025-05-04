export interface Post {
  _id: string;
  prompt: string;
  photo: string;
  user: {
    _id: string;
    name: string;
    // optionally email, etc.
  };
}
export type FormData = {
  name: string;
  prompt: string;
  photos: string[];
  selectedStyle?: string;
};