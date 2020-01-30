

function makeChart(sample) {
    d3.json("samples.json").then(function(data) {
    let samples = data.samples;  
    let results1 = samples.filter(sampleObject => sampleObject.id == sample);
    let results = results1[0];
    let sampleValues = results.sample_values;
    let otu_ids = Object.values(results.otu_ids);
    let otu_labels = results.otu_labels;
    
    
let trace1 = {
    x: sampleValues.slice(0, 10),
    y: "OTU"  + otu_ids.slice(0, 10),
    // y: otu_ids.slice(0, 10),
    text: otu_labels.slice(0, 10),
    type: "bar",
    orientation: 'h',
   
};
let bar_data = [trace1];
let layout = {
    title: "Top 10 OTU IDs",
    xaxis: {title: "sample values",
showticklabels: true},
  
}
Plotly.newPlot("bar", bar_data, layout);
})
}