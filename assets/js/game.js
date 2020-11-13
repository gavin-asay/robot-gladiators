var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Conditional Recursive Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
  }
  
    // if player picks "skip" confirm and then stop the loop
    if (promptFight.toLowerCase() === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.playerMoney = playerInfo.money - 10;
        return true;
      }
    } return false;
  }

var fight = function(enemy) {
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var playerTurn = function () {
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health left."
        );
    
        // check enemy's health
        if (enemy.health <=0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            console.log("playerInfo.money " + playerInfo.money);
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
    }

    // remove player's health by subtracting the amount set in the enemy.attack variable
    var enemyTurn = function() {
        var damage = randomNumber(enemy.attack -3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health left."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
            
    // repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                break;
            }
            playerTurn();
            enemyTurn();
            isPlayerTurn = false;
        } else {
            enemyTurn();
            if (fightOrSkip()) {
                break;
            }
            playerTurn();
            isPlayerTurn = true;
        }
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            };
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    } endGame();
}

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    debugger;
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
    
        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.")
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
]

// start the game when the page loads
startGame();