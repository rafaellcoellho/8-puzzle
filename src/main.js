'use strict';

let Graph = require("graph-data-structure");

let initialBoard = [[0,2,3],[1,4,5],[7,8,6]];
let objectiveBoard = [[1,2,3],[4,5,6],[7,8,0]];

function boardToString (board) {
    let boardStr = '';
    for (let i=0;i<3;i++) {
        for (let j=0;j<3;j++) {
            boardStr += board[i][j].toString();
            // If is the last number, don't put comma
            if ( !((i == 2) && (j == 2)) ){
                boardStr += ',';
            }
        }
    }
    return boardStr;
}

function stringToBoard (string) {
    return [
        [ parseInt(string[0]),parseInt(string[2]),parseInt(string[4]) ],
        [ parseInt(string[6]),parseInt(string[8]),parseInt(string[10]) ],
        [ parseInt(string[12]),parseInt(string[14]),parseInt(string[16]) ]
    ];
}

function findIndex (board, number) {
    let index = {
        x : 0,
        y : 0
    };
    for (index.x=0;index.x<3;index.x++) {
        index.y = board[index.x].indexOf(number);
        if (index.y != -1) {
            break;
        }
    }
    return index;
}

function expandGraph (board, graph) {
    let auxBoard,i,j,aux;
    
    aux = findIndex(board, 0);
    i = aux.x;
    j = aux.y;
    
    auxBoard = board.map((arr) => {  return arr.slice(); });
    // Check if possible move the 0 Right
    if (j < 2) {
        auxBoard[i][j] = auxBoard[i][j+1];
        auxBoard[i][j+1] = 0;
        graph.addEdge(boardToString(board), boardToString(auxBoard));
    }

    auxBoard = board.map((arr) => {  return arr.slice(); });
    // Check if possible move the 0 Down
    if (i < 2) {
        auxBoard[i][j] = auxBoard[i+1][j];
        auxBoard[i+1][j] = 0;
        graph.addEdge(boardToString(board), boardToString(auxBoard));
    }

    auxBoard = board.map((arr) => {  return arr.slice(); });
    // Check if possible move the 0 Left
    if (j > 0) {
        auxBoard[i][j] = auxBoard[i][j-1];
        auxBoard[i][j-1] = 0;
        graph.addEdge(boardToString(board), boardToString(auxBoard));
    }

    auxBoard = board.map((arr) => {  return arr.slice(); });
    // Check if possible move the 0 Up
    if (i > 0) {
        auxBoard[i][j] = auxBoard[i-1][j];
        auxBoard[i-1][j] = 0;
        graph.addEdge(boardToString(board), boardToString(auxBoard));
    }
}

function manhattanDistance (board, number) {
    let x1,y1,x2,y2,aux;

    aux = findIndex(board, number);
    x1 = aux.x;
    y1 = aux.y;

    aux = findIndex(objectiveBoard, number);
    x2 = aux.x;
    y2 = aux.y;

    return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
}

function heuristic (board) { 
    let sum = 0;
    for (let i=1; i<9; i++) {
        sum += manhattanDistance(board, i);
    }
    return sum;
}

function breadthFirstSearch (initial,final) {
    let current;
    let numNodes = 0;

    let first = boardToString(initial)
    let goal = boardToString(final);

    let graph = Graph()
        .addNode( first );

    let queue = [];
    queue.push( first );

    let cameFrom = {};
    cameFrom[ first ] = null;

    while(queue.length) {
        current = queue.shift();
        numNodes++;
        if ( current === goal) {
            break;
        }
        expandGraph( stringToBoard(current), graph );
        let edges = graph.adjacent(current);
        for (let i=0; i < edges.length; i++) {
            if ( !cameFrom.hasOwnProperty(edges[i]) ) {
                queue.push(edges[i]);
                cameFrom[edges[i]] = current;
            }
        }
    }

    current = goal;
    let path = [];
    while ( current != first ) {
        path.push(current);
        current = cameFrom[current];
    }
    path.push(first);
    path.reverse();
    console.log(numNodes);
    return path;
}

function greedySearch (initial, final) {
    let current;
    let numNodes = 0;
    
    let first = boardToString(initial);
    let goal = boardToString(final);

    let graph = Graph()
        .addNode( first );

    let queue = [];
    queue.push( first );

    let cameFrom = {};
    cameFrom[ first ] = null;

    while (queue.length) {
        current = queue.shift();
        numNodes++;
        if ( current === goal) {
            break;
        }
        expandGraph( stringToBoard(current), graph );
        let edges = graph.adjacent(current);
        edges.sort((a,b) => {
            let heuristicA = heuristic( stringToBoard(a) );
            let heuristicB = heuristic( stringToBoard(b) );
            return heuristicB-heuristicA;
        });
        for (let i=0; i < edges.length; i++) {
            if ( !cameFrom.hasOwnProperty(edges[i]) ) {
                queue.unshift(edges[i]);
                cameFrom[edges[i]] = current;
            }
        }
    }

    current = goal;
    let path = [];
    while ( current != first ) {
        path.push(current);
        current = cameFrom[current];
    }
    path.push(first);
    path.reverse();
    console.log("N of nodes visited: " + numNodes);
    return path;
}

console.log("8-puzzle Problem");
console.log( greedySearch(initialBoard, objectiveBoard) );


