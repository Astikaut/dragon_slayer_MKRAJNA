'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
var gameState;
var gameLevel;
var damagePoints;
/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

/********** ALÉATOIRE ********/
function throwDice(diceCount, diceSides)
{	
    let total = 0;
    for (let i = 0; i < diceCount; i++)
    {
        total += GetDes(1, diceSides);
        //console.log("le nombre diteration"+i+"somme"+total);
    }
    console.log("la somme finale " + total);
    return total;
}
/***************************************/


/******* POINT DE VIE *****************/
function initializeGame(level)
{	
    gameState = new Object();
    gameState.round = 1;
    gameState.level = GetLavel('donnée le niveau: /n 1.facile /n 2.moyenne /n 3.déficile', 1, 3);
    if (gameState.level == 1)
    {
        gameState.dragonHealth = 100 + throwDice(5, 10);
        gameState.playerHealth = 100 + throwDice(10, 10);
    }
    else if (gameState.level == 2)
    {
        gameState.dragonHealth = 100 + throwDice(10, 10);
        gameState.playerHealth = 100 + throwDice(10, 10);
    }
    else if (gameState.level == 3)
    {
        gameState.dragonHealth = 100 + throwDice(10, 10);
        gameState.playerHealth = 100 + throwDice(7, 10);
    }
    gameState.dragonInitialHealth = gameState.dragonHealth;
    gameState.playerInitialHealth = gameState.playerHealth;
    console.log('le pv de dragon ' + gameState.dragonHealth + ' le pv de player ' + gameState.playerHealth);
}
/****************************************************/



/******** AFFICHAGE ***********/
function displayGameState(playerHealth, dragonHealth)
{	
    document.write('<div class="game-state">');
    
    // Chevalier
    document.write('<figure class="game-state_player">');
    if (gameState.playerHealth > 0)
    {
        // Vérification des PV du joueur
        let playerImage = gameState.playerHealth <= 0.3 * gameState.playerInitialHealth ? 'knight-wounded.png' : 'knight.png';
        document.write('<img src="images/' + playerImage + '" alt="Chevalier">');
        document.write('<figcaption>' + gameState.playerHealth + ' PV</figcaption>');
        
        // Jauge de points de vie du joueur
        let playerHealthPercentage = (gameState.playerHealth / gameState.playerInitialHealth) * 100;
        document.write('<div class="health-bar"><div class="health-bar_fill" style="width:' + playerHealthPercentage + '%;"></div></div>');
    }
    else 
    {
        document.write('<img src="images/knight-wounded.png" alt="Chevalier">');
        document.write('<figcaption>GAME OVER</figcaption>');
    }
    document.write('</figure>');

    // Dragon
    document.write('<figure class="game-state_player">');
    if (gameState.dragonHealth > 0) 
    {
        // Vérification des PV du dragon
        let dragonImage = gameState.dragonHealth <= 0.3 * gameState.dragonInitialHealth ? 'dragon-wounded.png' : 'dragon.png';
        document.write('<img src="images/' + dragonImage + '" alt="Dragon">');
        document.write('<figcaption>' + gameState.dragonHealth + ' PV</figcaption>');
        
        // Jauge de points de vie du dragon
        let dragonHealthPercentage = (gameState.dragonHealth / gameState.dragonInitialHealth) * 100;
        document.write('<div class="health-bar"><div class="health-bar_fill" style="width:' + dragonHealthPercentage + '%;"></div></div>');
    }
    else 
    { 	
        document.write('<img src="images/dragon-wounded.png" alt="Dragon">');
        document.write('<figcaption>GAME OVER</figcaption>');
    }
    document.write('</figure>');

    document.write('</div>');
}


function displayRound()
{	
    document.write('<h3>Tour n°' + gameState.round + '</h3>');
    document.write('<figure class="game-round">');

    if (determineAttacker() == false)
    { 
        document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
        document.write('<figcaption>Le dragon prend l"initiative, vous attaque et vous inflige! ' + damagePoints + ' points de dommage !</figcaption>');
    }
    else
    {
        document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
        document.write('<figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez! ' + damagePoints + ' points de dommage !</figcaption>');
    }
    document.write('</figure>');
    displayGameState();
}


function gameLoop()
{	
    while (gameState.playerHealth > 0 && gameState.dragonHealth > 0)
    {
        let attack = determineAttacker();
        damagePoints = calculateDamage(attack);
        displayRound(attack);
        gameState.round++;
    }
    
}


/*********************************/


/*********** QUI ATTACK LE PREMIER **************/
function determineAttacker()
{	
    var result;
    var dragonRoll = throwDice(10, 6);
    var playerRoll = throwDice(10, 6);
    if (playerRoll < dragonRoll)
    {
        result = false;
    }
    else 
    {
        result = true;
    }
    console.log(result);

	return result;
}
/**************************************************/




/******** CALCUL POINT DE DAMAGE DE PLAYER ET DRAGON ********************/
function calculateDamage()
{	
    damagePoints;
    if (determineAttacker() == false)
    {
        damagePoints = calculateDragonDamage();
        gameState.playerHealth -= damagePoints;
    }
    else
    {
        damagePoints = calculatePlayerDamage();
        gameState.dragonHealth -= damagePoints;
    }
    console.log("Point de vie Dragon " + gameState.dragonHealth + " point de vie player " + gameState.playerHealth);
    return damagePoints;
}


/********** CALCUL POINT DE VIE PLAYER **********************************/
function calculatePlayerDamage()
{    
    damagePoints = throwDice(3, 6);
    switch (gameState.level)
    {
        case 1: 
            damagePoints = Math.round(damagePoints + (damagePoints * throwDice(2, 6) / 100));
            break;
        case 3: 
            damagePoints = Math.round(damagePoints - (damagePoints * throwDice(1, 6) / 100));
            break;
    }
    console.log("pt de dommage player " + damagePoints);
    return damagePoints;
}

/***************************************************************/

/************** CALCUL POINT DE VIE DRAGON *********************/
function calculateDragonDamage()
{
    damagePoints = throwDice(3, 6);
    switch (gameState.level)
    {
        case 1: 
            damagePoints = Math.round(damagePoints - (damagePoints * throwDice(2, 6) / 100));
            break;
        case 3:
            damagePoints = Math.round(damagePoints + (damagePoints * throwDice(1, 6) / 100));
            break;
    }
    console.log("pt damage dragon " + damagePoints);
    return damagePoints;
}
/*********************************************************************/


/***************************** winner *****************/
function displayWinner()
{	
    if (gameState.dragonHealth > 0)
    {
        document.write('<footer><h3>Fin de la partie</h3><figure class="game-end"><figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption><img src="images/dragon-winner.png" alt="Dragon vainqueur"></figure></footer>');
    }
    else
    {
        document.write('<footer><h3>Fin de la partie</h3><figure class="game-end"><figcaption>Vous avez vaincu le dragon, vous êtes un héros</figcaption><img src="images/knight-winner.png" alt="Chevalier vainqueur"></figure></footer>');
    }
}





/***************************************************************************/

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
console.clear();
throwDice(5, 10);
initializeGame();
console.log(gameState.dragonHealth);
console.log(gameState.playerHealth);
displayGameState(gameState.dragonHealth, gameState.playerHealth);
GetDes();
let attack = determineAttacker();
calculateDamage(gameState.level, attack);

gameLoop();
displayWinner();


