import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import transactionBalances from "../../services/transactionBalances"
import graphAxis from "../../services/graphAxis"

const BalanceChart = (props) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (props.child.transactions.length == 0) {
      return
    }

    const transactionsWithBalance = transactionBalances(
      props.child.transactions,
    )

    const margin = { top: 20, right: 30, bottom: 100, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    d3.select(svgRef.current).selectAll("*").remove()
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
    const x = d3.scaleTime().range([0, innerWidth])
    const y = d3.scaleLinear().range([innerHeight, 0])
    const valueline = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.balance))
    const axisEndPoints = graphAxis(
      new Date(d3.min(transactionsWithBalance, (d) => d.date)),
      d3.min(transactionsWithBalance, (d) => d.balance),
      d3.max(transactionsWithBalance, (d) => d.balance),
    )
    x.domain([axisEndPoints.xMin, axisEndPoints.xMax])
    y.domain([axisEndPoints.yMin, axisEndPoints.yMax])

    svg
      .append("path")
      .data([transactionsWithBalance])
      .attr("class", "line")
      .attr("d", valueline)
      .attr("stroke", "var(--darkest-color)")
      .attr("stroke-width", 3)
      .attr("fill", "none")

    svg
      .selectAll(".dot")
      .data(transactionsWithBalance)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.balance))
      .attr("r", 4)
      .attr("fill", "var(--darkest-color)")

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(
            x.domain(d3.extent(transactionsWithBalance, (d) => d.date)),
          )
          .tickFormat(d3.timeFormat("%b %e, %y"))
          .ticks(20),
      )
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-1em")
      .attr("dy", "-0.5em")
      .attr("transform", "rotate(-90)")

    svg.append("g").call(
      d3
        .axisLeft(y)
        .tickFormat((d) => `$${d}`)
        .ticks(5),
    )
  }, [props])
  
  return <svg ref={svgRef} />
}

export default BalanceChart
