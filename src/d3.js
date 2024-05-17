import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { nodes, edges } from './Data';

const MenuTree = () => {
  const svgRef = useRef();

  useEffect(() => {
    // SVG 요소의 크기 설정
    const width = 800;
    const height = 600;

    // D3.js를 사용하여 SVG 요소 생성
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(50, 50)');

    // 노드 ID를 기준으로 인덱스 생성
    const nodeIndex = {};
    nodes.forEach((node, index) => {
      nodeIndex[node.id] = index;
    });

    // 에지 데이터를 기반으로 노드 계층 구조 생성
    const root = { id: 'root', children: [] };
    edges.forEach(edge => {
      const parentNode = nodes[nodeIndex[edge.from]];
      const childNode = nodes[nodeIndex[edge.to]];
      if (!parentNode.children) parentNode.children = [];
      parentNode.children.push(childNode);
    });
    root.children = nodes.filter(node => !edges.some(edge => edge.to === node.id));

    // D3.js의 트리 레이아웃 생성
    const tree = d3.tree().size([width - 100, height - 100]);

    // 데이터를 트리 레이아웃에 전달
    const hierarchy = d3.hierarchy(root);
    tree(hierarchy);

    // 노드 렌더링
    svg.selectAll('.node')
      .data(hierarchy.descendants())
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 5)
      .style('fill', d => d.data.color?.background || 'steelblue');

    // 링크 렌더링
    svg.selectAll('.link')
      .data(hierarchy.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y))
      .style('stroke', '#ccc')
      .style('stroke-width', 1.5);

    // 노드 레이블 렌더링
    svg.selectAll('.label')
      .data(hierarchy.descendants())
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => d.x + 10)
      .attr('y', d => d.y + 5)
      .text(d => d.data.label)
      .style('font-size', '12px')
      .style('fill', '#333');
  }, []);

  return <svg ref={svgRef} />;
};

export default MenuTree;