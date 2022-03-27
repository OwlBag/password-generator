
// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // Ask the user for their preferences
  passwordProperties.setProperties();

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