import React from 'react';
import * as d3 from 'd3';

import './HistoryTree.css';

function createTree(list) {
  let tree = {
    name: "Start",
    children: null,
    chosen: true
  };
  let head = tree;

  list.forEach(historyItem => {
    head.children = [
      {name: historyItem.headsAction, children: null, chosen: historyItem.isHeads},
      {name: historyItem.tailsAction, children: null, chosen: !historyItem.isHeads}
    ];
    if (historyItem.isHeads) {
      head = head.children[0];
    } else {
      head = head.children[1];
    }
  });

  return tree;
}

class HistoryTree extends React.Component {
  componentDidMount() {
    this.createTreeDiagram();
  }

  componentDidUpdate() {
    this.createTreeDiagram();
  }

  onMouseOver = (id) => {
    //console.log(id);
  }

  createTreeDiagram = () => {
    const historyTree = createTree(this.props.historyItems);
  
    const hierarchy = d3.hierarchy(historyTree);
    hierarchy.dx = 75;
    hierarchy.dy = 150;
    const root = d3.tree().nodeSize([hierarchy.dx, hierarchy.dy])(hierarchy);

    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3.select(this.node);
    
    svg.selectAll("g").remove();
    
    const g = svg.append("g")
      .attr("font-size", 14);
      
    g.append("g")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
    
    const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .on("mouseover", (d, i) => this.onMouseOver(i));

    node.append("circle")
      .attr("fill", d => d.data.chosen ? "white" : "gray")
      .attr("r", 2.5);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.data.chosen ? -6 : 6)
      .attr("text-anchor", d => d.data.chosen ? "end" : "start")
      .style("fill", d => d.data.chosen ? "white" : "gray")
      .text(d => d.data.name)
      .clone(true).lower();
    
    const gNode = g.node();
    const bbox = gNode.getBBox();
    g.attr("transform", `translate(${-bbox.x}, ${-bbox.y})`);
    svg.attr("width", bbox.width).attr("height", bbox.height);

    this.div.scrollTo(bbox.width, 0);
  }

  render() {
    return (
      <div className="HistoryTree" ref={div => this.div = div}>
        <svg ref={node => this.node = node}></svg>
      </div>
    );
  }
}

export default HistoryTree;
