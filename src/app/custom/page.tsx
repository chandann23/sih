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
        
        // Clear the success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
        
        // Update the state with the saved learning paths (including their new IDs)
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

;

  return (
    <div className="bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-8">Learning Path Dashboard</h1>
      <div className="mb-4">
  <IconButton onClick={addLearningPath} icon={<FaPlus />} className="mr-4" >{""}</IconButton>
        <IconButton onClick={saveLearningPaths} icon={<FaSave />} className="mr-4" >Save</IconButton>
        {successMessage && (
          <span className={`ml-4 ${successMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {successMessage}
          </span>
        )}
      </div>
      {learningPaths.map((path) => (
        <div key={path.id} className="mt-4 border border-black p-4 rounded-lg">
          <div
            className="flex items-center cursor-pointer border border-black p-2 rounded-lg bg-white"
            onClick={() => togglePath(path.id)}
          >
            {expandedPaths.includes(path.id) ? <FaChevronDown /> : <FaChevronRight />}
            <Input
              value={path.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateLearningPathTitle(path.id, e.target.value)}
              className="ml-2 flex-1 bg-white border-black"
            />
            <IconButton onClick={() => removeLearningPath(path.id)} icon={<FaTrash />} destructive >{""}</IconButton>
          </div>
          {expandedPaths.includes(path.id) && (
            <div className="ml-6 mt-2">
              {path.chapters.map((chapter) => (
                <div key={chapter.id} className="ml-6 mt-2">
                  <div
                    className="flex items-center cursor-pointer border border-black p-2 rounded-lg bg-white"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    {expandedChapters.includes(chapter.id) ? <FaChevronDown /> : <FaChevronRight />}
                    <Input
                      value={chapter.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChapterTitle(path.id, chapter.id, e.target.value)}
                      className="ml-2 flex-1 bg-white border-black"
                    />
                    <IconButton onClick={() => removeChapter(path.id, chapter.id)} icon={<FaTrash />} destructive >{""}</IconButton>
                  </div>
                  {expandedChapters.includes(chapter.id) &&
                    chapter.subChapters.map((sub) => (
                      <div key={sub.id} className="ml-6 mt-2">
                        <div
                          className="flex items-center cursor-pointer border border-black p-2 rounded-lg bg-white"
                          onClick={() => toggleSubChapter(sub.id)}
                        >
                          {expandedSubChapters.includes(sub.id) ? <FaChevronDown /> : <FaChevronRight />}
                          <Input
                            value={sub.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSubChapterTitle(path.id, chapter.id, sub.id, e.target.value)}
                            className="ml-2 flex-1 bg-white border-black"
                          />
                          <IconButton onClick={() => removeSubChapter(path.id, chapter.id, sub.id)} icon={<FaTrash />} destructive>{""}</IconButton>
                        </div>
                      </div>
                    ))}
                  {expandedChapters.includes(chapter.id) && (
                    <IconButton onClick={() => addSubChapter(path.id, chapter.id)} icon={<FaPlus />} className="ml-6 mt-2" >{""}</IconButton>
                  )}
                </div>
              ))}
              <IconButton onClick={() => addChapter(path.id)} icon={<FaPlus />} className="ml-6 mt-4" >{""}</IconButton>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const Input: React.FC<InputProps> = ({ value, onChange, className }) => (
  <input
    value={value}
    onChange={onChange}
    className={`bg-white border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
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
    onClick={onClick}
    className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 
      ${destructive ? 'text-red-600 border-red-600 focus:ring-red-500' : 'text-blue-600 border-blue-600 focus:ring-blue-500'} 
      ${className}`}
  >
    {icon}
    {children && <span className="ml-2">{children}</span>}
  </button>
);

