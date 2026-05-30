"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);

  async function loadProjects() {
    const response = await fetch("http://localhost:3001/projects");

    setProjects(await response.json());
  }

  async function createProject() {
    await fetch("http://localhost:3001/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Workshop Project",
      }),
    });

    await loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <h1>Projects</h1>

      <button data-testid="create-project" onClick={createProject}>
        Create Project
      </button>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </>
  );
}
