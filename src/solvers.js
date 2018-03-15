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













// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;
  

//   var Tree = function(index) {
//     var newTree = {}
//     newTree.children = [];
//     newTree.loc = index;
//     newTree.addChild = treeMethods.addChild;
//     newTree.traverse = treeMethods.traverse;
//     return newTree;  
//   }
//   var treeMethods = {};
  
//   treeMethods.addChild = function(index) {
//     var node = new Tree(index);
//     this.children.push(node);
//   }
//   treeMethods.traverse = function() {
//     var node = this;
    
//     var searchChildren = function(node) {
//       console.log(node);
      
//       if (node.children) {
//         for (var i = 0; i < node.children.length; i++) {
//           searchChildren(node.children[i]);
//         }
//       }    
//     }
//     searchChildren(node);
//   }

  
//   var board = new Board({n:4}).rows();
//   var solutionTree = new Tree();

//   for (var i = 0; i < board.length; i++) {
//     for (var x = 0; x < board.length; i++) {
      
//     }
//     solutionTree.addChild([0, i]);
//   }
  
  
  
  

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };


window.countNRooksSolutions = function(n) {
  var solutions = 0;
  var board = new Board({n:n});
  var check = function(board, row) {
    if (row === board.rows().length) {
      solutions++;
    }
    console.log(board.attributes[row].length)
    for (var i = 0; i < board.attributes[row].length; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        check(board, row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  check(board, 0);
  return solutions;
}




































// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
