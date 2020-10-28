const getGeo = async () => {
  try {
    console.log("is working");
    const data = await axios.get("127.0.0.1:4000/covid-api/moz/province");
    console.log(data);
  } catch (error) {
    console.error(error.stack);
  }
};
getGeo().then(() => {});
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VsdmVuLXJ1YmFsYWluZSIsImEiOiJja2NiMGcyN2EwZWMxMnR1bnVwcXZibGVjIn0.iD2myeN-lQH1xIpogUOA0w";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/kelven-rubalaine/ckbcqg4rx1goi1ild0z89l27p",
  center: [34.98046875, -19.31114335506464],
  zoom: 4.5,
  interactive: false,
});
