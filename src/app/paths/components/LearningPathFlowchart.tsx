"use client";
import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '~/components/ui/table';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Badge } from '~/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '~/components/ui/select';
import { LearningPath, Chapter } from '~/types/types';

const LearningPathDashboard: React.FC = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  useEffect(() => {
    // Fetch all learning paths when the component mounts
    const fetchLearningPaths = async () => {
      try {
        const response = await fetch('/api/learning-paths');
        if (response.ok) {
          const paths = await response.json();
          setLearningPaths(paths);
          if (paths.length > 0) {
            setSelectedPathId(paths[0].id);
          }
        } else {
          console.error('Failed to fetch learning paths');
        }
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      }
    };

    fetchLearningPaths();
  }, []);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const handleCheckboxChange = async (chapterId: string, subChapterId: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;

    // Optimistically update the UI
    setLearningPaths((prevPaths) => {
      return prevPaths.map((path) => {
        if (path.id === selectedPathId) {
          return {
            ...path,
            chapters: path.chapters.map((chapter) => {
              if (chapter.id === chapterId) {
                return {
                  ...chapter,
                  subChapters: chapter.subChapters.map((subChapter) => {
                    if (subChapter.id === subChapterId) {
                      return { ...subChapter, completed: updatedStatus };
                    }
                    return subChapter;
                  }),
                };
              }
              return chapter;
            }),
          };
        }
        return path;
      });
    });

    // Update the database
    try {
      await fetch(`/api/sub-chapters/${subChapterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedStatus }),
      });
    } catch (error) {
      console.error('Failed to update the subchapter:', error);
    }
  };

  const selectedPath = learningPaths.find(path => path.id === selectedPathId);

  if (!selectedPath) {
    return <div>Loading...</div>;
  }

  const totalSubChapters = selectedPath.chapters.flatMap((c) => c.subChapters).length;
  const completedSubChapters = selectedPath.chapters
    .flatMap((c) => c.subChapters)
    .filter((sc) => sc.completed).length;
  const progressPercentage = Math.round((completedSubChapters / totalSubChapters) * 100);

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Learning Path Dashboard</h1>
            <Select
              value={selectedPathId || ''}
              onValueChange={(value) => setSelectedPathId(value)}
            >
              <SelectTrigger className="w-[200px] bg-white text-black">
                <SelectValue placeholder="Select a learning path" />
              </SelectTrigger>
              <SelectContent>
                {learningPaths.map((path) => (
                  <SelectItem key={path.id} value={path.id}>{path.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <h2 className="text-2xl font-semibold mb-2">{selectedPath.title}</h2>
          <div className="flex items-center justify-between">
            <div className="text-sm">Progress: {completedSubChapters}/{totalSubChapters}</div>
            <div className="text-sm font-semibold">{progressPercentage}% complete</div>
          </div>
          <Progress
            value={progressPercentage}
            className="mt-4 bg-white/20 [--progress-indicator-color:white]"
          />
        </CardHeader>
        <CardContent className="p-6">
          {selectedPath.chapters.map((chapter, index) => (
            <div key={chapter.id} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                onClick={() => toggleChapter(chapter.id)}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Step {index + 1}: {chapter.title}
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-4">
                    {chapter.subChapters.filter((sc) => sc.completed).length}/{chapter.subChapters.length}
                  </span>
                  {expandedChapters.includes(chapter.id) ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>
              {expandedChapters.includes(chapter.id) && (
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Status</TableHead>
                        <TableHead>Problem</TableHead>
                        <TableHead className="w-24 text-center">Difficulty</TableHead>
                        <TableHead className="w-24 text-center">Revision</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chapter.subChapters.map((subChapter) => (
                        <TableRow key={subChapter.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={subChapter.completed}
                              onChange={() => handleCheckboxChange(chapter.id, subChapter.id, subChapter.completed)}
                              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{subChapter.title}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={subChapter.difficulty === 'Easy' ? 'success' :
                                subChapter.difficulty === 'Medium' ? 'warning' : 'destructive'}
                            >
                              {subChapter.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <FaStar className="inline text-yellow-400" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPathDashboard;
