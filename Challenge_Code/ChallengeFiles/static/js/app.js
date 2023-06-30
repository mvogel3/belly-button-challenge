const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
var myData 

// Fetching the JSON data and console logging it
d3.json(url).then(function(data) {
  myData = data
  // console.log(samples);
  optionChanged(myData)
  });
console.log(myData)

function buildMetadata(subjectId) { 
  console.log("building metadata")
  console.log(subjectId)
  let metadata = subjectId.metadata;
}

function buildBar(subjectId) {
  console.log("building bar")
  let filteredSamples = myData.samples;
  console.log(filteredSamples)
  let filteredIds = filteredSamples.filter(result => result.id);
  console.log(filteredIds)
  let valueData = filteredIds[0]
  console.log(valueData)
  let otu_ids = valueData.otu_ids;
  console.log(otu_ids)
  let sample_values = valueData.sample_values
  console.log(sample_values)
  let otu_labels = valueData.otu_labels
  console.log(otu_labels)

  let idSlice = otu_ids.slice(0, 10).map(r => `OTU ${r}`).reverse()
  console.log(idSlice)
  let samples = sample_values.slice(0, 10).reverse()
  let labels = otu_labels.slice(0, 10).reverse()

  var barchart = [
    {
      x: samples,
      y: idSlice,
      text: labels,
      type: 'bar',
      orientation: 'h'
    }
  ];

  let barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };
  
  Plotly.newPlot('bar', barchart, barLayout);
  
}

function buildBubble(subjectId) {
  console.log("building bubble")
  console.log(subjectId)
  let filteredSamples = myData.samples;
  let filteredIds = filteredSamples.filter(result => result.id);
  let valueData = filteredIds[0]
  let otu_ids = valueData.otu_ids;
  let sample_values = valueData.sample_values
  let otu_labels = valueData.otu_labels

  var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids
    }
  };
  
  var bubbleData = [trace1];
  
  var layout = {
    title: 'Marker Size',
    showlegend: false,
    // height: 600,
    // width: 600
  };
  
  Plotly.newPlot('bubble', bubbleData, layout);
  

}

function optionChanged(subjectId) {
  buildMetadata(subjectId);
  buildBar(subjectId);
  buildBubble(subjectId);

}
   
function init() {
  console.log("init");
}


// var data = [
//   {
//     x: ['giraffes', 'orangutans', 'monkeys'],
//     y: [20, 14, 23],
//     type: 'bar'
//   }
// ];

// Plotly.newPlot('bar', data);

optionChanged(myData)
init();

console.log(myData)




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

    