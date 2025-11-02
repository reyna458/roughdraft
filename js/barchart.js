$(document).ready(function () {
  const windowWidth = $(document).width();
  const barSize = windowWidth > 531 ? "100%" : "90%";

  const box1Head = `<h2>On average, people with disabilities were <span class='highlight'>almost twice as likely</span> to be displaced in a natural disaster.</h2>`;
  const box2Head = `<h2>People with disabilities were <span class='highlight'>nearly four times as likely</span> to have not returned home, a year after displacement.</h2>`;
  let question;

  $(".bar-chart-box").each(function () {
    const $box = $(this);
    const whichBox = $box.attr("id");

    let dataType, boxHead, highPCT, multiplier, startPCTDisabled, startPCTNon, dataOrder;

    // === Chart Configurations ===
    if (whichBox === "barchart1") {
      dataType = "data/displaced-data.json";
      boxHead = box1Head;
      highPCT = `5%`;
      multiplier = 20;
      question = `Percentage of respondents displaced by natural disaster in the past year`

      // ✅ FIXED: reverse values so disabled is on top (to match chart 2)
      startPCTDisabled = 2.94;
      startPCTNon = 1.49;
      dataOrder = { disabledIndex: 1, nonDisabledIndex: 0 };
    } else if (whichBox === "barchart2") {
      dataType = "data/displacementlength.json";
      boxHead = box2Head;
      highPCT = `40%`;
      multiplier = 2.857;
      question = `Percentage of respondents who had not returned home, a year after displacement`

      startPCTDisabled = 21.51;
      startPCTNon = 5.83;
      dataOrder = { disabledIndex: 0, nonDisabledIndex: 1 };
    } else {
      console.warn(`Unknown box ID: ${whichBox}`);
      return;
    }

    // === Inject chart markup ===
    $box.html(`
      <style>
        .dropdown-list { display: none; background-color: rgb(0,0,0); padding: 2.5%; border-radius: 25px; }
        .dropdown-list.active { display: inline; position: absolute; height: fit-content; list-style-type: none; }
        .mode:hover { text-decoration: underline; cursor: pointer; }
        .dropdown-list li { color: white; font-family: "Raleway", sans-serif; cursor: pointer; }
        .dropdown-list li:hover { text-decoration: underline; }
        .dropdown { rotate: 270deg; max-width: 10px; cursor: pointer; }
        .dropdown-menu { width: 100%; display: grid; grid-template-columns: 3fr 1fr 3fr 3fr; margin-bottom: 2.5%; align-items: end; grid-template-rows: 1fr, 1fr; }
        .barchart div { display: grid; grid-template-columns: 3fr 1fr; padding: 0 2.5%; align-items: center; }
        .barchart-axis { border-top: white solid 3px; width: ${barSize}; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
        .lowpct { grid-column: 1; justify-self: left; }
        .highpct { grid-column: 5; justify-self: right; }
        .disabled { background-color: #AFBDEE; transition: width 1s ease-in-out; overflow: visible; }
        .non-disabled { background-color: #d9d9d9; transition: width 1s ease-in-out; overflow: visible; }
        .barchart h6 { color: black; font-size: 125%; padding-left: 5px; }
        .disabled-legend { background-color: #AFBDEE; padding: 1%; color: black; grid-column: 3; font-family: 'Raleway', sans-serif; width: 80%; font-size: 75%; }
        .nondisabled-legend { background-color: #d9d9d9; padding: 1%; color: black; grid-column: 4; font-family: 'Raleway', sans-serif; width: 80%; font-size: 75%; }
        .question { grid-row: 2; grid-column: 1 / span 4;}
      </style>

      <div class="dataviz-hed">${boxHead}</div>

      <div class="dropdown-menu">
        <h3 class="mode">Average</h3>
        <img class="dropdown" src="assets/arrow-left.png">
        <ul class="dropdown-list">
          <li>Average</li>
          <li>Seeing</li>
          <li>Hearing</li>
          <li>Understanding</li>
          <li>Self Care</li>
          <li>Walking</li>
          <li>Remembering and concentrating</li>
        </ul>
        <p class='disabled-legend'>Disabled</p>
        <p class='nondisabled-legend'>Non-disabled</p>
        <p class='question'>${question}</p>
      </div>

      <div class="barchart">
        <div class="disabled">
          <h6 class="disabled-percentage">${startPCTDisabled.toFixed(2)}%</h6>
        </div>
        <div class="non-disabled">
          <h6 class="non-disabled-percentage">${startPCTNon.toFixed(2)}%</h6>
        </div>
      </div>

      <div class="barchart-axis">
        <h6 class="lowpct">0%</h6>
        <h6 class="highpct">${highPCT}</h6>
      </div>

      <div class="dataviz-supplemental">
        <p><strong>Note:</strong> Disability categories determined by the U.S. Census Survey.</p>
        <p><strong>Source:</strong> <a href='https://www.census.gov/data/tables/2024/demo/hhp/cycle09.html' target="_blank">U.S. Census Bureau</a></p>
      </div>
    `);

    // === Load JSON Data ===
    $.getJSON(dataType, function (data) {
      const $dropdown = $box.find(".dropdown");
      const $list = $box.find(".dropdown-list");
      const $mode = $box.find(".mode");
      const $disabled = $box.find(".disabled");
      const $nonDisabled = $box.find(".non-disabled");
      const $disabledPct = $box.find(".disabled-percentage");
      const $nonDisabledPct = $box.find(".non-disabled-percentage");

      // Initial scaled widths
      $disabled.css("width", startPCTDisabled * multiplier + "%");
      $nonDisabled.css("width", startPCTNon * multiplier + "%");

      // Toggle dropdown
      $dropdown.on("click", () => $list.toggleClass("active"));
      $mode.on("click", () => $list.toggleClass("active"));

      function getValue(obj, key) {
        for (const k in obj) {
          if (k.trim().toLowerCase() === key.trim().toLowerCase()) {
            return obj[k];
          }
        }
        return null;
      }

      // Dropdown item click
      $list.find("li").on("click", function () {
        const chosenMode = $(this).text().trim();

        const disabledWidth = getValue(data[dataOrder.disabledIndex], chosenMode);
        const nonDisabledWidth = getValue(data[dataOrder.nonDisabledIndex], chosenMode);

        if (disabledWidth && nonDisabledWidth) {
          const disabledNum = parseFloat(disabledWidth);
          const nonDisabledNum = parseFloat(nonDisabledWidth);

          $disabled.css("width", disabledNum * multiplier + "%");
          $nonDisabled.css("width", nonDisabledNum * multiplier + "%");

          $disabledPct.text(`${disabledNum.toFixed(2)}%`);
          $nonDisabledPct.text(`${nonDisabledNum.toFixed(2)}%`);
          $mode.text(chosenMode);
        }

        $list.removeClass("active");
      });
    });
  });
});
