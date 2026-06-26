// Map Mode fallback campus navigation nodes.
// Put regular images or panoramas in: public/campus-views/
// If you later add Google Street View data, fill in streetViewPanoramaId or streetViewUrl.
// The app still works without Street View because it falls back to these connected nodes.

export const mapNodes = [
  {
    id: "janss-steps",
    name: "Janss Steps",
    latitude: 34.0716,
    longitude: -118.4426,
    imageUrl: "/campus-views/janss-steps.jpg",
    panoramaImageUrl: "/campus-views/janss-steps-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 90,
    pitch: 0,
    connections: {
      forward: "royce-hall",
      left: "powell-library",
      right: "bruin-plaza",
      back: "bruin-bear"
    },
    type: "map"
  },
  {
    id: "royce-hall",
    name: "Royce Hall",
    latitude: 34.0728,
    longitude: -118.4421,
    imageUrl: "/campus-views/royce-hall.jpg",
    panoramaImageUrl: "/campus-views/royce-hall-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 0,
    pitch: 0,
    connections: {
      back: "janss-steps",
      left: "powell-library",
      right: "sculpture-garden"
    },
    type: "map"
  },
  {
    id: "powell-library",
    name: "Powell Library",
    latitude: 34.0719,
    longitude: -118.4418,
    imageUrl: "/campus-views/powell-library.jpg",
    panoramaImageUrl: "/campus-views/powell-library-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 180,
    pitch: 0,
    connections: {
      right: "janss-steps",
      forward: "royce-hall",
      back: "inverted-fountain"
    },
    type: "map"
  },
  {
    id: "bruin-plaza",
    name: "Bruin Plaza",
    latitude: 34.0704,
    longitude: -118.4450,
    imageUrl: "/campus-views/bruin-plaza.jpg",
    panoramaImageUrl: "/campus-views/bruin-plaza-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 270,
    pitch: 0,
    connections: {
      left: "janss-steps",
      forward: "ackerman-union",
      right: "bruin-bear",
      back: "john-wooden-center"
    },
    type: "map"
  },
  {
    id: "bruin-bear",
    name: "Bruin Bear",
    latitude: 34.0703,
    longitude: -118.4452,
    imageUrl: "/campus-views/bruin-bear.jpg",
    panoramaImageUrl: "/campus-views/bruin-bear-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 90,
    pitch: 0,
    connections: {
      left: "bruin-plaza",
      forward: "ackerman-union",
      back: "janss-steps"
    },
    type: "map"
  },
  {
    id: "ackerman-union",
    name: "Ackerman Union",
    latitude: 34.0704,
    longitude: -118.4445,
    imageUrl: "/campus-views/ackerman-union.jpg",
    panoramaImageUrl: "/campus-views/ackerman-union-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 30,
    pitch: 0,
    connections: {
      back: "bruin-plaza",
      left: "kerckhoff-hall",
      right: "bruin-bear"
    },
    type: "map"
  },
  {
    id: "kerckhoff-hall",
    name: "Kerckhoff Hall",
    latitude: 34.0710,
    longitude: -118.4436,
    imageUrl: "/campus-views/kerckhoff-hall.jpg",
    panoramaImageUrl: "/campus-views/kerckhoff-hall-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 210,
    pitch: 0,
    connections: {
      right: "ackerman-union",
      forward: "janss-steps",
      back: "murphy-hall"
    },
    type: "map"
  },
  {
    id: "inverted-fountain",
    name: "Inverted Fountain",
    latitude: 34.0707,
    longitude: -118.4401,
    imageUrl: "/campus-views/inverted-fountain.jpg",
    panoramaImageUrl: "/campus-views/inverted-fountain-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 60,
    pitch: 0,
    connections: {
      forward: "court-of-sciences",
      back: "powell-library",
      right: "boelter-hall"
    },
    type: "map"
  },
  {
    id: "court-of-sciences",
    name: "Court of Sciences",
    latitude: 34.0689,
    longitude: -118.4410,
    imageUrl: "/campus-views/court-of-sciences.jpg",
    panoramaImageUrl: "/campus-views/court-of-sciences-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 180,
    pitch: 0,
    connections: {
      back: "inverted-fountain",
      left: "boelter-hall",
      right: "engineering-vi"
    },
    type: "map"
  },
  {
    id: "boelter-hall",
    name: "Boelter Hall",
    latitude: 34.0689,
    longitude: -118.4422,
    imageUrl: "/campus-views/boelter-hall.jpg",
    panoramaImageUrl: "/campus-views/boelter-hall-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 120,
    pitch: 0,
    connections: {
      right: "court-of-sciences",
      forward: "engineering-vi",
      back: "inverted-fountain"
    },
    type: "map"
  },
  {
    id: "engineering-vi",
    name: "Engineering VI",
    latitude: 34.0696,
    longitude: -118.4426,
    imageUrl: "/campus-views/engineering-vi.jpg",
    panoramaImageUrl: "/campus-views/engineering-vi-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 300,
    pitch: 0,
    connections: {
      back: "boelter-hall",
      left: "court-of-sciences",
      right: "pauley-pavilion"
    },
    type: "map"
  },
  {
    id: "pauley-pavilion",
    name: "Pauley Pavilion",
    latitude: 34.0703,
    longitude: -118.4469,
    imageUrl: "/campus-views/pauley-pavilion.jpg",
    panoramaImageUrl: "/campus-views/pauley-pavilion-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 75,
    pitch: 0,
    connections: {
      left: "john-wooden-center",
      back: "engineering-vi",
      forward: "bruin-plaza"
    },
    type: "map"
  },
  {
    id: "john-wooden-center",
    name: "John Wooden Center",
    latitude: 34.0710,
    longitude: -118.4465,
    imageUrl: "/campus-views/john-wooden-center.jpg",
    panoramaImageUrl: "/campus-views/john-wooden-center-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 150,
    pitch: 0,
    connections: {
      forward: "bruin-plaza",
      right: "pauley-pavilion",
      back: "bruin-bear"
    },
    type: "map"
  },
  {
    id: "sculpture-garden",
    name: "Sculpture Garden",
    latitude: 34.0750,
    longitude: -118.4410,
    imageUrl: "/campus-views/sculpture-garden.jpg",
    panoramaImageUrl: "/campus-views/sculpture-garden-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 225,
    pitch: 0,
    connections: {
      back: "royce-hall",
      left: "murphy-hall",
      right: "powell-library"
    },
    type: "map"
  },
  {
    id: "murphy-hall",
    name: "Murphy Hall",
    latitude: 34.0719,
    longitude: -118.4398,
    imageUrl: "/campus-views/murphy-hall.jpg",
    panoramaImageUrl: "/campus-views/murphy-hall-panorama.jpg",
    streetViewPanoramaId: null,
    streetViewUrl: null,
    heading: 330,
    pitch: 0,
    connections: {
      forward: "kerckhoff-hall",
      left: "sculpture-garden",
      back: "inverted-fountain"
    },
    type: "map"
  }
];
