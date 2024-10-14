import { getBlueprintsByAuthor } from './apiService';
import { getBlueprintsByAuthorMock } from './apimock';
import $ from 'jquery';

const AppModule = (() => {
  // Estado privado
  let state = {
    selectedAuthor: '',
    blueprints: [],
    error: null,
    useMock: false,
  };

  const subscribers = [];

  const notify = () => {
    subscribers.forEach(callback => callback(getState()));
  };

  const getState = () => ({ ...state });

  const setSelectedAuthor = (author) => {
    state.selectedAuthor = author;
    notify();
  };

  const setBlueprints = (blueprints) => {
    state.blueprints = blueprints;
    notify();
  };

  const setError = (error) => {
    state.error = error;
    notify();
  };

  const toggleMock = () => {
    state.useMock = !state.useMock;
    notify();
  };

  // Seleccionar la función según el estado de useMock
  const getBlueprintsFunction = () => (state.useMock ? getBlueprintsByAuthorMock : getBlueprintsByAuthor);

  const changeSelectedAuthor = (newAuthor) => {
    setSelectedAuthor(newAuthor);
  };

  const fetchBlueprints = async () => {
    setError(null);
    try {
      const data = await getBlueprintsFunction()(state.selectedAuthor); // Llama a la función seleccionada
      if (data.length === 0) {
        setError('No se encontraron planos para este autor');
        setBlueprints([]);
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
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  const updateBlueprints = (authorName) => {
    getBlueprintsFunction()(authorName, (blueprints) => {
      const transformedBlueprints = blueprints.map(bp => ({
        name: bp.name,
        numberOfPoints: bp.points.length,
      }));

      // Limpiar la tabla antes de agregar nuevos planos
      $('table#blueprints-table tbody').empty();

      transformedBlueprints.forEach(bp => {
        $('table#blueprints-table tbody').append(`
          <tr>
            <td>${bp.name}</td>
            <td>${bp.numberOfPoints}</td>
          </tr>
        `);
      });
      const totalPoints = transformedBlueprints.reduce((acc, bp) => acc + bp.numberOfPoints, 0);
      $('#total-points').text(totalPoints);
    });
  };

  const drawBlueprintPoints = async (author, blueprintName) => {
    try {
      const blueprint = await getBlueprintsFunction()(author, blueprintName);
      const points = blueprint.points;

      const canvas = document.getElementById('blueprintCanvas');
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
      const totalPoints = points.length;
      $('#total-points').text(`Total de Puntos: ${totalPoints}`);
    } catch (error) {
      console.error('Error al dibujar los puntos:', error);
      setError('Error al dibujar los puntos');
    }
  };

  return {
    getState,
    changeSelectedAuthor,
    fetchBlueprints,
    openBlueprint,
    toggleMock,
    subscribe,
    updateBlueprints,
    drawBlueprintPoints,
  };
})();

export default AppModule;
