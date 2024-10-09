import React from 'react';

const BlueprintTable = ({ blueprints, onOpen }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Autor</th>
          <th>Puntos</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {blueprints.map((blueprint) => (
          <tr key={blueprint.name}>
            <td>{blueprint.name}</td>
            <td>{blueprint.author}</td>
            <td>{blueprint.points.length}</td>
            <td>
              <button onClick={() => onOpen(blueprint)}>Abrir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlueprintTable;
