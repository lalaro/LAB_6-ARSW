const apiUrl = 'http://localhost:8080/blueprints';

export const getBlueprintsByAuthor = async (author) => {
  const response = await fetch(`${apiUrl}/${author}`);
  const data = await response.json();
  return data;
};
