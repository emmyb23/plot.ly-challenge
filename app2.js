// make function to pull in data
function buildMetaData(sample){

// use d3 to pull data
d3.json("./samples.json").then(function(data){

  // find #sample-metadata and use first sample
      var sample_metadata = d3.select("#sample-metadata");
      var metadata = data.metadata;
      var result = metadata.filter(sampleobj => sampleobj.id==sample)[0]
  
  // clear any existing metadata
      sample_metadata.html("");
      
  // add each key and value pair
      Object.entries(result).forEach(([key, value]) => {

        var row = sample_metadata.append("p");
        row.text(`${key}: ${value}`);
        console.log(result);
      })
    });
}

function buildCharts(sample) {
  
  d3.json("./samples.json").then(function(data){
    var samples = data.samples;
    var result = samples.filter(sampleobj => sampleobj.id==sample)[0]

  // buble plot
      var xValues = result.otu_ids;
      var yValues = result.sample_values;
      var mSize = result.sample_values;
      var mClrs = result.otu_ids;
      var tValues = result.otu_values;
      
      var traceBubble = {
        x: xValues,
        y: yValues,
        text: tValues,
        mode: 'markers',
        marker: {
          size: mSize,
          color: mClrs
        }
      };
  
      var data = [traceBubble];
      var layout = {
        xaxis: {title: "OTU ID"}
      };
  
      Plotly.newPlot('bubble', data, layout);

 // Bar plot
    var barValue = result.sample_values.slice(0,10).reverse();
    var otuIdsBAR = result.otu_ids.slice(0,10).map((item => "ITU " + item)).reverse(); 
    var otuLabelsBAR = result.otu_labels.slice(0,10).reverse();

 
    var traceBAR = {
    x: barValue,
    y: otuIdsBAR,
    text: "OTU bar",
    type: 'bar',
    orientation: "h",
    };


    var dataBAR = [traceBAR];
    var layoutBAR = {
    title: "Top 10 OTUs found in the Belly Button!",
    margin: { l: 50,},
    xaxis: { title: "Quantity Found" },
    // yaxis: { title: "OTU" }
    colorSet: "greenShades"
    };  

    Plotly.newPlot("bar-plot", dataBAR, layoutBAR);

//  pie plot
    var pieValue = result.sample_values.slice(0, 10);
    var pieLabel = result.otu_ids.slice(0, 10);
    var pieHover = result.otu_labels.slice(0, 10);

    var data = [{
    values: pieValue,
    labels: pieLabel,
    hovertext: pieHover,
    type: 'pie',
    theme:"light2"
    }];

    Plotly.newPlot('pie', data);

    });
    }

    // Define the function to initialize the data
    function init(){
     d3.json("./samples.json").then(function(data){
     var selector = d3.select("#selDataset");
        var sampleNames = data.names;
        sampleNames.forEach((sample)=>{
        selector.append("option").text(sample).property("value", sample);
    })
        buildMetaData(sampleNames[0])
        buildCharts(sampleNames[0])
  });
}

init();
    
// make function for new sample drop down
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  buildMetaData(dataset)
  buildCharts(dataset)
};