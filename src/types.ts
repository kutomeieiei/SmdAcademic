export type ArchiveCategory = 'Mathematics' | 'Biology' | 'Chemistry' | 'Physics';

export interface ExternalLinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  subjects: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  tags: string[];
  difficulty: number;
  yearPublished: number;
  dateAdded: string;
  downloadUrl?: string;
  solutionUrl?: string;
  isOfficialSource: boolean;
}
