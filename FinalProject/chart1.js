const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#chart1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",`translate(${margin.left},${margin.top})`);

      d3.csv("China_Crypto3.csv", d => {
        return {date : d3.timeParse("%Y-%m-%d")(d.date), value : d.monthly_absolute_hashrate}}).then(

            function(data) { const x = d3.scaleTime()
                .domain(d3.extent(data, d => d.date))
                .range([ 0, width ]);
              svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));

                const y = d3.scaleLinear()
                .domain( [0, 100])
                .range([ height, 0 ]);
              svg.append("g")
                .call(d3.axisLeft(y));

                svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                  .curve(d3.curveBasis)
                  .x(d => x(d.date))
                  .y(d => y(d.value))
                  )

                  const Tooltip = d3.select("#chart1")
                  .append("div")
                  .style("opacity", 0)
                  .attr("class", "tooltip")
                  .style("background-color", "white")
                  .style("border", "solid")
                  .style("border-width", "2px")
                  .style("border-radius", "5px")
                  .style("padding", "5px")

                  const mouseover = function(event,d) {
                    Tooltip
                      .style("opacity", 1)
                  }
                  const mousemove = function(event,d) {
                    Tooltip
                      .html("Exact value: " + d.value)
                      .style("left", `${event.layerX+10}px`)
                      .style("top", `${event.layerY}px`)
                  }
                  const mouseleave = function(event,d) {
                    Tooltip
                      .style("opacity", 0)
                  }

                  svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
        .attr("class", "myCircle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 8)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
})