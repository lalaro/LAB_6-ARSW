import React, { useState, useEffect } from 'react';
import '../css/BlueprintsList.css';
import BlueprintTable from './BlueprintTable';
import BlueprintCanvas from './BlueprintCanvas';
import AppModule from '../services/app';

const BlueprintsList = () => {
  const [authorInput, setAuthorInput] = useState('');
  const [blueprints, setBlueprints] = useState([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    const handleStateChange = (newState) => {
      setBlueprints(newState.blueprints);
      setError(newState.error);
      setUseMock(newState.useMock);
    };

    const unsubscribe = AppModule.subscribe(handleStateChange);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleGetBlueprints = async () => {
    AppModule.changeSelectedAuthor(authorInput);
    await AppModule.fetchBlueprints();
  };

  const handleOpenBlueprint = (blueprint) => {
    setSelectedBlueprint(blueprint);
    AppModule.openBlueprint(blueprint);
  };

  const handleToggleMock = () => {
    AppModule.toggleMock();
  };

  const totalPoints = blueprints.reduce((acc, blueprint) => acc + blueprint.points.length, 0);

  return (
    <div className="container mt-4">
      <h1>Blueprints</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el autor"
          value={authorInput}
          onChange={(e) => setAuthorInput(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleGetBlueprints}>Get Blueprints</button>
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            checked={useMock}
            onChange={handleToggleMock}
          />
          Usar Datos Mock
        </label>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {blueprints.length > 0 && (
        <>
          <h2>Autor seleccionado: {AppModule.getState().selectedAuthor}</h2>
          <BlueprintTable blueprints={blueprints} onOpen={handleOpenBlueprint} />
          <h3>Total de puntos: {totalPoints}</h3>
        </>
      )}

      {selectedBlueprint && <BlueprintCanvas blueprint={selectedBlueprint} />}
    </div>
  );
};

export default BlueprintsList;
