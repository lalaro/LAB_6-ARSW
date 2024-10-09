// src/components/BlueprintsList.js

import React, { useState } from 'react';
import { getBlueprintsByAuthor } from '../services/apiService';
import BlueprintTable from './BlueprintTable';

const BlueprintsList = () => {
  const [author, setAuthor] = useState('');
  const [blueprints, setBlueprints] = useState([]);
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
    alert(`Abriendo el plano: ${blueprint.name}`);
    // Manejar la apertura del plano aquí
  };

  const totalPoints = blueprints.reduce((acc, blueprint) => acc + blueprint.points.length, 0); // Asumiendo que points es un array

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

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar el error si existe */}

      {blueprints.length > 0 && (
        <>
          <h2>Autor seleccionado: {author}</h2>
          <BlueprintTable blueprints={blueprints} onOpen={openBlueprint} />
          <h3>Total de puntos: {totalPoints}</h3>
        </>
      )}
    </div>
  );
};

export default BlueprintsList;
