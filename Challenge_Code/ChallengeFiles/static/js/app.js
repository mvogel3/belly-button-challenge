const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
var myData 

// Fetching the JSON data and console logging it
d3.json(url).then(function(data) {
  myData = data
  let names = myData.names;
  names.forEach((name) => {
    d3.select("#selDataset").append("option").text(name);
  })

  // console.log(samples);
  optionChanged(myData)
  });
console.log(myData)

function buildMetadata(subjectId) { 
  console.log("building metadata")
  console.log(subjectId)
  let metadata = myData.metadata;
  let filteredMetadata = metadata.filter(result => result.id)
  let valueData = filteredMetadata[0]

  d3.select("#sample-metadata").html("");
  d3.select("#sample-metadata").append("div").text("id: " + valueData.id);
  d3.select("#sample-metadata").append("div").text("ethnicity: " + valueData.ethnicity);
  d3.select("#sample-metadata").append("div").text("gender: " + valueData.gender);
  d3.select("#sample-metadata").append("div").text("age: " + valueData.age);
  d3.select("#sample-metadata").append("div").text("location: " + valueData.location);
  d3.select("#sample-metadata").append("div").text("bbtype: " + valueData.bbtype);
  d3.select("#sample-metadata").append("div").text("wfreq: " + valueData.wfreq);

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
  // console.log(subjectId)
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
    title: '',
    showlegend: false,
    xaxis: {
      title: 'OTU ID'
    }
  };
  
  Plotly.newPlot('bubble', bubbleData, layout);
  

}

function optionChanged(subjectId) {
  buildMetadata(subjectId);
  buildBar(subjectId);
  buildBubble(subjectId);
  getData();

}

d3.selectAll("#selDataset").on("change", getData);

function getData() {
  let dropDown = d3.select("#selDataset");
  console.log("its me")
  console.log(dropDown)
  let dataset = dropDown.property("value");
  let filteredSamples = myData.samples;
  let filteredIds = filteredSamples.filter(result => result.id === dataset[0]);
  let otu_ids = filteredIds.otu_ids;
  let sample_values = filteredIds.sample_values
  let otu_labels = filteredIds.otu_labels
  let idSlice = otu_ids.slice(0, 10).map(r => `OTU ${r}`).reverse()
  let samples = sample_values.slice(0, 10).reverse()
  let labels = otu_labels.slice(0, 10).reverse()


		// BAR CHART
	Plotly.restyle("bar", "x", [samples]);
	Plotly.restyle("bar", "y", [idSlice.map(outId => `OTU ${outId}`)]);
	Plotly.restyle("bar", "text", [labels]);

		// BUBBLE CHART
	Plotly.restyle('bubble', "x", [otu_ids]);
	Plotly.restyle('bubble', "y", [sample_values]);
	Plotly.restyle('bubble', "text", [labels]);
	Plotly.restyle('bubble', "marker.color", [otu_ids]);
	Plotly.restyle('bubble', "marker.size", [sample_values]);

	// DEMOGRAPHIC INFO
	let metadata = myData.metadata;
  let filteredMetadata = metadata.filter(result => result.id) == dataset[0];
  d3.select("#sample-metadata").html("");
  Object.entries(filteredMetadata).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
}



optionChanged(myData)
d3.selectAll("#selDataset").on("change", getData);
console.log(myData)

    