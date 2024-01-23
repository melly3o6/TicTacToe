"use strict";

let player = "X";

document.getElementById("container").addEventListener("click", event => fieldClicked(event.target.id));
document.addEventListener("keydown", restartOnKeyPress);

function fieldClicked(fieldId) {

    if (isFieldSet(fieldId) || isGameFinished()) {
        return;
    }

    const fieldElement = document.getElementById(fieldId);
    fieldElement.innerText = player;
    fieldElement.classList.add(player.toLowerCase());

    if (checkForWinner(player)) {
        endGame("PLAYER " + player + " WON!");
    } else if (checkForGameOver()) {
        endGame("GAME OVER");
    } else {
        changePlayer();
    }   
}

function getFieldContent(fieldId) {
    return document.getElementById(fieldId).innerText
}

function isFieldSet(fieldId) {
   return getFieldContent(fieldId) !== "";
}

function changePlayer() {
    player = (player === "X") ? "O" : "X";
}

function checkForWinner(player) {
    return checkForWinningRow("11", "12", "13", player) ||
        checkForWinningRow("21", "22", "23", player) ||
        checkForWinningRow("31", "32", "33", player) ||

        checkForWinningRow("11", "21", "31", player) ||
        checkForWinningRow("12", "22", "32", player) ||
        checkForWinningRow("13", "23", "33", player) ||

        checkForWinningRow("11", "22", "33", player) ||
        checkForWinningRow("13", "22", "31", player);
}


function checkForWinningRow(fieldId1, fieldId2, fieldId3, player) {
    return getFieldContent(fieldId1) === getFieldContent(fieldId2) && 
        getFieldContent(fieldId2) === getFieldContent(fieldId3) && 
        getFieldContent(fieldId1) === player;
}

function checkForGameOver() {
    return isFieldSet("11") && isFieldSet("12") && isFieldSet("13") &&
        isFieldSet("21") && isFieldSet("22") && isFieldSet("23") &&
        isFieldSet("31") && isFieldSet("32") && isFieldSet("33");
}

function isGameFinished() {
    return document.getElementById("messageBox").innerText !== "";
}

function restartOnKeyPress() {
    if (isGameFinished()) {
        restartGame();
    }
}

function restartGame() {
    clearBoard();
    resetPlayer();
    clearMessage();
    hideRestartMessage();
}

function clearBoard() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            const fieldId = i.toString() + j.toString();
            const fieldElement = document.getElementById(fieldId);
            fieldElement.innerText = "";
            fieldElement.classList.remove("x", "o");
        }
    }
}

function resetPlayer() {
    player = "X";
}

function clearMessage() {
    document.getElementById("messageBox").innerText = "";
}

function endGame(message) {
    document.getElementById("messageBox").innerText = message;
    showRestartMessage();
}

function showRestartMessage() {
    document.getElementById("restartMessage").style.display = "block";
}

function hideRestartMessage() {
    document.getElementById("restartMessage").style.display = "none";
}