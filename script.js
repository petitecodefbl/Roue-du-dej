// ===== RÉCUPÉRATION DES ÉLÉMENTS HTML =====

const bouton = document.getElementById("tourner");
const roue = document.getElementById("roue");

const resultatFinal = document.getElementById("resultatFinal");
const texteFinal = document.getElementById("texteFinal");

const jeu = document.getElementById("jeu");
const rejouer = document.getElementById("rejouer");


// ===== LISTE DES RESTAURANTS =====

const restaurants = [
  "Franprix",
  "Traiteur Asiatique",
  "Freddy's",
  "Subway",
  "Chaplin",
  "BK / MacDo",
  "Deedee"
];


// ===== VARIABLES =====

// Position actuelle de la roue
let rotation = 0;

// Mémorise le dernier restaurant choisi
let dernierGagnant = -1;


// ===== FONCTION QUI FAIT TOURNER LA ROUE =====

function tournerLaRoue() {

  // Cache l'ancien résultat
  resultatFinal.style.display = "none";

  // Enlève le flou
  jeu.classList.remove("jeu-flou");

  // Empêche de cliquer pendant la rotation
  bouton.disabled = true;


  // ===== CHOIX DU GAGNANT =====

  let gagnant;

  do {

    gagnant = Math.floor(
      Math.random() * restaurants.length
    );

  } while (gagnant === dernierGagnant);


  // On mémorise le gagnant
  dernierGagnant = gagnant;


  // ===== CALCUL DE LA ROTATION =====

  const taillePart = 360 / restaurants.length;

  const angleGagnant =
    gagnant * taillePart + taillePart / 2;

  const positionActuelle =
    rotation % 360;

  let mouvement =
    360 - angleGagnant - positionActuelle;


  // Toujours tourner dans le même sens
  if (mouvement < 0) {
    mouvement += 360;
  }


  // Ajoute 5 tours complets
  mouvement += 5 * 360;


  // Nouvelle position
  rotation += mouvement;


  // ===== ANIMATION =====

  roue.style.transition =
    "transform 4s ease-out";

  roue.style.transform =
    "rotate(" + rotation + "deg)";


  // ===== RÉSULTAT APRÈS 4 SECONDES =====

setTimeout(function() {

  jeu.classList.add("jeu-flou");

  texteFinal.textContent =
    "🎉 " + restaurants[gagnant] + " !";

  resultatFinal.style.display = "block";

  // CONFETTIS 🎉
  confetti({
    particleCount: 150,
    spread: 100,
    origin: {
      y: 0.6
    }
  });

}, 4000);
}


// ===== BOUTON TOURNER =====

bouton.addEventListener("click", function() {

  tournerLaRoue();

});


// ===== BOUTON REJOUER =====

rejouer.addEventListener("click", function() {

  tournerLaRoue();

});
