const mockBlueprints = [
  {
    author: "Valentina",
    name: "_bpname2_",
    points: [
      { x: 100, y: 100 },
      { x: 120, y: 130 },
      { x: 140, y: 160 },
      { x: 160, y: 190 }, // Punto adicional
      { x: 180, y: 220 }, // Punto adicional
    ],
  },
  {
    author: "Valentina",
    name: "_bpname3_",
    points: [
      { x: 50, y: 50 },
      { x: 70, y: 80 },
      { x: 90, y: 110 },
      { x: 110, y: 140 },
      { x: 130, y: 170 },
      { x: 150, y: 200 }, // Punto adicional
    ],
  },
  {
    author: "Laura",
    name: "_bpname2_",
    points: [
      { x: 100, y: 100 },
      { x: 120, y: 130 },
      { x: 140, y: 160 },
      { x: 160, y: 190 }, // Punto adicional
      { x: 180, y: 220 }, // Punto adicional
    ],
  },
  {
    author: "Juan",
    name: "_bpname3_",
    points: [
      { x: 60, y: 60 },
      { x: 80, y: 90 },
      { x: 100, y: 120 },
      { x: 120, y: 150 },
      { x: 140, y: 180 },
      { x: 160, y: 210 }, // Punto adicional
    ],
  },
];

export const getBlueprintsByAuthorMock = async (author) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blueprints = mockBlueprints.filter(
        (bp) => bp.author.toLowerCase() === author.toLowerCase()
      );
      resolve(blueprints);
    }, 500);
  });
};
