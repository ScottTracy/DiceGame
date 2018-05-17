"use strict"
let cha;
let wis;
let int;
let con;
let dex;
let str;
let armorclass;
let bonusAttackRollDie;
let meleeBonus;
let numberOfHitDie;
let meleeHitDie;
let meleeweapon;
let hP;
let cclass;
let race;

var halfElf = {
  race: "HalfElf",
  cclass: "Bard",
    hP: 10,
    meleeweapon: "Rapier",
    meleeHitDie: 8,
    numberOfHitDie:1,
    meleeBonus:3,
    bonusAttackRollDie: 6,
    bonusattack: 0,
    armorclass: 15,
    str: 8,
    dex: 16,
    con: 14,
    int: 12,
    wis: 10,
    cha: 16
};
var halfOrc = {
  race: "HalfOrc",
  cclass: "Paladin",
    hP: 12,
    meleeweapon: "Halberd",
    meleeHitDie: 10,
    numberOfHitDie:1,
    meleeBonus:3,
    bonusAttackRollDie: 0,
    bonusattack: 5,
    armorclass: 16,
    str: 16,
    dex: 10,
    con: 14,
    int: 8,
    wis: 12,
    cha: 15
};
var dwarf = {
  race: "Dwarf",
  cclass: "Cleric",
    hP: 11,
    meleeweapon: "Warhammer",
    meleeHitDie: 8,
    numberOfHitDie:1,
    meleeBonus:2,
    bonusAttackRollDie: 0,
    bonusattack: 4
    armorclass: 18,
    str: 14,
    dex: 8,
    con: 15,
    int: 10,
    wis: 16,
    cha: 12
};

var dragonborn = {
  race: "Dragonborn",
  cclass: "Sorcerer",
    hP: 9,
    meleeweapon: "Quarterstaff",
    meleeHitDie: 8,
    numberOfHitDie:1,
    meleeBonus:0,
    bonusAttackRollDie: 0,
    bonusattack: 2,
    armorclass: 14,
    str: 16,
    dex: 10,
    con: 14,
    int: 8,
    wis: 12,
    cha: 15

let yourCharacter
let yourOpponent
let characters = [halfElf, halfOrc, dwarf, dragonborn]


function rollDie(numberOfSides){
  let rollResult = Math.floor(Math.random() * numberOfSides) + 1
  informUser("You rolled a D" + numberOfSides + " " + "resulting in" + " " + rollResult)  
  return rollResult
}
function informUser(text){
	console.log(text);
}
  
function attackRoll(){
  let attackRollScore = rollDie(20); 
  return attackRollScore  
}
function bonusAttackRoll(bonusAttackRollDie){
	let bonusAttackRollScore = rollDie(bonusAttackRollDie); // need to define
	return bonusAttackRollScore
}

function attackRollTotal(){
	let totalAttackRoll;
  if (attackRoll() === 20){
	  totalAttackRoll = "Critical hit";
	}
  else if (attackRoll() === 1){
    totalAttackRoll = "Critical Miss";
  }
  else {
    totalAttackRoll = attackRoll() + bonusAttackRoll() + bonusattack; // need to define
    }
  return totalAttackRoll; 
}
function criticalDamage(){
  return meleeHitDie * numberOfHitDie + meleeBonus;  // need to define
}
function standardDamage(){
  if (numberOfHitDie > 1){
    return rollDie(meleeHitDie) + rollDie(meleeHitDie) + meleeBonus;
  }
  else {
    return rollDie(meleeHitDie) + meleeBonus;
  }
}

function determineEnemy(){
  yourOpponent = rollDie(characters.length)
} 
function determineYourCharacter(){
  let characterRoll = rollDie(characters.length + 1);
  if (characterRoll === characters.length + 1){
    return freechoice()
  }
  else {
    yourCharacter = characters[characterRoll-1]
    console.log("Your character is " + (yourCharacter[race]))
  }
}
function freechoice(){  
  yourCharacter = characters[prompt("Free Choice! Choose a Character:" + " " + toString(iterator(characters)), "(enter a number 0:" + (characters.length-1) +")")];
  alert("You chose" + " " + yourCharacter["race"])

}
function iterator(array){0
 let iterator = array.entries();

 let iterated1 = iterator.next().value;
 let iterated2 = iterator.next().value;
 //let iterated3 = iterator.next().value;
 //let iterated4 = iterator.next().value;
 let iterated = toString(iterated1.concat(" | ",iterated2))
 console.log(iterated)
  return iterated
}





determineYourCharacter()

