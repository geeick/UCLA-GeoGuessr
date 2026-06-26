# BruinGuessr

BruinGuessr is a UCLA campus guessing game built with React, Vite, JavaScript, and Leaflet.

Players choose one of three modes:

- **Picture Mode**: guess from a still campus image.
- **Map Mode**: explore a campus starting point, using Google Street View if configured or fallback campus-node navigation by default.
- **Mixed Mode**: each round randomly chooses Picture Mode or Map Mode.

The player clicks on the UCLA map, submits a guess, sees the correct answer, gets a distance error, and earns points.

## Run the project

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Where to add your UCLA images

Picture Mode still images go here:

```txt
public/campus-photos/
```

Map Mode fallback views and panoramas go here:

```txt
public/campus-views/
```

The app will not crash if the image files are missing. Instead, it shows a nice box saying **Add UCLA image here**.

## Files you will edit most

Picture Mode data:

```txt
src/data/pictureLocations.js
```

Map Mode fallback node data:

```txt
src/data/mapNodes.js
```

Scoring:

```txt
src/utils/scoring.js
```

Distance formula:

```txt
src/utils/distance.js
```

## Optional Google Street View setup

Map Mode works without Google Street View. By default, it uses the connected UCLA campus-node fallback system.

To try Google Street View, create a local `.env` file in the project root:

```txt
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

Do not hard-code private API keys in the code. Do not commit your real `.env` file to GitHub.

If the API key is missing, invalid, or if Street View is unavailable near the selected campus node, BruinGuessr automatically falls back to the custom campus navigation system.

## Project structure

```txt
src/
  App.jsx
  main.jsx
  styles.css
  components/
    CampusImage.jsx
    CampusMap.jsx
    EndScreen.jsx
    FallbackMapRound.jsx
    GameScreen.jsx
    HomeScreen.jsx
    MapRound.jsx
    ModeSelectionScreen.jsx
    MovementControls.jsx
    PictureRound.jsx
    ResultPanel.jsx
    StreetViewRound.jsx
  data/
    mapNodes.js
    pictureLocations.js
  utils/
    distance.js
    randomRound.js
    scoring.js
    streetViewAvailable.js
```

## Important note

The UI does not use the GeoGuessr name or branding. The game name is **BruinGuessr**.


## Speed scoring

Each round now tracks how fast the player submits a guess. The distance score is multiplied by a speed factor:

- 0 to 20 seconds: full points
- 20 to 90 seconds: points gradually decrease
- 90+ seconds: player keeps 55% of the distance score

You can tune these values in `src/utils/scoring.js`.

The result panel shows distance, time, speed factor, distance score, round points, and total score. It does not reveal the exact answer name under the map; the correct location is only marked visually.


## Map zoom note

The Leaflet guessing map starts at zoom level 17 and allows zooming up to 22. OpenStreetMap tiles normally max out around zoom 19, so the app uses `maxNativeZoom={19}` and lets Leaflet visually over-zoom the map for more precise UCLA campus clicks.

## Random Google Street View starts

Map Mode now tries this order:

1. If `VITE_GOOGLE_MAPS_API_KEY` exists, BruinGuessr samples random coordinates inside the UCLA campus bounds and asks Google Street View for a nearby outdoor panorama.
2. If a valid panorama is found, the player starts there and the correct answer is the actual panorama location.
3. If random Street View fails, it tries Street View near the programmed fallback node for that round.
4. If Google Street View is unavailable or no API key is present, it uses the connected fallback nodes in `src/data/mapNodes.js`.

The fallback nodes are still important because Google Street View coverage can be inconsistent around campus walkways and interiors.

The random Street View logic lives here:

```txt
src/utils/uclaArea.js
src/utils/randomStreetView.js
src/components/StreetViewRound.jsx
```

To make random Street View more or less strict, edit these constants in `src/utils/randomStreetView.js`:

```js
const RANDOM_STREET_VIEW_ATTEMPTS = 22;
const RANDOM_STREET_VIEW_RADIUS_METERS = 85;
```
