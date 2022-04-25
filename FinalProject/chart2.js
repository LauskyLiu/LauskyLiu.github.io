const margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 210 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

d3.csv("China_Crypto_2.csv",d => {
    return {date : d3.timeParse("%Y-%m-%d")(d.date), value : d.shareofChinesehashrate, city : d.province}}).then( function(data) {

    const sumstat = d3.group(data, d => d.city)

        console.log (sumstat)

    allKeys = new Set(data.map(d=>d.city))

    const svg = d3.select("#chart2")
    .selectAll("multi")
    .data(sumstat)
    .enter()
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date }))
    .range([ 0, width ]);
    svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(3));

    const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.value; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));

    const color = d3.scaleOrdinal()
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#639999', '#444000'])

    svg
    .append("path")
      .attr("fill", "none")
      .attr("stroke", function(d){ return color(d[0]) })
      .attr("stroke-width", 1.9)
      .attr("d", function(d){
        return d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(+d.value); })
          (d[1])
      })

      svg
      .append("text")
      .attr("text-anchor", "start")
      .attr("y", -5)
      .attr("x", 0)
      .text(function(d){ return(d[0])})
      .style("fill", function(d){ return color(d[0]) })
  
  })