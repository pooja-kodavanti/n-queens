/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  solution.togglePiece(0, 0);
  for (var i = 1; i < solution.attributes.n; i++) {
    for (var x = 1; x < solution.attributes.n; x++) {
      solution.togglePiece(i, x);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, x);
      }
    }
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

window.countNRooksSolutions = function(n) {
  var solutions = 0;
  var board = new Board({n:n});
  

  var check = function(row) {
    if (row === n) {
      solutions++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasColConflictAt(col)) {
        check(row + 1);
      }
      board.togglePiece(row, col);
    }
  };

  check(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  return solutions;
}



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var board = new Board({n:n});
  // if (n === 2 || n === 3) {
  //   return board.rows();
  // }
  // var check = function()
  // console.log('Number of solutions for ' + n + ' queens:', board.rows());
  // return board.rows();
  
  if (n === 2 || n === 3) {
    var board = new Board({n:n});
    return board.rows();
  }
  
  if (n === 1) {
    var board = new Board({n:1});
    board.togglePiece(0, 0);
    console.log('Number of solutions for ' + n + ' queens:', board.rows());
    return board.rows();
  }
  
  var colLoc = function(n) {
    var choices = [];
    for (var i = 0; i < n; i++) {
      choices.push(i);
    }
    var sequences = [];
    
    var recurse = function(rowsToGo, seq) {
      if(rowsToGo === 0) {
        sequences.push(seq);
        return;
      }
      for(var i = 0; i < choices.length; i++) {
        if(!seq.includes(choices[i])) {
          recurse(rowsToGo - 1, seq.concat(choices[i]));
        }
      }
    }
    recurse(n, []);
    
    return sequences;
  }
  
  var sequences = colLoc(n);
  // console.log(sequences);
  
  var buildBoards = function(sequences, n) {
    var boards = [];
    for (var i = 0; i < sequences.length; i++) {
      boards.push([]);
    }
    
    for (var i = 0; i < sequences.length; i++) {
      for (var x = 0; x < sequences[i].length; x++) {
        boards[i].push([x, sequences[i][x]]);
      }
    }
    return boards;
  }
  
  var boards = buildBoards(sequences, n);
  
  var testBoards = function(boards) {
    var foundValidBoard = false;
    var validBoard;
    var currentIndex = 0;
    while (!foundValidBoard && currentIndex < boards.length) {
      var board = new Board({n:boards[currentIndex].length});
      for (var i = 0; i < boards[currentIndex].length; i++) {
        board.togglePiece(boards[currentIndex][i][0], boards[currentIndex][i][1]);
      }
      if (!board.hasAnyQueensConflicts()) {
        validBoard = board.rows();
        foundValidBoard = true;
      }
      currentIndex++;
    }
    return validBoard;
  }
  
  var board = testBoards(boards);
  
  console.log('Number of solutions for ' + n + ' queens:', board);
  // console.log(board.rows());
  return board;
  
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = 0;
  var board = new Board({n:n});
  
  if (n === 2|| n === 3) {
    return solutions;
  } 
  var check = function(row) {
    if (row === n) {
      solutions++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        check(row + 1);
      }
      board.togglePiece(row, col);
    }
  };
  check(0);
  console.log('Number of solutions for ' + n + ' queens:', solutions);
  return solutions;
};
