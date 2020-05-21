/* variables */
let client_age;
let client_solde;
let client_action;
let client_boisson;
let client_solde_variation;
let initialisation_message_boucle = "oui";

/* fonction entrer */
function bienvenue() {
  alert("Bienvenue au casino LE BOCAL ACADEMY");
  interdiDeJeu();
}

/* function interdit de jeu */
function interdiDeJeu() {
  const client_interdit_jeu = prompt(
    "Etes-vous interdit de jeu ?\nsaisir : 1 - oui\nsaisir : 2 - non"
  );
  if (client_interdit_jeu == "1") {
    alert("Désolé, vous êtes interdit de jeu. Vous ne pouvez pas rentrer.");
  } else if (client_interdit_jeu == "2") {
    client_solde = parseInt(prompt("Quel est le montant de votre solde ?"));
    if (client_solde < -8000) {
      alert(
        "Désolé, votre solde est inférieur à -8000 €uros. Vous ne pouvez pas rentrer."
      );
    } else {
      client_age = prompt("Quel est votre age ?");

      while (client_solde > -8000 && client_action != "3") {
        client_action = prompt(
          "Que souhaitez vous faire ?\nsaisir : 1 - boire\nsaisir : 2 - jouer\nsaisir : 3 - sortir\nVotre solde est de " +
            client_solde +
            " €uros."
        );
        switch (client_action) {
          case "1":
            boire();
            break;
          case "2":
            jouer();
            break;
          case "3":
            alert("Au revoir, à bientôt");
            break;
          default:
            alert(
              client_action +
                " n'est pas un choix valide, saisir : boire, jouer ou sortir."
            );
            break;
        }
      }
      sortie();
    }
  } else {
    alert("Désolé mais nous n'avons pas compris votre choix.");
    interdiDeJeu();
  }
}

/* fonction boire */
function boire() {
  if (client_solde < 5) {
    alert(
      "Désolé votre solde de " +
        client_solde +
        " €uros est inférieur au minimum de 5 €uros nécessaire pour pouvoir consommer une boisson."
    );
  } else {
    /* Choix boisson client */
    client_boisson = prompt(
      "Quelle type de boisson voulez vous ?\nsaisir : 1 - alcoolisée (8€)\nsaisir : 2 - soft (5€)"
    );
    switch (client_boisson) {
      /* Choix 1 - alcool */
      case "1":
        /* Vérification age supérieur ou egal a 21 */
        boireAlcool();
        break;
      /* Choix 2 - soft */
      case "2":
        /* Vérification solde supérieur ou egal a 5 */
        boireSoft();
        break;
      /* erreur choix */
      default:
        alert("Désolé mais votre choix n'existe pas.");
        boire();
        break;
    }
  }
}

/* fonction boire alcool */
function boireAlcool() {
  if (client_age >= 21) {
    /* Vérification solde supérieur ou egal a 8 */
    if (client_solde >= 8) {
      client_solde -= 8;
      alert(
        "Voici votre boisson alcoolisée, votre nouveau solde est de " +
          client_solde +
          " €uros."
      );
    } else {
      alert(
        "Désolé, mais vous n'avez pas assez d'argent pour payer votre boisson alcoolisée, votre solde est de " +
          client_solde +
          " €uros."
      );
    }
  } else {
    alert(
      "Désolé, mais vous n'avez pas l'age minimum requis pour pouvoir boire une boisson alcoolisée."
    );
  }
}

/* fonction boire soft */
function boireSoft() {
  client_solde -= 5;
  alert(
    "Voici votre boisson soft, votre nouveau solde est de " +
      client_solde +
      " €uros."
  );
}

/* fonction jouer */
function jouer() {
  /* vérification age client*/
  if (client_age >= 18) {
    jouerMajeur();
  } else {
    jouerMineur();
  }
}

/* fonction majeur */
function jouerMajeur() {
  controle();
  client_solde_variation = getRandom(-500, 500);
  /* cas si perte réel */
  if (client_solde_variation < 0) {
    client_solde += client_solde_variation;
    alert(
      "Dommage, vous avez perdu " +
        client_solde_variation +
        " €uros.\nVotre nouveau solde est de " +
        client_solde +
        " €uros."
    );
  } else {
    /* cas si gain réel */
    client_solde += client_solde_variation;
    alert(
      "Bravo, vous avez gagné " +
        client_solde_variation +
        " €uros.\nVotre nouveau solde est de " +
        client_solde +
        " €uros."
    );
  }
}

/* fonction mineur */
function jouerMineur() {
  controle();
  client_solde_variation = getRandom(-100, 100);
  /* cas si perte fictif */
  if (client_solde_variation < 0) {
    alert("Résultat fictif, perte de " + client_solde_variation + " €uros.");
  } else {
    /* cas si gain fictif */
    alert("Résultat fictif, gain de " + client_solde_variation + " €uros.");
  }
}

/* fonction sortie */
function sortie() {
  if (client_action != 3) {
    alert(
      "Désolé, mais vous n'avez pas assez d'argent pour rester dans le casino.\nVotre solde est de " +
        client_solde +
        " €uros.\nA bientôt."
    );
  }
}

/* fonctions generer chiffre aleatoire */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* fonction controle 1er tour boucle */
function controle() {
  /* si 1er passage boucle alors afficher message */
  if (initialisation_message_boucle == "oui") {
    if (client_age >= 18) {
      alert("Vous êtes majeur, vous pouvez jouer et gagner.");
    } else {
      alert("Vous êtes mineur, vous pouvez jouer mais pas gagner.");
    }
    initialisation_message_boucle = "non";
  }
}

/* routine */
bienvenue();
