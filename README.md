# 8-Puzzle

This program solves the 8 puzzle. This is part of an exercise from computational intelligence class.

Puzzle: 

```
The 8-puzzle  is a sliding puzzle that consists of a frame of numbered square tiles in 
random order with one tile missing. The object of the puzzle is to place the tiles in 
order by making sliding moves that use the empty space. The n-puzzle is a classical problem 
for modelling algorithms involving heuristics. 
```
<p align="center">
	<a href="">
		<img alt="puzzle" src="./puzzle.png" width="200px">
	</a>
</p>

## How to run

Just install nodejs and run:

```
$ npm i
$ node src/main.js
```

## Example 

Inicial State:

```javascript
let initialBoard = [[0,2,3],[1,4,5],[7,8,6]];
```

Final State:

```javascript
let objectiveBoard = [[1,2,3],[4,5,6],[7,8,0]];
```

Output: 

```
8-puzzle Problem
N of nodes visited: 5
[ '0,2,3,1,4,5,7,8,6',
  '1,2,3,0,4,5,7,8,6',
  '1,2,3,4,0,5,7,8,6',
  '1,2,3,4,5,0,7,8,6',
  '1,2,3,4,5,6,7,8,0' ]
```
