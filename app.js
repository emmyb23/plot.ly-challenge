function buildMetadata(sample) {

  // fetch the metadata 
  var metadataURL = "/metadata/" + sample;
  var panelMetadata = d3.select("#sample-metadata");

    //   console.log(meatdataURL);

  // clear existing metadata
  panelMetadata.html("");
  d3.json("./data/samples.json").then(function (data) {

    Object.entries(data).forEach(([key, value]) => {
      panelMetadata.append("h5").text(`${key}: ${value}`);
    });


  })
}


function buildCharts(sample) {

  // fetch sample data for plots
  var chartsURL = "/samples/" + sample;
  d3.json(chartsURL).then((data) => {



    
  // bar chart valuse= sample_values, labels= otu_ids, hovertext=otu_labels
    var trace2 = [{
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      hovertext: data.otu_labels.slice(0, 10),
      type: "bar",
      marker: {
        colorscale: "YIGnBu"
      }
    }];
    var layout2 = {
      showlegend: true,
      height: 400,
      width: 500
    };
    Plotly.newPlot("bar", trace2, layout2);

// bubble chart x=otu_ids, y= sample_values, marker size= sample_values, marker color = otu_ids, text = otu_labels
    var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        mode: 'markers',
        text: data.otu_labels,
        marker: {
          color: data.otu_ids,
          size: data.sample_values,
          colorscale: "Portland"
        }
      };
      var trace1 = [trace1];
      var layout = {
        title: "OTU ID",
        showlegend: false,
        height: 600,
        width: 1500
      };
      Plotly.newPlot("bubble", trace1, layout);

  })
}

function init() {
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use first sample from each list for plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

    console.log(firstSample)
  });
}

function optionChanged(newSample) {
  
  buildCharts(newSample);
  buildMetadata(newSample);
}
init();