# Alcasar Chrome Extension

![GitHub Release (latest by semver)](https://img.shields.io/github/v/release/DorianABDS/alcasar-chrome-extension)
![License](https://img.shields.io/github/license/DorianABDS/alcasar-chrome-extension)
[![Extension Chrome](https://img.shields.io/badge/Chrome%20Web%20Store-Visiter%20l'extension-blue?logo=google-chrome)](https://chrome.google.com/webstore/detail/alcasar-chrome-extension)



Cette extension Chrome permet de **cliquer automatiquement sur le bouton d’authentification** du portail [Alcasar](https://alcasar.laplateforme.io) dès que la page de connexion est chargée, afin de faciliter l’accès sans intervention manuelle.

---

## Fonctionnalités

- **Clic automatique sur le bouton `.App-Button`** après un délai configurable.  
- **Préparation de l’interaction** : détecte la présence de l’élément `.App-Input` avant de lancer le clic pour éviter les déconnexions.  
- **Pas d’interface utilisateur** : l’extension fonctionne en arrière-plan.  
- **Délai configurable** (en secondes) avant le clic pour s’adapter au temps de rendu de la page.

---

## Installation

### Depuis le code source

1. Clone ce dépôt ou télécharge le zip :
   ```bash
   git clone https://github.com/tonpseudo/alcasar-chrome-extension.git
