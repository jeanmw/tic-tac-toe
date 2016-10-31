$(document).ready(function() {

//all boxes
  var $boxes = $('.box');

//assume start with x
  var turn = "x";

  function resetBoard() {
    $boxes.text("");
    $boxes.removeClass("x");
    $boxes.removeClass("o");

    // reset
    turn = "x";
  };

  function changeTurn() {
    if (turn === "x") {
      turn = "o";
    } else {
      turn = "x";
    }
  };


  function allThree($firstBox, $secondBox, $thirdBox) {
   var firstBoxOwner = $firstBox.text(),
        secondBoxOwner = $secondBox.text(),
        thirdBoxOwner = $thirdBox.text();

    if ((firstBoxOwner === secondBoxOwner) && (secondBoxOwner === thirdBoxOwner)){
      if (firstBoxOwner === "x"){
        return "x";
      } else if (firstBoxOwner === "o"){
        return "o";
      }
    }
    return null;
  };

  function isColumnarWin() {
    var leftCol = allThree($boxes.eq(0), $boxes.eq(3), $boxes.eq(6));
    var middleCol = allThree($boxes.eq(1), $boxes.eq(4), $boxes.eq(7));
    var rightCol = allThree($boxes.eq(2), $boxes.eq(5), $boxes.eq(8));

    return leftCol || (middleCol || rightCol);
  };

  function isRowWin() {
    var topRow = allThree($boxes.eq(0), $boxes.eq(1), $boxes.eq(2));
    var middleRow = allThree($boxes.eq(3), $boxes.eq(4), $boxes.eq(5));
    var bottomRow = allThree($boxes.eq(6), $boxes.eq(7), $boxes.eq(8));

    return topRow || (middleRow || bottomRow);
  };

  function isDiagonalWin() {
    var leftDownDiag = allThree($boxes.eq(0), $boxes.eq(4), $boxes.eq(8));
    var rightUpDiag = allThree($boxes.eq(2), $boxes.eq(4), $boxes.eq(6));
    return leftDownDiag || rightUpDiag;
  };

  // helper function to check for winner
  function getWinner() {
    return  (isRowWin() || isColumnarWin()) || isDiagonalWin();
  };

  // check if empty boxes exist
  function possiblePlaysLeft() {
    var hasEmptyBoxes = false;
    for (var i=0; i<$boxes.length; i++){
      if ($boxes.eq(i).text() === ''){
        hasEmptyBoxes = true;
      }
    }
    return hasEmptyBoxes;
  }

  /* Event Listenters Here*/

  $('#reset').on('click', function() {
    resetBoard();
  });

  $boxes.on('click', function() {
    if ($(this).text() === "") {
      $(this).text(turn);
      $(this).addClass(turn);


      // check for wins
      var winner = getWinner();
      if (winner) {
        alert(winner + " has won the game!");
        resetBoard();
      } else if (possiblePlaysLeft()) {
        changeTurn();
      } else {
        alert("Blarg, a tie.");
        resetBoard();
      }
    }
  });

});
