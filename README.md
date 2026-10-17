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

`assets/images/landslide-trio.jpg` est une copie optimisée de la photo fournie (2400 × 1600 pixels). Elle apparaît en ouverture, sur toute la largeur. Le cadre CSS au ratio 15:7 masque les 20 % supérieurs et les 10 % inférieurs de la photo 3:2 avec `object-position: center 66.6667%`; le fichier original reste intact. LANDSLIDE se superpose en bas à droite. Le site utilise uniquement cette copie du dépôt, sans dépendance au chemin du fichier original. Pour remplacer la photo, mettre à jour son chemin, ses dimensions et son texte alternatif dans `index.html`.

### Erreur YouTube 153

Ne pas tester les vidéos en ouvrant directement `index.html` en `file://`. YouTube exige un en-tête HTTP Referer : utiliser le serveur local ci-dessus ou le site GitHub Pages. Conserver `referrerpolicy="strict-origin-when-cross-origin"` sur les iframes. Si l’erreur persiste en HTTP, vérifier dans Network le Referer de la requête embed et les protections du navigateur.

## Animation du titre

`title-animation.js` déplace les mêmes lettres entre sept versions du titre. Playful Data reste affiché 6 secondes à la première occurrence, puis 15 secondes aux suivantes, chaque variante 3,5 secondes; Trois modes sont conservés : groupes de trois (0), lettres individuelles (1) et défilement rapide des caractères sur place (2, toutes les 50 ms). Seul le mode 2 est actif; modifier `activeModes` dans `title-animation.js` pour changer la sélection. Pour les déplacements, avec des départs décalés et de petites trajectoires courbes (700 à 850 ms, plus les délais). Modifier `phrases` et les durées dans ce fichier. Un onglet masqué suspend le minuteur; le survol ne le suspend pas. Le premier minuteur démarre à l’initialisation du script, sans attendre les polices ni les vidéos. Avec la préférence de réduction des animations, le titre reste fixe. Sans JavaScript, le titre HTML reste visible. Vérifier manuellement les mouvements, le cadrage mobile et la lecture des vidéos.

Le titre animé utilise Archivo Black, hébergée dans `assets/fonts/archivo-black.ttf` avec sa licence `archivo-black-OFL.txt`. Le reste du site conserve Lato. La taille et le rose du titre se règlent dans `.featured h1`; la mesure centrée des lettres se règle dans `.title-ruler`.

Le mode de défilement alterne gauche → droite, droite → gauche, centre → bords et bords → centre. Chaque caractère défile pendant 400 ms, avec un décalage de 45 ms selon sa position dans la vague.

Le nom LANDSLIDE superposé à la photo utilise Raleway, hébergée dans `assets/fonts/raleway-variable.ttf` avec la licence `raleway-OFL.txt`. Playful Data conserve Archivo Black.
