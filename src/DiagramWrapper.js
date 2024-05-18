import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { nodes, edges } from './Data';

const initDiagram = () => {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, {
    initialAutoScale: go.AutoScale.UniformToFill,
    'undoManager.isEnabled': true,  // enable undo & redo
    allowZoom: true,
    allowHorizontalScroll: true,
    allowVerticalScroll: true,
    layout: $(go.TreeLayout, {
      angle: 0,  // 트리 방향 (0도: 위에서 아래로)
      layerSpacing: 500,  // 레이어 간의 간격
      nodeSpacing: 10,  // 노드 간의 간격
      alignment: go.TreeAlignment.Start  // 정렬 방식 (여기서는 왼쪽 정렬)
    }),
    'toolManager.mouseWheelBehavior': go.WheelMode.Zoom  // 마우스 휠로 확대/축소 설정
  });

  diagram.nodeTemplate = $(
    go.Node, "Auto",
    $(go.Shape, "RoundedRectangle", { 
      fill: "white"
    },
    new go.Binding("fill", "color", (c) => c.background)),
    $(go.TextBlock, { margin: 5 },
      new go.Binding("text", "label"))
  );

  diagram.linkTemplate = $(
    go.Link,
    { 
      curve: go.Curve.Bezier, 
      reshapable: true,
      curviness: 40,
      adjusting: go.LinkAdjusting.Stretch,
      reshapable: true,
      relinkableFrom: true,
      relinkableTo: true,
    },  // 선 모양을 곡선으로 설정
    $(go.Shape, { strokeWidth: 0.5 }),  // 링크 선 모양
    $(go.Shape, { toArrow: "" })  // 화살표 제거
  );

  return diagram;
}

const DiagramWrapper = () => {
  const diagramRef = useRef();

  useEffect(() => {
    if (diagramRef.current) {
      const diagram = diagramRef.current.getDiagram();
      diagram.model = new go.GraphLinksModel(
        nodes.map(node => ({ key: node.id, ...node })),
        edges.map(edge => ({ from: edge.from, to: edge.to }))
      );
    }
  }, []);

  return (
    <ReactDiagram
      ref={diagramRef}
      initDiagram={initDiagram}
      divClassName='diagram-component'
      style={{ width: '80vw', height: '50vh', border: '1px solid #333', margin: '20px auto' }}
    />
  );
}

export { DiagramWrapper };
