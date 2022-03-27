// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // Ask the user for their preferences
  passwordProperties.setProperties();

  // Generate the password
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  var password = "";
  for (var i = 0; i < passwordProperties.length; i++){
    // Add a random character for each character in the selected password length
    password = password.concat(getRandomCharacter())
    console.log("character #" + i + ": " + password[i]);
  }

  console.log(passwordProperties.selectedTypes)

  // Make sure that every type of character was used, if not, generate a new password
  for (var i = 0; i < passwordProperties.selectedTypes.length; i++){
    if (passwordProperties.selectedTypes[i] === false){
      console.log("Generation failed! Retrying...")
      passwordProperties.resetSelectedTypes();
      generatePassword()
    }
  }
  return password;
}

var passwordProperties = {

  resetSelectedTypes: function(){
    // Used to make sure each selected type has been used
    this.selectedTypes = [!this.charTypeArray[0], !this.charTypeArray[1], !this.charTypeArray[2], !this.charTypeArray[3]];
    console.log("selectedTypes reset, new value: " + this.selectedTypes);
  },

  setProperties: function() {
    this.length = getPasswordLength();

    var validSelection = false;

    // repeat until at least 1 type is selected (validSelection === true)
    while (!validSelection){

      // ask user whether or not to use each type
      this.lowercase = window.confirm("Would you like to include lowercase characters?");
      this.uppercase = window.confirm("Would you like to include uppercase characters?");
      this.numeric = window.confirm("Would you like to include numeric characters?");
      this.special = window.confirm("Would you like to include special characters?");

      // store each selection in an array for later use
      this.charTypeArray = [this.lowercase, this.uppercase, this.numeric, this.special];

      // initialize selected types
      this.resetSelectedTypes();

      // breaks the loop if at least one of the types is selected
      for (var i = 0; i < this.charTypeArray.length; i++){
        if (this.charTypeArray[i] === true) {
          validSelection = true
        }
      }

      // informs the user they haven't selected any character types before restarting the loop
      if (!validSelection) {
        window.alert("Nothing selected!");
      }
    }
  }
}

function getPasswordLength(){
  var length = 0;
  // repeat until user inputs a value between 8 and 128
  while (!(length >= 8 && length <= 128)){
    length = window.prompt("How long would you like your password to be? (8-128)");
  }

  console.log("passwordLength: " + length);
  return parseInt(length);
}

var constants = {
  // messy but easy way of making arrays of each character type
  lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  numeric: "1234567890".split(""),
  special: " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~".split("")
}

// returns a random character of a random type
function getRandomCharacter(){
  var currentList
  var type = getRandomCharType();
  switch(type){
    case "lowercase":
      currentList = constants.lowercase;
      break;
    case "uppercase":
      currentList = constants.uppercase;
      break;
    case "numeric":
      currentList = constants.numeric;
      break;
    case "special":
      currentList = constants.special;
      break;
  }

  // returns a random item from the selected array
  return currentList[getRandomInteger(currentList.length)];
}

// returns a valid random character type
function getRandomCharType(){
  var typeNames = ["lowercase", "uppercase", "numeric", "special"];

  var returnValue = getRandomInteger(typeNames.length);
  while (passwordProperties.charTypeArray[returnValue] === false) {
    returnValue = getRandomInteger(typeNames.length);
  }
  
  // this adds the type selected to the selectedTypes array so this can be checked later to verify every type has been used
  passwordProperties.selectedTypes[returnValue] = true;
  return typeNames[returnValue];
}

// returns a random integer from 0 to (max - 1)
function getRandomInteger(max){
  return Math.floor(Math.random() * max)
}