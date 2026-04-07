export interface RatingReviewProps {
  rating: number;
  totalRatings: number;
  totalReviews: number;
  excellent: number;
  veryGood: number;
  good: number;
  average: number;
  poor: number;
  onWriteReview: () => void;
}

export interface RatingCategoryProps {
  label: string;
  count: number;
  percentage: number;
  color: string;
}
