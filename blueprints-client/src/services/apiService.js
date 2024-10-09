const apiUrl = 'http://localhost:8080/blueprints';

export const getBlueprintsByAuthor = async (author) => {
  const response = await fetch(`http://localhost:8080/blueprints/${author}`);
  if (!response.ok) {
    throw new Error('Error en la respuesta de la API');
  }
  return response.json();
};
