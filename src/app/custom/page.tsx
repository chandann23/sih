'use client';

import { useState } from "react";
import { nanoid } from "nanoid";
import { FaChevronDown, FaChevronRight, FaPlus, FaTrash, FaSave } from "react-icons/fa";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

interface SubChapter {
  id: string;
  title: string;
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

export default function LearningPathDashboard() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [expandedPaths, setExpandedPaths] = useState<string[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedSubChapters, setExpandedSubChapters] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const togglePath = (pathId: string) => {
    setExpandedPaths((prev) =>
      prev.includes(pathId) ? prev.filter((id) => id !== pathId) : [...prev, pathId]
    );
  };

  const saveLearningPaths = async () => {
    try {
      const response = await fetch('/api/learning-paths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(learningPaths),
      });

      if (response.ok) {
        const savedLearningPaths = await response.json();
        console.log('Learning Paths saved:', savedLearningPaths);
        setSuccessMessage('Learning paths saved successfully!');

        setTimeout(() => setSuccessMessage(null), 3000);

        setLearningPaths(savedLearningPaths);
      } else {
        console.error('Failed to save learning paths');
        setSuccessMessage('Failed to save learning paths. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('An error occurred. Please try again.');
    }
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const toggleSubChapter = (subChapterId: string) => {
    setExpandedSubChapters((prev) =>
      prev.includes(subChapterId) ? prev.filter((id) => id !== subChapterId) : [...prev, subChapterId]
    );
  };

  const addLearningPath = () => {
    setLearningPaths([...learningPaths, { id: nanoid(), title: "New Learning Path", chapters: [] }]);
  };

  const removeLearningPath = (id: string) => {
    setLearningPaths(learningPaths.filter((path) => path.id !== id));
  };

  const updateLearningPathTitle = (id: string, title: string) => {
    setLearningPaths(
      learningPaths.map((path) => (path.id === id ? { ...path, title } : path))
    );
  };

  const addChapter = (pathId: string) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === pathId
          ? {
            ...path,
            chapters: [...path.chapters, { id: nanoid(), title: "New Chapter", subChapters: [] }],
          }
          : path
      )
    );
  };

  const removeChapter = (pathId: string, chapterId: string) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === pathId
          ? { ...path, chapters: path.chapters.filter((chapter) => chapter.id !== chapterId) }
          : path
      )
    );
  };

  const updateChapterTitle = (pathId: string, chapterId: string, title: string) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === pathId
          ? {
            ...path,
            chapters: path.chapters.map((chapter) =>
              chapter.id === chapterId ? { ...chapter, title } : chapter
            ),
          }
          : path
      )
    );
  };

  const addSubChapter = (pathId: string, chapterId: string) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === pathId
          ? {
            ...path,
            chapters: path.chapters.map((chapter) =>
              chapter.id === chapterId
                ? {
                  ...chapter,
                  subChapters: [...chapter.subChapters, { id: nanoid(), title: "New Sub-Chapter" }],
                }
                : chapter
            ),
          }
          : path
      )
    );
  };

  const removeSubChapter = (pathId: string, chapterId: string, subChapterId: string) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === pathId
          ? {
            ...path,
            chapters: path.chapters.map((chapter) =>
              chapter.id === chapterId
                ? {
                  ...chapter,
                  subChapters: chapter.subChapters.filter((sub) => sub.id !== subChapterId),
                }
                : chapter
            ),
          }
          : path
      )
    );
  };

  const updateSubChapterTitle = (pathId: string, chapterId: string, subChapterId: string, title: string) => {
    setLearningPaths(
      learningPaths.map((path) =>
        path.id === pathId
          ? {
            ...path,
            chapters: path.chapters.map((chapter) =>
              chapter.id === chapterId
                ? {
                  ...chapter,
                  subChapters: chapter.subChapters.map((sub) =>
                    sub.id === subChapterId ? { ...sub, title } : sub
                  ),
                }
                : chapter
            ),
          }
          : path
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <h1 className="text-3xl font-bold mb-2">Learning Path Dashboard</h1>
            <p className="text-lg">
              Welcome to your personalized learning journey! This dashboard allows you to create, customize, and manage your own learning paths. Organize your educational goals into paths, chapters, and sub-chapters to structure your learning experience exactly how you want it.
            </p>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <IconButton onClick={addLearningPath} icon={<FaPlus />} className="mr-4 bg-green-500 text-white hover:bg-green-600">New Path</IconButton>
                <IconButton onClick={saveLearningPaths} icon={<FaSave />} className="bg-blue-500 text-white hover:bg-blue-600">Save All</IconButton>
              </div>
              {successMessage && (
                <span className={`px-4 py-2 rounded ${successMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {successMessage}
                </span>
              )}
            </div>

            {learningPaths.map((path) => (
              <div key={path.id} className="mb-6 border border-gray-200 rounded-lg shadow-sm">
                <div
                  className="flex items-center cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
                  onClick={() => togglePath(path.id)}
                >
                  {expandedPaths.includes(path.id) ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />}
                  <Input
                    value={path.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateLearningPathTitle(path.id, e.target.value)}
                    className="ml-2 flex-1"
                  />
                  <IconButton onClick={() => removeLearningPath(path.id)} icon={<FaTrash />} destructive className="ml-2">Remove Path</IconButton>
                </div>
                {expandedPaths.includes(path.id) && (
                  <div className="p-4 bg-white">
                    {path.chapters.map((chapter) => (
                      <div key={chapter.id} className="ml-4 mb-4 border-l-2 border-gray-200 pl-4">
                        <div
                          className="flex items-center cursor-pointer p-2 hover:bg-gray-50 transition duration-150 ease-in-out"
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          {expandedChapters.includes(chapter.id) ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />}
                          <Input
                            value={chapter.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChapterTitle(path.id, chapter.id, e.target.value)}
                            className="ml-2 flex-1"
                          />
                          <IconButton onClick={() => removeChapter(path.id, chapter.id)} icon={<FaTrash />} destructive className="ml-2">Remove Chapter</IconButton>
                        </div>
                        {expandedChapters.includes(chapter.id) && (
                          <div className="mt-2">
                            {chapter.subChapters.map((sub) => (
                              <div key={sub.id} className="ml-4 mb-2 flex items-center">
                                <Input
                                  value={sub.title}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSubChapterTitle(path.id, chapter.id, sub.id, e.target.value)}
                                  className="flex-1"
                                />
                                <IconButton onClick={() => removeSubChapter(path.id, chapter.id, sub.id)} icon={<FaTrash />} destructive className="ml-2">Remove Sub-Chapter</IconButton>
                              </div>
                            ))}
                            <IconButton onClick={() => addSubChapter(path.id, chapter.id)} icon={<FaPlus />} className="mt-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Add Sub-Chapter</IconButton>
                          </div>
                        )}
                      </div>
                    ))}
                    <IconButton onClick={() => addChapter(path.id)} icon={<FaPlus />} className="mt-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Add Chapter</IconButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Input: React.FC<InputProps> = ({ value, onChange, className }) => (
  <input
    value={value}
    onChange={onChange}
    className={`bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

const IconButton: React.FC<ButtonProps & { icon: React.ReactNode; destructive?: boolean }> = ({
  onClick,
  icon,
  children,
  destructive = false,
  className,
}) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(e); }}
    className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out
      ${destructive
        ? 'text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500'
        : 'text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500'} 
      ${className}`}
  >
    {icon}
    {children && <span className="ml-2">{children}</span>}
  </button>
);
