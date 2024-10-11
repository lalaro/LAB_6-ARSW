import React from 'react';

const BlueprintTable = ({ blueprints, onOpen }) => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Autor</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Puntos</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {blueprints.map((blueprint, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{blueprint.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{blueprint.author}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{blueprint.points.length}</td> {/* Muestra el total de puntos */}
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <button onClick={() => onOpen(blueprint)}>Ver Plano</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlueprintTable;
