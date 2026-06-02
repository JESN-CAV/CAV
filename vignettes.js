class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  addCard(config) {
    switch (config.type) {

      case "stat":
        this.renderStatCard(config);
        break;

      case "donut":
        this.renderDonutCard(config);
        break;

      default:
        console.warn("Unknown card type:", config.type);
    }
  }

  renderStatCard({
    title,
    value,
    description
  }) {

    const card = document.createElement("div");
    card.className = "widget-card";

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title">${title}</div>
        <div class="info-icon">i</div>
      </div>

      <div class="stat-value">${value}</div>

      <div class="stat-description">
        ${description}
      </div>
    `;

    this.container.appendChild(card);
  }

  renderDonutCard({
    title,
    total,
    conformant,
    nonConformant
  }) {

    const percent =
      (conformant / total) * 100;

    const circumference = 2 * Math.PI * 70;

    const greenOffset =
      circumference -
      (percent / 100) * circumference;

    const card = document.createElement("div");
    card.className = "widget-card";

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title">${title}</div>
        <div class="info-icon">i</div>
      </div>

      <div class="donut-layout">

        <div class="donut-wrapper">

          <svg width="170" height="170" viewBox="0 0 170 170">

            <circle
              cx="85"
              cy="85"
              r="70"
              stroke="#ececec"
              stroke-width="16"
              fill="none"
            />

            <circle
              cx="85"
              cy="85"
              r="70"
              stroke="#6dbb63"
              stroke-width="16"
              fill="none"

              stroke-dasharray="${circumference}"
              stroke-dashoffset="${greenOffset}"

              stroke-linecap="round"

              transform="rotate(-90 85 85)"
            />
          </svg>

          <div class="donut-center">
            <div class="donut-total">${total}</div>
            <div class="donut-label">
              Wine Bottles
            </div>
          </div>
        </div>

        <div class="legend">

          <div class="legend-item">
            <div class="legend-color green"></div>
            ${conformant} Available
          </div>

          <div class="legend-item">
            <div class="legend-color red"></div>
            ${nonConformant} Empty
          </div>

        </div>

      </div>
    `;

    this.container.appendChild(card);
  }
}

function InitAllCards(){
  const dashboard = new Dashboard("wine-overview");

  dashboard.addCard({
      type: "stat",
      title: "Bouteilles",
      value: BottleCount(),
      description:
        "Nombre total de bouteilles en cave"
    });

    /*dashboard.addCard({
      type: "donut",
      title: "Disponibilité",
      total: 248,
      conformant: 180,
      nonConformant: 68
    });*/

    dashboard.addCard({
      type: "stat",
      title: "Valeur",
      value: CellarEstimation(),
      description:
        "Estimation actuelle de la cave"
    });
    dashboard.addCard({
      type: "stat",
      title: "Bues",
      value: isWithinLastMonths(parseDateFR(row[2]),12,0),
      description:
        "Bouteilles bues / 12 mois"
    });
  }


function BottleCount() {
    const count = allData.filter(row =>
        String(row[0] ?? "").trim() !== "" &&
        String(row[1] ?? "").trim() === "" &&
        String(row[2] ?? "").trim() === ""
        ).length;
    return count;
    }
function CellarEstimation() {
    const cellarValue = allData
    .filter(row => {

      const col1 = String(row[0] ?? "").trim();
      const col2 = String(row[1] ?? "").trim();
      const col3 = String(row[2] ?? "").trim();

      return (
        col1 !== "" &&
        col2 === "" &&
        col3 === ""
      );
    })

    .reduce((sum, row) => {

      const prix = parseFloat(
        String(row[6] ?? "0")
          .replace(",", ".")
      );

      return sum + (isNaN(prix) ? 0 : prix);

    }, 0);  
    return Math.round(cellarValue).toLocaleString("fr-FR") + "€"
    //return "12 350€";
    }
    // retourne les bouteilles bues sur les 12 derbiers mois
function getLast12MonthsRows(data = allData) {

  return data.filter(row => {
    const drinkDate = parseDateFR(row[BueEnc]);
      return isWithinLastMonths(drinkDate,12,drinkedOffsetYears);});  
}