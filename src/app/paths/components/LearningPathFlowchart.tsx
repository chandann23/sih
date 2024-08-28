import React, { useState } from 'react';
import { FaYoutube, FaFileAlt, FaCode, FaStickyNote, FaStar } from 'react-icons/fa';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '~/components/ui/table';
interface SubChapter {
  id: string;
  title: string;
  completed: boolean;
  hasArticle: boolean;
  hasVideo: boolean;
  hasPractice: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Chapter {
  id: string;
  title: string;
  subChapters: SubChapter[];
}

interface LearningPath {
  id: string;
  title: string;
  chapters: Chapter[];
}

const LearningPathDashboard: React.FC<{ learningPath: LearningPath }> = ({ learningPath }) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const totalSubChapters = learningPath.chapters.flatMap((c) => c.subChapters).length;
  const completedSubChapters = learningPath.chapters
    .flatMap((c) => c.subChapters)
    .filter((sc) => sc.completed).length;
  const progressPercentage = Math.round((completedSubChapters / totalSubChapters) * 100);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg bg-gray-50">
        <div className="bg-white p-6 border-b border-gray-200 rounded-t-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{learningPath.title}</h1>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Your Progress: {completedSubChapters}/{totalSubChapters}</div>
            <div className="text-sm text-gray-600">{progressPercentage}% complete</div>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
            <div className="bg-red-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        {learningPath.chapters.map((chapter, index) => (
          <div key={chapter.id} className="border-b border-gray-200">
            <div
              className="flex justify-between items-center cursor-pointer p-4 bg-white hover:bg-gray-100"
              onClick={() => toggleChapter(chapter.id)}
            >
              <h2 className="text-lg font-medium text-gray-700">Step {index + 1}: {chapter.title}</h2>
              <span className="text-sm text-gray-600">{chapter.subChapters.filter((sc) => sc.completed).length}/{chapter.subChapters.length}</span>
            </div>
            {expandedChapters.includes(chapter.id) && (
              <div className="bg-white p-4">
                <Table className="w-full text-sm">
                  <TableHeader>
                    <TableRow className="text-gray-500">
                      <TableHead className="text-left p-2">Status</TableHead>
                      <TableHead className="text-left p-2">Problem</TableHead>
                      <TableHead className="text-center p-2">Article</TableHead>
                      <TableHead className="text-center p-2">YouTube</TableHead>
                      <TableHead className="text-center p-2">Practice</TableHead>
                      <TableHead className="text-center p-2">Note</TableHead>
                      <TableHead className="text-center p-2">Difficulty</TableHead>
                      <TableHead className="text-center p-2">Revision</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chapter.subChapters.map((subChapter) => (
                      <TableRow key={subChapter.id} className="border-t border-gray-200">
                        <TableCell className="p-2">
                          <input
                            type="checkbox"
                            checked={subChapter.completed}
                            onChange={() => {/* Handle completion */ }}
                            className="w-4 h-4"
                          />
                        </TableCell>
                        <TableCell className="p-2 text-gray-800">{subChapter.title}</TableCell>
                        <TableCell className="text-center p-2">
                          {subChapter.hasArticle && <FaFileAlt className="inline text-gray-700" />}
                        </TableCell>
                        <TableCell className="text-center p-2">
                          {subChapter.hasVideo && <FaYoutube className="inline text-red-600" />}
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <FaCode className="inline text-green-500" />
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <FaStickyNote className="inline text-yellow-500" />
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <span className={`px-2 py-1 rounded ${subChapter.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            subChapter.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {subChapter.difficulty}
                          </span>
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <FaStar className="inline text-yellow-500" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathDashboard;

