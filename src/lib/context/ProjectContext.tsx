import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Project, ProjectContextType, Goal } from '../types/project';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const createProject = useCallback((project: Omit<Project, 'id' | 'goals'>): Project => {
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      goals: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, []);

  const updateProject = useCallback((project: Project) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  }, [selectedProject]);

  const addGoal = useCallback((projectId: string, goal: Omit<Goal, 'id'>): Goal => {
    const newGoal: Goal = {
      ...goal,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, goals: [...p.goals, newGoal] }
        : p
    ));
    return newGoal;
  }, []);

  const updateGoal = useCallback((projectId: string, goal: Goal) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId
        ? { ...p, goals: p.goals.map(g => g.id === goal.id ? goal : g) }
        : p
    ));
  }, []);

  const deleteGoal = useCallback((projectId: string, goalId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId
        ? { ...p, goals: p.goals.filter(g => g.id !== goalId) }
        : p
    ));
  }, []);

  return (
    <ProjectContext.Provider value={{
      projects,
      selectedProject,
      setSelectedProject,
      createProject,
      updateProject,
      deleteProject,
      addGoal,
      updateGoal,
      deleteGoal,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}; 