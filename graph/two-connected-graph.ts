const graph1 = [
  [1, 2, 3],
  [0, 2],
  [0, 1],
  [0, 4, 5],
  [3, 5],
  [3, 4],
];

// graph1-to-comments
// (1)---(0)    (5)---(4)
//  \     |\     |     /
//   \    | \    |    /
//    \   |  \   |   /
//     \  |   \  |  /
//      \ |    \ | /
//       \|     \|/
//       (2)    (3)

const graph2 = [
  [1, 2, 5],
  [0, 2],
  [0, 1, 3],
  [2, 4, 5],
  [3, 5],
  [0, 3, 4],
];

function twoEdgeConnectedGraph(edges) {
  if (edges.length === 0) return true;
  if (edges.length === 1 && edges[0].length === 0) return true;

  let result = true;

  const changeResult = () => {
    result = false;
  };

  const edgeSet = edges.map((vertice, i) => {
    return vertice.reduce((acc, edge) => {
      return { ...acc, [edge]: edge };
    }, {});
  });

  const haveConnectionBack = (edge, i, count) => {
    if (count > edge.length - 1) return true;
    if (edgeSet[edge[count]][i] === i)
      return haveConnectionBack(edge, i, count + 1);
    else return changeResult();
  };

  for (let i = 0; i < edges.length; i++) {
    if (edges[i] <= 1) {
      changeResult();
      break;
    }
    if (!haveConnectionBack(edges[i], i, 0)) {
      changeResult();
      break;
    }
  }

  if (result) {
    if (!traverseGraphAndFindBridges(edges, 0, 0)) {
      changeResult("h3");
    }
  }

  return result;
}

const hasConnectionToVertice = (vertice, edges, actualVertice) => {
  let result = false;
  for (let i = actualVertice + 1; i < edges.length; i++) {
    const hasBackwardConnection = edges[i].find(
      (a) => a === vertice || a < actualVertice
    );
    if (hasBackwardConnection) {
      result = true;
      break;
    }
  }
  return result;
};

const traverseGraphAndFindBridges = (edges, vertice, edge, visited = []) => {
  if (!edges[vertice]) return false;
  if (!edges[vertice][edge])
    return traverseGraphAndFindBridges(edges, vertice + 1, 0, visited);
  if (visited[Number(`${vertice}${edge}`)])
    return traverseGraphAndFindBridges(edges, vertice, edge + 1, visited);
  visited.push(Number(`${vertice}${edge}`), Number(`${edge}${vertice}`));

  // to know if the edge is a bridge
  // I need to verify if I can reach the actual vertice
  // through the connections I have with the other vertices
  // with exeption of the vertice I originally came from

  const nextEdge = edges[vertice][edge];
  const nextVertice = edges[nextEdge];

  if (!nextVertice)
    return traverseGraphAndFindBridges(edges, vertice, edge + 1, visited);

  if (!hasConnectionToVertice(vertice, edges, nextEdge)) return true;

  return traverseGraphAndFindBridges(edges, vertice, edge + 1, visited);
};

// console.log(twoEdgeConnectedGraph(graph1));
console.log(
  traverseGraphAndFindBridges(
    [
      [1, 2, 5],
      [0, 2],
      [0, 1, 3],
      [2, 4, 5],
      [3, 5],
      [0, 3, 4],
    ],
    0,
    0
  )
);
