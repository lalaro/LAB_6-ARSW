import '../css/BlueprintsList.css';
import React, { useState } from 'react';
import { getBlueprintsByAuthor } from '../services/apiService';
import BlueprintTable from './BlueprintTable';
import BlueprintCanvas from './BlueprintCanvas';

const BlueprintsList = () => {
  const [author, setAuthor] = useState('');
  const [blueprints, setBlueprints] = useState([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);
  const [error, setError] = useState(null);

  const fetchBlueprints = async () => {
    setError(null);
    try {
      const data = await getBlueprintsByAuthor(author);
      if (data.length === 0) {
        setError('No se encontraron planos para este autor');
      } else {
        setBlueprints(data);
      }
    } catch (err) {
      setError('Error al obtener los planos');
      setBlueprints([]);
    }
  };

  const openBlueprint = (blueprint) => {
    console.log('Plano seleccionado:', blueprint);
    setSelectedBlueprint(blueprint);
  };

  const totalPoints = blueprints.reduce((acc, blueprint) => acc + blueprint.points.length, 0);

  return (
    <div>
      <h1>Blueprints</h1>
      <input
        type="text"
        placeholder="Ingrese el autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={fetchBlueprints}>Get Blueprints</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {blueprints.length > 0 && (
        <>
          <h2>Autor seleccionado: {author}</h2>
          <BlueprintTable blueprints={blueprints} onOpen={openBlueprint} />
          <h3>Total de puntos: {totalPoints}</h3>
        </>
      )}

      {selectedBlueprint && <BlueprintCanvas blueprint={selectedBlueprint} />}
    </div>
  );
};

export default BlueprintsList;
