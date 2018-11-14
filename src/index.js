//import * as d3 from 'd3v4' // hard import

var diameter = 840,
    format = d3.format(",d"),
    color = {"Tdark":"#3792EC", "Tbio":"#389732", "Tchem":"#F0F37F"}; // create a duct if cikirubg
    //d3.scaleOrdinal(d3.schemeCategory20c) // original coloring

var bubble = d3.pack()
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#bubble_viz").append("svg:svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.json("viz.json", function(error, data) {
  if (error) throw error;

  var root = d3.hierarchy(classes(data))
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });

  bubble(root);
  var node = svg.selectAll(".node")
      .data(root.children)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.data.className + ": " + format(d.value); });

  node.append("a")
      .attr("xlink:href", function(d){
        return "http://darkkinome.org/kinase/"+d.data.className.substring(0, d.r / 3);
      })
      .append("svg:circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) {
        return color[d.data.packageName];
      })
      .style("stroke", "#000")
      .style("stroke-width", .2);

  d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-family", "verdana")
      .style("font-size", function (d) { return (d.r/5+5).toString()+"px" } )
      .text(function(d) { return d.data.className.substring(0, d.r / 3); });

  node.on("mouseover", function (d) {
        d3.select(this).select("text")
            .style("font-size", function (d) { return ((d.r/5+5)*1.2).toString()+"px" } );
        d3.select(this).select("a")
            .attr("transform", "scale(1.2,1.2)");
        d3.select(this).moveToFront() });

  node.on("mouseout", function (d) {
        d3.select(this).select("text")
            .style("font-size", function (d) { return (d.r/5+5).toString()+"px" });
        d3.select(this).select("a")
            .attr("transform", "scale(1.0,1.0)"); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
