# Partie Client – SuperMaroc

Système Distribué de Supermarché

## 📌 Description générale

Cette partie représente **l’interface client du supermarché SuperMaroc**, développée en HTML, CSS et JavaScript.
Elle permet aux utilisateurs de naviguer sur le site, se connecter, consulter son éspace, se deconnecter, laisser une notation du site,consulter la liste des produits, ajouter au panier, effectuer des recherches , filtrer les produits par catégorie, et passer une commande en remplissant un formulaire.

Aucune base de données n’a été utilisée dans cette partie : les données produits sont gérées côté client via le fichier `products.js`.

---

## 📁 Structure du dossier

```
client-web/
│
├── index.html         → Page d’accueil du client
├── index.css          → Style principal du site
├── script.js          → Fonctionnalités JavaScript (navigation, panier basique…)
├── products.html      → Page affichant tous les produits + recherche + filtrage
├── products.js        → Liste des produits & génération dynamique des cartes
├── images/            → Dossier contenant toutes les images utilisées
└── README.md          → Documentation de la partie client
```

---

## ✨ Fonctionnalités principales

### 🔹 1. Page d’accueil (index.html)

* Présentation du supermarché
* Navigation vers la page produits
* Mise en page responsive

### 🔹 2. Page des produits (products.html)

* Affichage dynamique de tous les produits
* Barre de recherche instantanée
* Filtrage par catégorie
* Chargement automatique des données depuis `products.js`

### 🔹 3. Gestion des produits (products.js)

* Tableau JavaScript contenant les informations des produits
* Génération automatique des cartes produits dans la page
* Aucune base de données nécessaire

### 🔹 4. Design et style (index.css)

* Mise en page moderne et responsive
* Couleurs adaptées à un site e-commerce
* Grilles pour l’affichage des produits

### 🔹 5. Comportement dynamique (script.js)

* Gestion du menu
* Interactions utilisateur
* Scripts généraux du site

---

## 🚀 Technologies utilisées

* **HTML5** — Structure des pages
* **CSS3** — Mise en forme et responsive design
* **JavaScript (ES6)** — Logique côté client
* **VS Code** — Environnement de développement

---

## 📦 Installation & Utilisation

1. Télécharger le dossier `client-web`
2. Ouvrir le fichier `index.html` dans un navigateur
3. Naviguer entre les pages

> ⚠️ Aucun serveur ni base de données n’est nécessaire pour exécuter cette partie.


