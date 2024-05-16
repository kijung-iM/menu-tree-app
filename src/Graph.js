import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { nodes, edges } from './Data';

const Graph = ({ filters, sortMethod, direction }) => {
  const container = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    const data = { nodes, edges };

    const options = {
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          direction,
          sortMethod,
          nodeSpacing: 100, // 노드 간의 간격 조정
          levelSeparation: 200, // 레벨 간의 간격 조정
        }
      },
      edges: {
        color: {
          color: '#333333',
          highlight: '#E7E750',
          hover: '#E7E750',
        },
        smooth: {
          enabled: true,
        },
        arrows: {
          to: {
            // enabled: true,
            scaleFactor: 1
          }
        }
      },
      nodes: {
        shape: 'box',
        size: 20,
        font: {
          size: 14,
          align: 'left'
        }
      },
      physics: {
        enabled: false,
      }
    };

    networkRef.current = new Network(container.current, data, options);

    const applyFilters = () => {
      const activeFilters = Object.keys(filters).filter(key => filters[key]);

      if (activeFilters.length === 0) {
        networkRef.current.setData(data);
        setTimeout(() => networkRef.current.fit(), 100); // 모든 노드와 엣지를 다시 표시하고 레이아웃 조정
        return;
      }

      const nodesToShow = nodes.filter(node =>
        node.groups.some(group => activeFilters.includes(group))
      );

      const nodeIdsToShow = nodesToShow.map(node => node.id);
      const edgesToShow = edges.filter(edge =>
        nodeIdsToShow.includes(edge.from) && nodeIdsToShow.includes(edge.to)
      );

      const updatedNodes = nodes.map(node => ({
        ...node,
        hidden: !nodeIdsToShow.includes(node.id)
      }));

      const updatedEdges = edges.map(edge => ({
        ...edge,
        hidden: !edgesToShow.includes(edge)
      }));

      networkRef.current.setData({
        nodes: updatedNodes,
        edges: updatedEdges
      });

      setTimeout(() => {
        networkRef.current.stabilize();
        networkRef.current.fit();
      }, 100); // 필터 적용 후 레이아웃 조정
    };
    
    applyFilters();

    return () => networkRef.current.destroy();
  }, [filters, sortMethod, direction]);

  return <div ref={container} style={{ width: '80vw', height: '50vh', border: '1px solid #333', margin: '20px auto' }} />;
};

export default Graph;