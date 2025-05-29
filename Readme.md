# Flatplan Generator - Adobe InDesign

Générateur automatique de flatplans pour Adobe InDesign à partir de données CSV. Ce script permet de créer rapidement des maquettes de pagination avec une structure modulaire et maintenant du code.

## 🚀 Fonctionnalités

- **Génération automatique** : Crée des flatplans complets à partir d'un fichier CSV
- **Gestion des couleurs** : Attribution automatique de couleurs pastel par section
- **Support publicitaire** : Gestion spécialisée des annonces avec formats fractionnés (1/2, 1/3, 1/4)
- **Pagination intelligente** : Calcul automatique des positions et spreads
- **Séparateurs visuels** : Lignes de séparation tous les 4 pages pour faciliter l'impression
- **Structure modulaire** : Code organisé en modules réutilisables

## 📁 Structure du projet

```
flatplan-generator/
├── constants.jsx          # Configuration et constantes
├── utilities.jsx          # Fonctions utilitaires
├── colorManager.jsx       # Gestion des couleurs
├── layoutCalculator.jsx   # Calculs de positionnement  
├── cardBuilder.jsx        # Construction des éléments visuels
├── start.jsx             # Fichier principal d'orchestration
└── README.md
```

## 📋 Prérequis

- **Adobe InDesign** (versions récentes testées)
- **Template InDesign** : `gabarit_pagin.indt` avec les masters requis
- **Masters requis** : "A-Master" et "B-Master"
- **Fichier CSV** formaté selon la structure attendue

## 📊 Format du fichier CSV

Le fichier CSV doit contenir les colonnes suivantes :
```csv
startPage,title,section,pageCount,advertiser,sector
1,"Article principal",Editorial,2,,
3,"Publicité Toyota",Publicité,1,Toyota,Automobile
4,"Actualités",News,3,,
```

## 🛠️ Installation et utilisation

### Méthode 1 : Fichiers modulaires (recommandée)

1. Placez tous les fichiers `.jsx` dans le même dossier
2. Ajustez le chemin du template dans `constants.jsx` :
   ```javascript
   var PATHS = {
       templateFile: "chemin/vers/votre/template.indt"
   };
   ```
3. Exécutez `start.jsx` dans Adobe InDesign

### Méthode 2 : Chargement manuel

Chargez les fichiers dans l'ordre suivant dans InDesign :
1. `constants.jsx`
2. `utilities.jsx`
3. `colorManager.jsx`
4. `layoutCalculator.jsx`
5. `cardBuilder.jsx`
6. `start.jsx`

## ⚙️ Configuration

Modifiez `constants.jsx` pour personnaliser :

- **Dimensions des cartes** : largeur, hauteur des sections
- **Couleurs** : palette de couleurs pastel
- **Chemins de fichiers** : template et logs
- **Styles de texte** : tailles et alignements

## 🎨 Fonctionnalités avancées

### Gestion des publicités
- Support des formats fractionnés (1/2, 1/3, 1/4 de page)
- Overlay gris avec numéro d'annonce
- Formatage spécial : "Annonceur – Secteur"

### Système de couleurs
- Attribution automatique par section
- 16 couleurs pastel prédéfinies
- Réutilisation cohérente des couleurs

### Pagination intelligente
- Calcul automatique des spreads
- Gestion multi-pages
- Application automatique des masters

## 🐛 Débogage

- Les erreurs sont automatiquement loggées dans `indesign_script_errors.log`
- Messages d'alerte en cas de problème
- Structure modulaire pour faciliter le débogage

## 🤝 Contribution

Cette structure modulaire facilite la collaboration :
- Chaque module a une responsabilité spécifique
- Code facilement extensible
- Séparation claire des préoccupations

## 📝 Licence

Projet développé pour la génération automatisée de flatplans dans un environnement de production éditoriale.
