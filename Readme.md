Flatplan Generator - Structure Modulaire
Ce projet génère automatiquement des flatplans dans Adobe InDesign à partir de données CSV.
Structure des fichiers

1. constants.jsx
   Contient toutes les constantes et configurations :

Dimensions et mesures
Couleurs pastel prédéfinies
Styles de texte
Configuration des chemins de fichiers

2. utilities.jsx
   Fonctions utilitaires générales :

Gestion des erreurs et logging
Chargement des fichiers CSV
Ouverture du template
Construction de la liste des pages

3. colorManager.jsx
   Gestion des couleurs :

Attribution automatique des couleurs par section
Création des couleurs dans le document InDesign
Reset du gestionnaire de couleurs

4. layoutCalculator.jsx
   Calculs de positionnement :

Calcul des positions des pages et spreads
Calcul des coordonnées des cartes
Gestion des pages du document
Application des masters

5. cardBuilder.jsx
   Construction des éléments visuels :

Formatage des titres
Création des boîtes de section, titre et numéro de page
Assembly complet des cartes

6. main.jsx
   Fichier principal d'orchestration :

Inclusion de tous les modules
Fonction principale generateFlatplan()
Gestion globale des erreurs

Utilisation
Méthode 1 : Fichier unique consolidé
Copiez tout le contenu dans un seul fichier .jsx et exécutez-le dans InDesign.
Méthode 2 : Fichiers modulaires

Placez tous les fichiers dans le même dossier
Ajustez les chemins dans main.jsx selon votre structure :
javascript#include "constants.jsx"
#include "utilities.jsx"
// etc.

Exécutez le fichier main.jsx dans InDesign

Méthode 3 : Chargement manuel
Chargez les fichiers dans l'ordre suivant dans InDesign :

constants.jsx
utilities.jsx
colorManager.jsx
layoutCalculator.jsx
cardBuilder.jsx
main.jsx

Configuration
Modifiez le fichier constants.jsx pour :

Ajuster les dimensions des cartes
Changer les couleurs
Modifier les chemins de fichiers
Personnaliser les styles de texte

Avantages de cette structure

Maintenabilité : Code organisé par fonction
Réutilisabilité : Modules indépendants
Debuggage : Plus facile de localiser les erreurs
Extensibilité : Ajout facile de nouvelles fonctionnalités
Collaboration : Plusieurs développeurs peuvent travailler sur différents modules

Dépendances

Adobe InDesign (testé sur versions récentes)
Fichier template : gabarit_pagin.indt
Masters requis : "A-Master" et "B-Master"
