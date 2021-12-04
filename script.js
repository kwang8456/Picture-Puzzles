/*
* start the board and display the numbers 
*/
function initialize (str)
{
    if (str == 'cat')
    {
        arr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg"];
        pic = 1;
    }
    else if (str == 'penguin')
    {
        arr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg"];
        pic = 2;
    }
    resetBoard ();
    numMoves = 0;
    document.getElementById ("comments").innerHTML = "Click on the Start Button to Shuffle the Puzzle";
    display ();
}
/*
* swap the value/position of two different element
*/
function swap (i, j)
{
    //console.log (i);
    //console.log (j);
    //console.log (document.getElementById("" + i));
    tempObject = document.getElementById("" + i).innerHTML;
    document.getElementById ("" + i).innerHTML = document.getElementById("" + j).innerHTML;
    document.getElementById ("" + j).innerHTML = tempObject;
    numMoves++;
    canReset = true;
    display ();
    checkIfComplete ();
}

/*
* check if the element at position (r,c) can be swap to another position
*/
function change (num)
{
    //Check
    console.log (num);
    if (!win)
    {
        var current = num;
        if (previous == "")
        {
            previous = current;
            document.getElementById(current).style.borderColor = "red";
            document.getElementById(current).style.borderRadius = "3pv";
        }
        else if (previous == current)
        {
            document.getElementById(previous).style.borderColor = "rgb(72, 229, 240)";
            previous = "";
        }
        else if (previous != current) 
        {
            document.getElementById(previous).style.borderColor = "rgb(72, 229, 240)";
            swap (previous, current);
            previous = "";
        }
    }
}

/*
* check if the board is complete and all the pieces are in order
*/
function checkIfComplete ()
{
    //console.log (isShuffled);
    if (isShuffled)
    {
        for (var i = 1; i < 17; i++)
        {
            //console.log (document.getElementById ("" + i).innerHTML == ("<img src = Images/Pieces/" + arr[num] + ">"));
            console.log (document.getElementById ("" + i).innerHTML == "<img src=\"Images/" + pic + "/" + arr[i - 1] + "\">");
            if (document.getElementById ("" + i).innerHTML != "<img src=\"Images/" + pic + "/" + arr[i - 1] + "\">")
            {
                boardSolved = false;
                break;
            }
        }
        //console.log (boardSolved);
        if (boardSolved)
        {
            document.getElementById ("comments").innerHTML = "You won! <br/> You Moved " + numMoves + " Time(s). <br/> Click Start to Shuffle Again.";
            win = true;
        }
        boardSolved = true;
    }
} 

/*
* shuffle the board
*/
function shuffle ()
{
    var i = 0;
    while (numMoves < 1000)
    {
        swap ((parseInt (Math.random () * 16) + 1), (parseInt (Math.random () * 16) + 1));
    }
    numMoves = 0;
    isShuffled = true;
    display (); 
}

/*
* start the game and shuffle the board
*/
function start ()
{
    if (previous != "")
    {
        document.getElementById(previous).style.borderColor = "black";
        previous = "";
    }
    shuffle ();
    document.getElementById ("comments").innerHTML = "The Puzzle has been shuffled 1000 times. <br/> Good Luck and Have Fun! <br/> Click the Reset button to Reset the board";
}

/*
* resets the board to its original position
*/
function resetBoard ()
{
    for (var i = 1; i < 17; i++)
    {
        //temp = "<img src =\"Images/Pieces/" + i + ".jpg\">";
        //console.log(temp == "<img src =\"Images/Pieces/" + i + ".jpg\">")
        document.getElementById ("" + i).innerHTML = "<img src=\"Images/" + pic + "/" + arr[i - 1] + "\">";
        //document.getElementById("" + i).innerHTML = "<img src=\"Images/Pieces/" + i + ".jpg\">";
        //console.log (document.getElementById ("" + i).innerHTML);
        //document.getElementById("" + i).innerHTML = "<img src = \"Images/Pieces/" + arr[i - 1] + "\">";
        //console.log (document.getElementById("" + i).innerHTML == "<img src=\"Images/Pieces/" + i + ".jpg\">");
        console.log (document.getElementById ("" + i).innerHTML == "<img src=\"Images/" + pic + "/" + arr[i - 1] + "\">");
    }
    boardSolved = true;
    win = false;
    isShuffled = false;
    canReset = false;
    previous = "";
}

/*
* checks if the board can be reset
*/
function reset ()
{
    if (canReset)
    {
        resetBoard ();
        document.getElementById ("comments").innerHTML = "The Board has been Reset. <br/> Press Start to Shuffle.";
    }
}

/*
* display the number of moves of the player
*/
function display ()
{
    document.getElementById ("move").innerHTML = numMoves;
}