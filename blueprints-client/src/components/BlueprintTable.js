import React from 'react';

const BlueprintTable = ({ blueprints, onOpen }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Autor</th>
          <th>Puntos</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {blueprints.map((blueprint, index) => (
          <tr key={index}>
            <td>{blueprint.name}</td>
            <td>{blueprint.author}</td>
            <td>{blueprint.points.length}</td> {/* Accede correctamente a points.length */}
            <td>
              <button className="btn btn-secondary" onClick={() => onOpen(blueprint)}>Ver Plano</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlueprintTable;
