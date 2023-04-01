import { useState, useEffect } from "react";

const parseOtherProjects = (mdContent) => {
  const others = [];
  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const name = line.substr(3).trim();
      const description = lines[++i].trim();
      const tags = lines[++i].split(":")[1].trim();
      const badges = [];
      const buttons = [];

      while (lines[++i] && !lines[i].startsWith("- Badges:")) {}
      while (lines[++i] && lines[i].startsWith("  - ")) {
        const badgeLine = lines[i].substr(4).split("[");
        const badgeName = badgeLine[0].trim();
        const badgeColor = badgeLine[1].split("]")[0].trim();
        badges.push({ text: badgeName, colorScheme: badgeColor });
      }

      while (lines[++i] && lines[i].startsWith("  - ")) {
        const buttonLine = lines[i].substr(4).split("[");
        const buttonText = buttonLine[0].trim();
        const buttonHref = buttonLine[1].split("]")[0].trim();
        buttons.push({ text: buttonText, href: buttonHref });
      }

      others.push({
        name,
        description,
        tags: [tags],
        badges,
        buttons,
      });
    }
  }

  return others;
};

const OtherProjectsArray = () => {
  const [OtherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    fetch("/content/OtherProjects.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setOtherProjects(parseOtherProjects(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return OtherProjects;
};

export default OtherProjectsArray;
