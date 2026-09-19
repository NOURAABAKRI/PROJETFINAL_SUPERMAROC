
# 🏪 SuperMaroc — Système Distribué de Supermarché

### 📚 Projet universitaire — Systèmes Distribués

**Année :** 2025
**Encadrant :** —
**Équipe :**

| Membre             | Rôle                              | Branche Git       |
| ------------------ | --------------------------------- | ----------------- |
| 👩‍💻 Salma Boumart   | Développeuse Serveur (RMI / RPC)  | `serveur-rmi`     |
| 👨‍💻 Noura Abakri    | Gestion Base de Données           | `base-donnees`    |
| 👨‍💻 Membre 3        | Interface Client (Site Web)       | `client-web`      |
| 👨‍💻 Bahija ELhajali | Interface Mini-Admin (Magasins)   | `mini-admin`      |
| 👨‍💻 BOUHARROUD Fatima-ezzahra| Interface Admin Principal (Siège) | `admin-principal` |

---

## 🧠 Description du projet

**SuperMaroc** est un **système distribué de gestion de stock et de ventes** pour une chaîne de supermarchés répartis sur plusieurs villes du Maroc (ex : Agadir, Marrakech, Casablanca).

Le projet repose sur une architecture **client-serveur distribuée**, permettant aux magasins locaux, clients et siège central de **communiquer en temps réel** via RMI (ou RPC).

---

## ⚙️ Architecture du système

### 1️⃣ Interface Client (Web)

* Permet aux clients d’acheter des produits alimentaires et ménagers en ligne
* Paiement à la livraison (Cash on Delivery)
* Envoie la commande au **magasin le plus proche**
* Met à jour automatiquement le stock du magasin

📁 Dossier : `client-web/`
Fichiers :

```
index.html
js/app.js
css/style.css
```

---

### 2️⃣ Interface Mini-Admin (par magasin)

* Chaque magasin (Agadir, Marrakech, etc.) possède son mini-admin
* Permet de gérer :

  * Produits locaux (ajout, suppression, mise à jour)
  * Suivi des ventes
  * Produits expirés
* Envoie les données au serveur central (Casablanca) via **RMI**

📁 Dossier : `mini-admin/`
Fichiers :

```
src/com/supermaroc/miniadmin/
web/mini-admin.html
web/js/mini-admin.js
web/css/mini-admin.css
```

---

### 3️⃣ Interface Admin Principal (Siège à Casablanca)

* Supervise tous les magasins
* Compare les ventes entre les villes
* Visualise les stocks globaux
* Réapprovisionne les magasins en manque
* Passe des commandes fournisseurs

📁 Dossier : `admin-principal/`
Fichiers :

```
src/com/supermaroc/admin/
web/admin-principal.html
web/js/admin.js
web/css/admin.css
```

---

### 4️⃣ Serveur Central (Casablanca)

* Implémente les appels distants RMI (ou RPC)
* Gère la synchronisation entre les magasins
* Stocke les informations dans la base de données centrale

📁 Dossier : `serveur/`
Fichiers :

```
src/com/supermaroc/rmi/InterfaceRMI.java
src/com/supermaroc/rmi/ServeurRMI.java
src/com/supermaroc/rmi/MainServeur.java
src/com/supermaroc/model/Produit.java
src/resources/db.properties
```

---

### 5️⃣ Base de Données

* Contient les tables :

  * `Produit (id, nom, prix, date_expiration, quantité, id_magasin)`
  * `Magasin (id, ville, adresse)`
  * `Vente (id_produit, date, quantité, id_magasin)`
  * `CommandeClient (id_client, produits, date, statut)`
  * `Utilisateur (id, rôle, login, password)`

📁 Dossier : `base-de-donnees/`
Fichiers :

```
schema.sql
insertion.sql
mcd-mlg.pdf
```

---

## 🧩 Fonctionnement Distribué

1️⃣ Le **client** commande sur le site
2️⃣ Le **magasin local (mini-admin)** reçoit la commande
3️⃣ Le **serveur central (RMI)** met à jour la base centrale
4️⃣ L’**admin principal** voit les stocks et déclenche les réapprovisionnements
5️⃣ Les **fournisseurs** sont contactés si nécessaire

Tout le système est synchronisé en temps réel via **RMI**.

---

## 🗂️ Structure du projet

```
SuperMaroc/
│
├── serveur/
├── mini-admin/
├── client-web/
├── admin-principal/
├── base-de-donnees/
└── README.md
```

---

## 👥 Collaboration Git

### 🪴 Création des branches

```bash
git checkout -b serveur-rmi
git push -u origin serveur-rmi

git checkout -b base-donnees
git push -u origin base-donnees

git checkout -b client-web
git push -u origin client-web

git checkout -b mini-admin
git push -u origin mini-admin

git checkout -b admin-principal
git push -u origin admin-principal
```

---

## 🔄 Workflow de développement

| Étape | Action                        | Commande                   |
| ----- | ----------------------------- | -------------------------- |
| 1️⃣   | Ajouter/modifier des fichiers | `git add .`                |
| 2️⃣   | Créer un commit               | `git commit -m "message"`  |
| 3️⃣   | Pousser sur GitHub            | `git push`                 |
| 4️⃣   | Changer de branche            | `git checkout nom_branche` |
| 5️⃣   | Fusionner dans main (chef)    | `git merge nom_branche`    |

---

## 💡 Exemple d’utilisation RMI

```java
Registry reg = LocateRegistry.getRegistry("localhost", 1099);
InterfaceRMI serveur = (InterfaceRMI) reg.lookup("SuperMarocServeur");
serveur.mettreAJourStock(idMagasin, produit);
```

---

## 🧱 Outils utilisés

* **Java 17**
* **RMI / RPC**
* **MySQL**
* **HTML / CSS / JavaScript**
* **Git / GitHub**
* **VS Code / IntelliJ / MySQL Workbench**

---

## 🏁 Objectif final

Créer un **système distribué complet**, fiable et interactif pour gérer :

* Les ventes clients 🛒
* Les stocks de chaque magasin 📦
* La supervision centrale 🧠
* Le réapprovisionnement automatique 🚛


