"use client";
import React, { useState, useEffect } from 'react';
import LearningPathDashboard from './components/LearningPathFlowchart';

interface LearningPath {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  subChapters: SubChapter[];
}

interface SubChapter {
  id: string;
  title: string;
}

export default function MyLearningPathPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const response = await fetch('/api/learning-paths');
        if (response.ok) {
          const data = await response.json();
          setLearningPaths(data);
          if (data.length > 0) {
            setSelectedPathId(data[0].id); // Select the first path by default
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

  const selectedPath = learningPaths.find(path => path.id === selectedPathId);

  if (learningPaths.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <select
          value={selectedPathId || ''}
          onChange={(e) => setSelectedPathId(e.target.value)}
          className="mb-4 p-2 border rounded bg-gray-800 text-white"
        >
          {learningPaths.map(path => (
            <option key={path.id} value={path.id}>{path.title}</option>
          ))}
        </select>
        {selectedPath && <LearningPathDashboard learningPath={selectedPath} />}
      </div>
    </div>
  );
}
