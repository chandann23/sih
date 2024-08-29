export interface LearningPath {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  subChapters: SubChapter[];
}

export interface SubChapter {
  id: string;
  title: string;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
