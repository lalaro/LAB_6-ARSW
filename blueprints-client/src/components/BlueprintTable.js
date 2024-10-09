import React from 'react';

const BlueprintTable = ({ blueprints }) => {
  return (
    <table id="blueprintsTable">
      <thead>
        <tr>
          <th>Nombre del plano</th>
          <th>Número de puntos</th>
        </tr>
      </thead>
      <tbody>
        {blueprints.length === 0 ? (
          <tr>
            <td colSpan="2">No hay planos disponibles.</td>
          </tr>
        ) : (
          blueprints.map((blueprint, index) => (
            <tr key={index}>
              <td>{blueprint.name}</td>
              <td>{blueprint.points}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BlueprintTable;
