export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  imageKeyword: string; // Used to fetch relevant images
  isOffer?: boolean;
  ctaText?: string;
  bulletPoints?: string[];
}

export interface SlideProps {
  data: SlideContent;
  isActive: boolean;
}
