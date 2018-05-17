 "use strict"
 function diceGame(){

  let cha;
  let wis;
  let int;
  let con;
  let dex;
  let str;
  let armorClass;
  let bonusAttackRollDie;
  let meleeBonus;
  let numberOfHitDie;
  let meleeHitDie;
  let meleeWeapon;
  let hP;
  let cClass;
  let race;
  let bonusAttack;
  var halfElf = {
    race: "HalfElf",
    cClass: "Bard",
    hP: 10,
    meleeWeapon: "Rapier",
    meleeHitDie: 8,
    numberOfHitDie:1,
    meleeBonus:3,
    bonusAttackRollDie: 6,
    bonusAttack: 0,
    armorClass: 15,
    str: 8,
    dex: 16,
    con: 14,
    int: 12,
    wis: 10,
    cha: 16
  };
  var halfOrc = {
    race: "HalfOrc",
    cClass: "Paladin",
    hP: 12,
    meleeWeapon: "Halberd",
    meleeHitDie: 10,
    numberOfHitDie:1,
    meleeBonus:3,
    bonusAttackRollDie: 0,
    bonusAttack: 5,
    armorClass: 16,
    str: 16,
    dex: 10,
    con: 14,
    int: 8,
    wis: 12,
    cha: 15
  };
  var dwarf = {
    race: "Dwarf",
    cClass: "Cleric",
    hP: 11,
    meleeWeapon: "Warhammer",
    meleeHitDie: 8,
    numberOfHitDie:1,
    meleeBonus:2,
    bonusAttackRollDie: 0,
    bonusAttack: 4,
    armorClass: 18,
    str: 14,
    dex: 8,
    con: 15,
    int: 10,
    wis: 16,
    cha: 12
  };

  var dragonborn = {
    race: "Dragonborn",
    cClass: "Sorcerer",
    hP: 9,
    meleeWeapon: "Quarterstaff",
    meleeHitDie: 8,
    numberOfHitDie:1,
    meleeBonus:0,
    bonusAttackRollDie: 0,
    bonusAttack: 2,
    armorClass: 14,
    str: 16,
    dex: 10,
    con: 14,
    int: 8,
    wis: 12,
    cha: 15
  };
  let yourCharacter;
  let yourOpponent; 
  let characters = [halfElf, halfOrc, dwarf, dragonborn];
  let triggerOperator = -1;
  function rollDie(numberOfSides){
    if (numberOfSides === 0 || numberOfSides === 1){
      return numberOfSides;
    }
    else{
      let rollResult = Math.floor(Math.random() * numberOfSides) + 1;
      informUser("You rolled a D" + numberOfSides + " " + "resulting in" + " " + rollResult);  
      return rollResult;
    }
  }
  function informUser(text){
   alert(text);
   console.log(text);
 } 
 function determineEnemy(){
  yourOpponent =characters[rollDie(characters.length-1)];
} 
function changeStats(character){
  for(let trait in character){
    let traitVal = character[trait];
    if (!isNaN(traitVal)){
     character[trait] = rollDie(traitVal);
   }
 }
}

function nextTurn(trigger){
 triggerOperator *= trigger;
 if (triggerOperator > 0){
  informUser("Your hP is " + (yourCharacter.hP) +"===============Your opponet's hP is " + (yourOpponent.hP) + " Press Ok to attack.")
  return turnResult(yourCharacter,yourOpponent);
}
else{
  return turnResult(yourOpponent,yourCharacter);
}
}

function determineYourCharacter(){    
  function freechoice(){
    function createRaceList(objectArray){
      let raceArray = []; 
      for (let i=0; objectArray.length > i; i++ ){
        raceArray.push(objectArray[i].race);
      }
      return raceArray;
    }    
    function iterator(array){         
      let iterator = array.entries();
      let iterated1 = iterator.next().value;
      let iterated2 = iterator.next().value;
      let iterated3 = iterator.next().value;
      let iterated4 = iterator.next().value;
      let iterated = iterated1.concat(" | ",iterated2," | ", iterated3," | ", iterated4);
      return iterated;   
    }
    yourCharacter = characters[prompt("Free Choice! Choose a Character:" + " " + iterator(createRaceList(characters)), "(enter a number 0:" + (characters.length-1) +")")];
    informUser("You chose" + " " + yourCharacter["race"]);
  }  
  let characterRoll = rollDie(characters.length + 1);
  if (characterRoll === characters.length + 1){
    return freechoice();
  }
  else {
    yourCharacter = characters[characterRoll-1];
    informUser("Your character is " + (yourCharacter["race"]));
  }
}

function turnResult(offense, defense){
  function determineDamage(offense,defense){
    function attackRollTotal(offense){
      function attackRoll(){
        let attackRollScore = rollDie(20); 
        return attackRollScore;  
      }
      function bonusAttackRoll(offense){
        let bonusAttackRollScore = rollDie(offense.bonusAttackRollDie); 
        return bonusAttackRollScore;
      }
      let attackRollVar = attackRoll(offense);
      let totalAttackRoll;
      if (attackRollVar === 20){
        totalAttackRoll = "Critical hit";
      }
      else if (attackRollVar === 1){
        totalAttackRoll = "Critical Miss";
      }
      else {
        totalAttackRoll = attackRollVar + bonusAttackRoll(offense) + offense.bonusAttack; 
      }
      return totalAttackRoll; 
    }
    function criticalDamage(offense){
      return offense.meleeHitDie * offense.numberOfHitDie + offense.meleeBonus;  
    }
    function standardDamage(offense){
      if (numberOfHitDie > 1){
        return rollDie(offense.meleeHitDie) + rollDie(offense.meleeHitDie) + offense.meleeBonus;
      }
      else {
        return rollDie(offense.meleeHitDie) + offense.meleeBonus;
      }
    }
    let totalAttackRoll = attackRollTotal(offense);
    if (totalAttackRoll === "Critical hit"){
      return criticalDamage(offense);
    }
    else if (totalAttackRoll >= defense.armorClass){
      return standardDamage(offense);
    }
    else {
      return 0;
    }
  } 
  let damage = determineDamage(offense, defense);
  if (damage >= defense.hP){
    if (defense === yourCharacter){
      informUser("You Died");
    }
    else {
      informUser("Your opponent has died!");
      mainLoop()
    }
  }
  else {
    defense.hP = defense.hP - damage;
    nextTurn(-1);
  }
}

  function mainLoop(){
    determineEnemy();
    changeStats(yourOpponent);
    nextTurn(-1);
  }
determineYourCharacter()
mainLoop()
}
diceGame();