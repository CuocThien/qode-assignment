export interface Comment {
  id: number;
  text: string;
  photoId: number;
}

export interface Photo {
  id: number;
  base64: string;
  comments: Comment[];
}
