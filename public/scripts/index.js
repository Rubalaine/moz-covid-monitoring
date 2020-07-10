// import axios from "axios";
// function rowUpdate(row) {
//   const table = document.getElementById("table");
//   const newRow = table.rows[row].cells;
//   const id = table.rows[row].cells[0].dataset.id;
//   console.log(id, newRow);
// }
function editData(data) {
  //console.log(data);
  document.getElementById(data).style.display = "block";
}
function closePopup(data) {
  document.getElementById(data).style.display = "none";
}
document.querySelectorAll(".submit").forEach((submit) => {
  submit.addEventListener("click", async (event) => {
    event.preventDefault();
    submit.textContent = "Atualizando...";
    const oldProvince = JSON.parse(submit.dataset.getprovince);
    const cases = {};
    cases.new = document.getElementById(`${oldProvince.slug}-new`).value * 1;
    cases.dead = document.getElementById(`${oldProvince.slug}-dead`).value * 1;
    cases.recovered =
      document.getElementById(`${oldProvince.slug}-recovered`).value * 1 +
      oldProvince.cases.recovered;
    cases.confirmed = oldProvince.cases.confirmed + cases.new;
    cases.active = cases.confirmed - cases.recovered - cases.dead;
    cases.dead += oldProvince.cases.dead;
    console.log(oldProvince.cases);
    console.log(cases);
    await fillData(oldProvince.id, cases, Date.now());
    submit.textContent = "Confirmar";
  });
});
const fillData = async (id, cases, lastTimeUpdated) => {
  try {
    //console.log(email, password);
    const res = await axios({
      method: "PATCH",
      url: `/covid-api/moz/province/${id}`,
      data: {
        lastTimeUpdated,
        cases,
      },
    });
    if (res.data.status === "success") {
      console.log("alterado com sucesso");
    }
  } catch (error) {
    console.log("error......", error);
  }
};
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
