import React from 'react';
import { nodes, edges } from './Data';

const TableComponent = ({ filters }) => {
  // 'mid' 그룹에 속한 노드를 필터링하여 테이블 헤더로 사용
  const midNodes = nodes.filter(node => node.groups.includes('mid'));

  // 활성화된 필터 목록
  const activeFilters = Object.keys(filters).filter(key => filters[key]);

  // midNodes 중 activeFilters와 그룹이 겹치는 것만 사용
  const filteredMidNodes = midNodes.filter(midNode =>
    midNode.groups.some(group => activeFilters.includes(group))
  );

  // 각 midNode와 연결된 to 노드 목록 생성 (필터 적용)
  const getToNodes = (midNodeId) => {
    return edges
      .filter(edge => edge.from === midNodeId)
      .map(edge => edge.to)
      .filter(toNodeId => {
        const toNode = nodes.find(node => node.id === toNodeId);
        return toNode && toNode.groups.some(group => activeFilters.includes(group));
      });
  };

  return (
    <div className='menutable'>
        <table border="1">
        <thead>
            <tr>
            {filteredMidNodes.map(midNode => (
                <th key={midNode.id} groups={midNode.groups.join(', ')}>{midNode.label}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            <tr>
            {filteredMidNodes.map(midNode => (
                <td key={midNode.id}>
                {getToNodes(midNode.id).map(toNodeId => {
                    const toNode = nodes.find(node => node.id === toNodeId);
                    return <div key={toNodeId} id='menuitem' groups={toNode.groups.join(', ')} className={toNode.color.background.replace('#', 'color-')}>{toNode.label}</div>;
                })}
                </td>
            ))}
            </tr>
        </tbody>
        </table>
    </div>
  );
};

export default TableComponent;
