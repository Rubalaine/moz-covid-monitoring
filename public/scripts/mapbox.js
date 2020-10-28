const provinces = JSON.parse(document.getElementById("map").dataset.provinces);

//insira o seu token de acesso para o mapbox
mapboxgl.accessToken = "";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/kelven-rubalaine/ckbcqg4rx1goi1ild0z89l27p",
  center: [35.5, -19.31114335506464],
  zoom: 4.35,
  interactive: false,
});
let numbers = [];
provinces.forEach((province) => {
  numbers.push(province.cases.confirmed);
});

// const minCases = Math.min(...numbers);
const maxCases = Math.max(...numbers);
const medCases = Math.min(...numbers) + maxCases / 2;
provinces.forEach((marker) => {
  const el = document.createElement("div");
  if (marker.cases.confirmed > maxCases * 0.7) {
    el.className = "max-cases";
  } else if (marker.cases.confirmed < medCases * 0.5) {
    el.className = "min-cases";
  } else el.className = "med-cases";

  new mapboxgl.Marker({ element: el, anchor: "bottom" })
    .setLngLat(marker.geoLocation.coordinates)
    .setPopup(
      new mapboxgl.Popup()
        .setLngLat(marker.geoLocation.coordinates)
        .setHTML(
          `<p>${marker.name} </p><span class="t-normal has-border">${marker.cases.confirmed}</span><span class="t-bad has-border">${marker.cases.dead}</span><span class="t-good has-border">${marker.cases.recovered}</span>`
        )
    )
    .addTo(map);
  // new mapboxgl.Popup()
  //   .setLngLat(marker.geoLocation.coordinates)
  //   .setHTML(`<p>${marker.name}</p>`)
  //   .addTo(map);
});

// const feats = JSON.stringify(features, null, 2);
// console.log(feats);

// map.on("load", function () {
//   map.addSource("places", {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       features: feats,
//     },
//   });

//   // Add a layer showing the places.
//   map.addLayer({
//     id: "places",
//     type: "symbol",
//     source: "places",
//     layout: {
//       "icon-image": "{icon}-15",
//       "icon-allow-overlap": true,
//     },
//   });

//   // Create a popup, but don't add it to the map yet.
//   const popup = new mapboxgl.Popup({
//     closeButton: false,
//     closeOnClick: false,
//   });

//   map.on("mouseenter", "places", function (e) {
//     // Change the cursor style as a UI indicator.
//     map.getCanvas().style.cursor = "pointer";

//     const coordinates = e.features[0].geometry.coordinates.slice();
//     const description = e.features[0].properties.description;

//     // Ensure that if the map is zoomed out such that multiple
//     // copies of the feature are visible, the popup appears
//     // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }

//     // Populate the popup and set its coordinates
//     // based on the feature found.
//     popup.setLngLat(coordinates).setHTML(description).addTo(map);
//   });

//   map.on("mouseleave", "places", function () {
//     map.getCanvas().style.cursor = "";
//     popup.remove();
//   });
// });
// // map.fitBounds(bounds, {
// //   padding: {
// //     top: 200,
// //     bottom: 200,
// //     left: 200,
// //     right: 200,
// //   },
// // });
