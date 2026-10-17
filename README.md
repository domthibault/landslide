# LANDSLIDE

Portfolio du collectif artistique réunissant Vivian Li, David Piazza et Dominic Thibault. HTML et CSS sans compilation ni dépendance installée. Les vidéos intégrées nécessiteront une connexion à YouTube.

## Aperçu local

Avec Python 3, depuis le dossier du dépôt :

```sh
python3 -m http.server 8000
```

Ouvrir http://localhost:8000. Arrêter avec Ctrl+C. Tout serveur HTTP statique convient aussi.

## GitHub Pages

Pousser les fichiers sur GitHub, puis dans **Settings → Pages**, sélectionner **Deploy from a branch**, la branche à publier et **/ (root)**. Les chemins relatifs permettent un hébergement sous `/landslide/`. `.nojekyll` permet de servir les fichiers statiques directement.

## Contenu et vidéos

`index.html` contient deux sections : le projet en développement (deux extraits), puis les trois membres (un extrait chacun). Les titres, descriptions et vidéos sont des emplacements à compléter, pas des projets réels.

Pour ajouter une vidéo, remplacer le `div.video-placeholder` concerné par une iframe avec l’identifiant de la vidéo et un titre descriptif :

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/IDENTIFIANT_VIDEO"
  title="Titre du projet — extrait vidéo"
  loading="lazy"
  allow="encrypted-media; picture-in-picture; fullscreen"
  allowfullscreen
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

Conserver le `figure` et modifier son `figcaption`. Aucun démarrage automatique. Ne pas utiliser une URL `watch?v=…` comme source de l’iframe.

## Style et débogage

- `styles.css` : palette dans `:root`, police dans `body`, grilles vidéo et breakpoint mobile à 700px.
- Style absent : vérifier la requête `styles.css` dans le panneau Network du navigateur et la casse du nom de fichier.
- Vidéo indisponible : vérifier son identifiant, sa visibilité et l’autorisation d’intégration définie par son propriétaire.
- Publication absente ou ancienne : vérifier Actions et la branche choisie dans Pages.

À vérifier manuellement : apparence mobile et bureau, navigation au clavier, lecture des vidéos une fois ajoutées et URL finale GitHub Pages.

## Police

Lato est la police du site, incluse dans `assets/fonts/lato-regular.ttf` (400) et `assets/fonts/lato-bold.ttf` (700), sous licence SIL Open Font License (voir `assets/fonts/lato-OFL.txt`). Source : https://github.com/google/fonts/tree/main/ofl/lato. Elle est chargée localement via `@font-face`, sans requête à Google Fonts ni installation par les visiteurs. Arial et sans-serif servent de repli.

## Photo du trio

`assets/images/landslide-trio.jpg` est une copie optimisée de la photo fournie (2400 × 1600 pixels). Elle apparaît en ouverture, sur toute la largeur. Le cadre CSS au ratio 15:8 masque les 20 % supérieurs de la photo 3:2 avec `object-position: center bottom`; le fichier original reste intact. LANDSLIDE se superpose en bas à droite. Le site utilise uniquement cette copie du dépôt, sans dépendance au chemin du fichier original. Pour remplacer la photo, mettre à jour son chemin, ses dimensions et son texte alternatif dans `index.html`.
