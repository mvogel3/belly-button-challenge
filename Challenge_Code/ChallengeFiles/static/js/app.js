const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetching the JSON data and console logging it
d3.json(url).then(function(data) {
    console.log(data);
  });

  function buildMetadata() {
    return d3.json(url).then((data) => {
     let metadata = data.metadata;
     let names = data.names;
     let samples = data.samples;
   
     return { metadata, names, samples };
    });
   };
   
   function init() {
    buildMetadata().then((data) => {
      let trace = [{
       x: data.samples.sample_values,
       y: data.samples.otu_ids,
       type: "bar"
      }];

      Plotly.newPlot("bar", trace);
   })};

   init();

  //  d3.selectAll("#selDataset").on("change", getData);

  //  function getData() {
  //   let dropDown = d3.select("#selDataset");
  //   let dataset = dropDown.property("value");
  //   let value = [];
  //  }
    
    // let layout = {
    //   height: 600,
    //   width: 800
    // };
    // Plotly.newPlot("bar", trace, layout)

    