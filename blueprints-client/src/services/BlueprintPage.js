import React, { useState } from 'react';
import apiclient from './apiclient';

const BlueprintPage = () => {
  const [author, setAuthor] = useState('');
  const [blueprints, setBlueprints] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [error, setError] = useState('');

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleConsultClick = async () => {
    if (!author) {
      setError('Por favor, ingrese un autor.');
      return;
    }
    setError('');

    try {
      const fetchedBlueprints = await apiclient.getBlueprintsByAuthor(author);
      if (fetchedBlueprints.length === 0) {
        setBlueprints([]);
        setTotalPoints(0);
        setError('No se encontraron planos para este autor.');
        return;
      }

      const transformedBlueprints = fetchedBlueprints.map(blueprint => ({
        name: blueprint.name,
        points: blueprint.points.length,
      }));

      const total = transformedBlueprints.reduce((acc, blueprint) => acc + blueprint.points, 0);

      setBlueprints(transformedBlueprints);
      setTotalPoints(total);
    } catch (error) {
      console.error('Error al obtener los planos:', error);
      setError('Error al obtener los planos. Intente de nuevo más tarde.');
      setBlueprints([]);
      setTotalPoints(0);
    }
  };

  return (
    <div>
      <h1>Consulta de Planos</h1>
      <div>
        <label>Autor: </label>
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
        <button onClick={handleConsultClick}>Consultar Planos</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Planos de {author}</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Plano</th>
            <th>Número de Puntos</th>
          </tr>
        </thead>
        <tbody>
          {blueprints.map((blueprint, index) => (
            <tr key={index}>
              <td>{blueprint.name}</td>
              <td>{blueprint.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total de Puntos: {totalPoints}</h3>
    </div>
  );
};

export default BlueprintPage;
