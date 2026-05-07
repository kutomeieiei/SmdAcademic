export type ArchiveCategory = 'Mathematics' | 'Biology' | 'Chemistry' | 'Physics';

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: ArchiveCategory;
  size: string;
  dateAdded: string;
  downloads: number;
  tags: string[];
  difficulty: number;
  yearPublished: number;
  downloadUrl?: string; // Optional URL for external downloads like Google Drive
}
