import {useEffect, useRef} from "react";
import * as d3 from "d3";

function ColorStats({ data }) {
    const svgRef =  useRef(null);
    useEffect(() => {
        const element = svgRef.current;
        element.innerHTML = '';
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(Object.keys(data))
            .range(['#F0E68C', '#4682B4', '#2F4F4F', '#B22222', '#228B22', '#A9A9A9']);

        const pie = d3.pie()
            .value(d => data[d])
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const label = document.createElement('label');
        label.textContent = "Deck Mana Color Distribution";
        label.classList.add("colorLabel");
        element.appendChild(label);

        const svg = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const arcs = svg.selectAll("arc")
            .data(pie(Object.keys(data)))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data));

    }, [data]);

    return <div id="colorStats" ref={svgRef}>

    </div>
}
export {ColorStats}