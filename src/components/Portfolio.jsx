import React, { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { TechSection } from "./TechSection";

export const Portfolio = () => {
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = () => {
    const URL = "https://api.github.com/users/JohannaBN/repos";

    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load repositories");
        }
        return response.json();
      })
      .then((data) => {
        // Sort the repositories based on the created_at date with newest first
        const sortedRepositories = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRepositories(sortedRepositories);
      })
      .catch((error) => {
        setError(error.message); // Set error message in state
      });
  };

  return (
    <div>
      <TechSection />
      <div className="repositories-container">
        {error && <p>{error}</p>}
        {repositories.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};