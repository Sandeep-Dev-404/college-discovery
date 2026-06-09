export type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  placementAvg: number;
  placementHigh?: number | null;
  overview: string;
  imageUrl?: string | null;
  courses?: Course[];
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
};

export type Course = {
  id: string;
  name: string;
  duration: string;
  fees: number;
  collegeId: string;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  collegeId: string;
};