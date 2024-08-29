"use client";
import React, { useState, useEffect } from 'react';
import LearningPathDashboard from './components/LearningPathFlowchart';
import { LearningPath } from '../../types/types';

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
    <div className="bg-white text-white min-h-screen">
      <div className="container mx-auto p-4">

        {selectedPath && <LearningPathDashboard />}
      </div>
    </div>
  );
}
