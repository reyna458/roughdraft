$(document).ready(function () {

let windowWidth = $(document).width();
console.log(windowWidth)

let gridSize;

if (windowWidth > 531) {
    gridSize =  `1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;`
    console.log(gridSize)
} else {
    gridSize = `1fr 1fr 1fr 1fr`
    console.log(gridSize)
}

let datavizHTML = `
                <style>
                .bluebox {
                    background-color: #AFBDEE;
                    padding: 1em;
                    margin: .5em;
                    opacity: 1;
                    transition: opacity 2s ease-in;
                }

                .graybox {
                    background-color: #d9d9d9;
                    padding: 1em;
                    margin: .5em;
                    opacity: 1;
                    transition: opacity 2s ease-in;
                }
                
              

                .dataviz-grid {
                    display: grid;
                    grid-template-columns: ${gridSize};
                    max-width: 500px;
                }
                </style>

                <div class="dataviz-hed">
                    <h2>Of the fire's 31 confirmed fatalities, <span class='highlight'>at least 25</span> were confirmed to be elderly or disabled.</h2>
                </div>

                <div class="dataviz-grid">
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="bluebox"></div>
                    <div class="graybox"></div>
                    <div class="graybox"></div>
                    <div class="graybox"></div>
                    <div class="graybox"></div>
                    <div class="graybox"></div>
                    <div class="graybox"></div>
                </div>

                <div class="dataviz-supplemental">
                    <p><strong>Note:</strong> Elderly defined by being 65+ </p>
                    <p><strong>Source:</strong> <a href='https://me.lacounty.gov/2025/press-releases/wildfires-update-31st-death-related-to-the-january-wildfires-confirmed/' target="_blank">County of Los Angeles Medical Examiner</a></p>
                </div>
`


$('.data-viz-box').html(datavizHTML)

})