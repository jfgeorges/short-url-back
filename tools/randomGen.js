const randomGen = length => {
  let nbChar = length || 15; // Taille maximale du PassWord

  let randomNum;
  let min = 0;
  let max = 2;

  let i = 0;
  let password = "";
  // Génération du MdP
  while (i < nbChar) {
    // 1er appel aléatoire pour déterminer Chiffre, Majuscule ou Minuscule
    min = 0;
    max = 2;
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    // 0: Chiffre, 1: Minuscule, 2: Majuscule
    switch (randomNum) {
      case 0:
        min = "0".charCodeAt(0);
        max = "9".charCodeAt(0);
        break;
      case 1:
        min = "a".charCodeAt(0);
        max = "z".charCodeAt(0);
        break;
      default:
        min = "A".charCodeAt(0);
        max = "Z".charCodeAt(0);
    }
    password = password + String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
    i++;
  }
  return password;
};

module.exports = randomGen;
