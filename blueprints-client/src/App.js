import React, { useState } from 'react';
import BlueprintTable from './components/BlueprintTable';
import { getBlueprintsByAuthor } from './services/apiService';

const App = () => {
  const [author, setAuthor] = useState('');
  const [blueprints, setBlueprints] = useState([]);

  const fetchBlueprints = async () => {
    const data = await getBlueprintsByAuthor(author);
    setBlueprints(data);
  };

  return (
    <div>
      <h1>BluePrints</h1>
      <input
        type="text"
        placeholder="Ingrese el autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={fetchBlueprints}>Get Blueprints</button>

      <h2>Autor seleccionado: {author}</h2>
      <BlueprintTable blueprints={blueprints} />

      <h3>Total de puntos: {blueprints.reduce((acc, blueprint) => acc + blueprint.points, 0)}</h3>
    </div>
  );
};

export default App;
