import { useState, useEffect } from "react";

const parseTags = (mdContent) => {
  const tags = [];
  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const value = lines[i];

    tags.push({
      value
    });
  }
  return tags;
};

const TagsArray = (file) => {
  const [Tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`/content/${file}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setTags(parseTags(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, [file]);

  return Tags;
};

export default TagsArray;
