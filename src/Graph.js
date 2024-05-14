import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';

const Graph = ({ filters, sortMethod }) => {
  const container = useRef(null);
  const networkRef = useRef(null);

  const commoncolor = '#ABFDF1';
  const apmcolor = '#E7BCFF';
  const smcolor = '#C18145';
  const k8scolor = '#BCD9FF';
  const dbcolor = '#3AB48B';
  const urlcolor = '#4AC353';
  const brcolor = '#C46FD5';
  const cloudcolor = '#F1E187';
  const npmcolor = '#E7B579';

  useEffect(() => {
    const nodes = [
      { id: 'apm', label: 'APM', groups: ['apm'], color: { background: apmcolor } },
      { id: 'server', label: 'Server', groups: ['server'], color: { background: smcolor } },
      { id: 'k8s', label: 'Kubernetes', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'db', label: 'Database', groups: ['db'], color: { background: dbcolor } },
      { id: 'url', label: 'URL', groups: ['url'], color: { background: urlcolor } },
      { id: 'browser', label: 'Browser', groups: ['browser'], color: { background: brcolor } },
      { id: 'cloud', label: 'Cloud', groups: ['cloud'], color: { background: cloudcolor } },
      { id: 'npm', label: 'NPM', groups: ['npm'], color: { background: npmcolor } },
      { id: 'dashboard', label: '대시보드', groups: ['apm', 'server', 'k8s', 'mid'], color: { background: commoncolor } },
      { id: 'analysis', label: '분석', groups: ['apm', 'server', 'k8s', 'mid'], color: { background: commoncolor } },
      { id: 'topology', label: '토폴로지', groups: ['apm', 'mid'], color: { background: apmcolor } },
      { id: 'log', label: '로그', groups: ['apm', 'log', 'server', 'k8s', 'mid'], color: { background: commoncolor } },
      { id: 'report', label: '보고서', groups: ['apm', 'server', 'k8s', 'db', 'mid'], color: { background: commoncolor } },
      { id: 'alert', label: '경고 알림', groups: ['apm', 'server', 'k8s', 'db', 'mid'], color: { background: commoncolor } },
      { id: 'instanceperf', label: '인스턴스 성능 관리', groups: ['apm', 'mid'], color: { background: apmcolor } },
      { id: 'management', label: '관리', groups: ['apm', 'k8s', 'server', 'mid'], color: { background: commoncolor } },
      { id: 'serverList', label: '서버 목록', groups: ['server', 'mid'], color: { background: smcolor } },
      { id: 'static', label: '통계', groups: ['apm', 'mid'], color: { background: apmcolor } },
      { id: 'setserver', label: '서버 설정', groups: ['server', 'mid'], color: { background: smcolor } },
      { id: 'container', label: '컨테이너', groups: ['k8s', 'mid'], color: { background: k8scolor } },
      { id: 'workload', label: '워크로드', groups: ['k8s', 'mid'], color: { background: k8scolor } },
      { id: 'cluster', label: '클러스터', groups: ['k8s', 'mid'], color: { background: k8scolor } },
      { id: 'appdashboard', label: '애플리케이션 대시보드', groups: ['apm'], color: { background: apmcolor } },
      { id: 'txmap', label: '트랜잭션 맵', groups: ['apm'], color: { background: apmcolor } },
      { id: 'acttx', label: '액티브 트랜잭션', groups: ['apm'], color: { background: apmcolor } },
      { id: 'flexboard', label: 'Flex 보드', groups: ['apm', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'resourceboard', label: '리소스 보드', groups: ['server'], color: { background: smcolor } },
      { id: 'resourceequalizer', label: '리소스 이퀄라이저', groups: ['server'], color: { background: smcolor } },
      { id: 'compouneye', label: '컴파운드 아이', groups: ['server'], color: { background: smcolor } },
      { id: 'dailyapptrend', label: '일자별 애플리케이션 현황', groups: ['apm'], color: { background: apmcolor } },
      { id: 'perftrend', label: '성능 추이', groups: ['apm'], color: { background: apmcolor } },
      { id: 'metricchart', label: '메트릭스 차트', groups: ['apm', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'metricsearch', label: '메트릭스 조회', groups: ['apm', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'metricabnormal', label: '메트릭스 이상 탐지', groups: ['apm', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'stack', label: '스택', groups: ['apm'], color: { background: apmcolor } },
      { id: 'cube', label: '큐브', groups: ['apm', 'server'], color: { background: commoncolor } },
      { id: 'hitmap', label: '히트맵', groups: ['apm'], color: { background: apmcolor } },
      { id: 'multitx', label: '멀티 트랜잭션 추적', groups: ['apm'], color: { background: apmcolor } },
      { id: 'txsearch', label: '트랜잭션 검색', groups: ['apm'], color: { background: apmcolor } },
      { id: 'apmtopology', label: '애플리케이션 토폴로지', groups: ['apm'], color: { background: apmcolor } },
      { id: 'livetail', label: '라이브 테일', groups: ['apm', 'log', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'logtrend', label: '로그 트렌드', groups: ['apm', 'log', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'logsearch', label: '로그 검색', groups: ['apm', 'log', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'logsetting', label: '로그 설정', groups: ['apm', 'log', 'server', 'k8s'], color: { background: commoncolor } },
      { id: 'statictx', label: '트랜잭션', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticdomain', label: '도메인', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticcaller', label: 'Caller', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticlogin', label: '로그인', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticrefer', label: '리퍼러', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticerror', label: '에러', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticsql', label: 'SQL', groups: ['apm'], color: { background: apmcolor } },
      { id: 'statichttpcall', label: 'HTTP 호출', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticclientip', label: '클라이언트 IP', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticuseragent', label: '유저 에이전트', groups: ['apm'], color: { background: apmcolor } },
      { id: 'staticbrowser', label: '클라이언트 브라우저', groups: ['apm'], color: { background: apmcolor } },
      { id: 'setevent', label: '이벤트 설정', groups: ['apm', 'server', 'k8s', 'db' ], color: { background: commoncolor } },
      { id: 'eventconfig', label: '이벤트 수신 설정', groups: ['apm', 'server', 'k8s', 'db' ], color: { background: commoncolor } },
      { id: 'eventhistory', label: '이벤트 기록', groups: ['apm', 'server', 'k8s', 'db' ], color: { background: commoncolor } },
      { id: 'whatapevent', label: 'WhaTap 이벤트', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'runenv', label: '실행 환경 변수', groups: [ 'apm', 'server' ], color: { background: commoncolor } },
      { id: 'env', label: '환경 변수', groups: [ 'apm', 'server' ], color: { background: commoncolor } },
      { id: 'heap', label: '힙 히스토그램', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'loadclass', label: '로딩된 클래스', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'library', label: '라이브러리 버전', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'thread', label: '스레드 목록/덤프', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'socket', label: '소켓 오픈 개수', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'method', label: '메소드 성능 상태', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'datasource', label: '데이터소스 상태', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'agentlog', label: '에이전트 로그', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'systemgc', label: '시스템 GC', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'heapdump', label: '힙 덤프', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'throttle', label: '쓰로틀링 설정', groups: [ 'apm', 'k8s' ], color: { background: apmcolor } },
      { id: 'setagentold', label: '에이전트 설정 Old', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'moduledepen', label: '모듈 의존성', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'agentstatus', label: '에이전트 상태', groups: [ 'apm' ], color: { background: apmcolor } },
      { id: 'manageproject', label: '프로젝트 관리', groups: [ 'apm', 'server', 'k8s' ], color: { background: commoncolor } },
      { id: 'pmember', label: '프로젝트 멤버', groups: [ 'apm', 'server', 'k8s' ], color: { background: commoncolor } },
      { id: 'agentlist', label: '에이전트 목록', groups: [ 'apm' ], color: { background: commoncolor } },
      { id: 'agentupdate', label: '에이전트 업데이트', groups: [ 'apm' ], color: { background: commoncolor } },
      { id: 'setagent', label: '에이전트 설정', groups: [ 'apm', 'k8s' ], color: { background: commoncolor } },
      { id: 'agentinstall', label: '에이전트 설치', groups: [ 'apm', 'server', 'k8s' ], color: { background: commoncolor } },
      { id: 'maintenance', label: '정비 계획', groups: [ 'apm', 'server', 'k8s' ], color: { background: commoncolor } },
      { id: 'cloudinteg', label: '클라우드 모니터링', groups: [ 'apm', 'server' ], color: { background: commoncolor } },
      { id: 'serversubList', label: '서버 목록', groups: ['server'], color: { background: smcolor } },
      { id: 'serverdetail', label: '서버 상세', groups: ['server'], color: { background: smcolor } },
      { id: 'downcheck', label: '가용성 (다운체크)', groups: ['server'], color: { background: smcolor } },
      { id: 'subsetserver', label: '서버 설정', groups: ['server'], color: { background: smcolor } },
      { id: 'agentlogviewer', label: '에이전트 로그 뷰어', groups: ['server'], color: { background: smcolor } },
      { id: 'containermap', label: '컨테이너 맵', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'apmservicedashboard', label: '애플리케이션 서비스 대시보드', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'perfsummary', label: '퍼포먼스 요약', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'remoteaccess', label: '외부 호출 상태', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'containerList', label: '컨테이너 목록', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'containervolume', label: '컨테이너 볼륨', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'containerimage', label: '컨테이너 이미지', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'oomkilled', label: 'Out Of Memory Killed 컨테이너', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'podlist', label: 'Pod 목록', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'containerapp', label: '컨테이너 애플리케이션 목록', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'deployment', label: 'Deployment 목록', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'nodelist', label: '노드 목록', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'nodedetail', label: '노드 상세', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'objectmanifest', label: '오브젝트 매니페스트', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'kuberevent', label: '쿠버네티스 이벤트', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'podstartup', label: 'Pod 시작 분석', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'appHitmap', label: '애플리케이션 히트맵', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'multiHitmap', label: '멀티서비스 히트맵', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'msa', label: 'MSA 분석', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'appstack', label: '애플리케이션 스택', groups: ['k8s'], color: { background: k8scolor } },
      { id: 'intgeproject', label: '연계 프로젝트 관리', groups: ['k8s'], color: { background: k8scolor } },
    ];

    const edges = [
      { from: 'apm', to: 'dashboard' },
      { from: 'db', to: 'dashboard' },
      { from: 'url', to: 'dashboard' },
      { from: 'browser', to: 'dashboard' },
      { from: 'npm', to: 'dashboard' },
      { from: 'apm', to: 'analysis' },
      { from: 'apm', to: 'topology' },
      { from: 'apm', to: 'log' },
      { from: 'apm', to: 'static' },
      { from: 'apm', to: 'report' },
      { from: 'apm', to: 'alert' },
      { from: 'apm', to: 'instanceperf' },
      { from: 'apm', to: 'management' },
      { from: 'server', to: 'dashboard' },
      { from: 'server', to: 'report' },
      { from: 'server', to: 'serverList' },
      { from: 'server', to: 'analysis' },
      { from: 'server', to: 'log' },
      { from: 'server', to: 'alert' },
      { from: 'server', to: 'setserver' },
      { from: 'server', to: 'management' },
      { from: 'k8s', to: 'dashboard' },
      { from: 'k8s', to: 'container' },
      { from: 'k8s', to: 'workload' },
      { from: 'k8s', to: 'cluster' },
      { from: 'k8s', to: 'analysis' },
      { from: 'k8s', to: 'log' },
      { from: 'k8s', to: 'report' },
      { from: 'k8s', to: 'alert' },
      { from: 'k8s', to: 'management' },
      { from: 'dashboard', to: 'appdashboard' },
      { from: 'dashboard', to: 'txmap' },
      { from: 'dashboard', to: 'acttx' },
      { from: 'dashboard', to: 'flexboard' },
      { from: 'dashboard', to: 'resourceboard' },
      { from: 'dashboard', to: 'resourceequalizer' },
      { from: 'dashboard', to: 'compouneye' },
      { from: 'dashboard', to: 'containermap' },
      { from: 'dashboard', to: 'apmservicedashboard' },
      { from: 'dashboard', to: 'perfsummary' },
      { from: 'dashboard', to: 'remoteaccess' },
      { from: 'analysis', to: 'dailyapptrend' },
      { from: 'analysis', to: 'perftrend' },
      { from: 'analysis', to: 'metricchart' },
      { from: 'analysis', to: 'metricsearch' },
      { from: 'analysis', to: 'metricabnormal' },
      { from: 'analysis', to: 'stack' },
      { from: 'analysis', to: 'cube' },
      { from: 'analysis', to: 'hitmap' },
      { from: 'analysis', to: 'multitx' },
      { from: 'analysis', to: 'txsearch' },
      { from: 'analysis', to: 'podstartup' },
      { from: 'analysis', to: 'appHitmap' },
      { from: 'analysis', to: 'multiHitmap' },
      { from: 'analysis', to: 'msa' },
      { from: 'analysis', to: 'appstack' },
      { from: 'topology', to: 'apmtopology' },
      { from: 'log', to: 'livetail' },
      { from: 'log', to: 'logtrend' },
      { from: 'log', to: 'logsearch' },
      { from: 'log', to: 'logsetting' },
      { from: 'static', to: 'statictx' },
      { from: 'static', to: 'staticdomain' },
      { from: 'static', to: 'staticcaller' },
      { from: 'static', to: 'staticlogin' },
      { from: 'static', to: 'staticrefer' },
      { from: 'static', to: 'staticerror' },
      { from: 'static', to: 'staticsql' },
      { from: 'static', to: 'statichttpcall' },
      { from: 'static', to: 'staticclientip' },
      { from: 'static', to: 'staticuseragent' },
      { from: 'static', to: 'staticbrowser' },
      { from: 'alert', to: 'setevent' },
      { from: 'alert', to: 'eventconfig' },
      { from: 'alert', to: 'eventhistory' },
      { from: 'alert', to: 'whatapevent' },
      { from: 'instanceperf', to: 'runenv' },
      { from: 'instanceperf', to: 'env' },
      { from: 'instanceperf', to: 'heap' },
      { from: 'instanceperf', to: 'loadclass' },
      { from: 'instanceperf', to: 'library' },
      { from: 'instanceperf', to: 'thread' },
      { from: 'instanceperf', to: 'socket' },
      { from: 'instanceperf', to: 'method' },
      { from: 'instanceperf', to: 'datasource' },
      { from: 'instanceperf', to: 'agentlog' },
      { from: 'instanceperf', to: 'systemgc' },
      { from: 'instanceperf', to: 'heapdump' },
      { from: 'instanceperf', to: 'throttle' },
      { from: 'instanceperf', to: 'setagentold' },
      { from: 'instanceperf', to: 'moduledepen' },
      { from: 'instanceperf', to: 'agentstatus' },
      { from: 'management', to: 'manageproject' },
      { from: 'management', to: 'pmember' },
      { from: 'management', to: 'agentlist' },
      { from: 'management', to: 'agentupdate' },
      { from: 'management', to: 'setagent' },
      { from: 'management', to: 'agentinstall' },
      { from: 'management', to: 'maintenance' },
      { from: 'management', to: 'cloudinteg' },
      { from: 'management', to: 'throttle' },
      { from: 'management', to: 'intgeproject' },
      { from: 'serverList', to: 'serversubList' },
      { from: 'serverList', to: 'serverdetail' },
      { from: 'analysis', to: 'downcheck' },
      { from: 'setserver', to: 'subsetserver' },
      { from: 'setserver', to: 'agentlogviewer' },
      { from: 'setserver', to: 'runenv' },
      { from: 'setserver', to: 'env' },
      { from: 'container', to: 'containerList' },
      { from: 'container', to: 'containervolume' },
      { from: 'container', to: 'containerimage' },
      { from: 'container', to: 'oomkilled' },
      { from: 'workload', to: 'podlist' },
      { from: 'workload', to: 'containerapp' },
      { from: 'workload', to: 'deployment' },
      { from: 'cluster', to: 'nodelist' },
      { from: 'cluster', to: 'nodedetail' },
      { from: 'cluster', to: 'objectmanifest' },
      { from: 'cluster', to: 'kuberevent' }
    ];

    const data = { nodes, edges };

    const options = {
      layout: {
        improvedLayout: true,
        hierarchical: {
          direction: 'UD',
          sortMethod,
          nodeSpacing: 100, // 노드 간의 간격 조정
          levelSeparation: 200, // 레벨 간의 간격 조정
        }
      },
      edges: {
        color: '#333333',
        smooth: true,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1.2
          }
        }
      },
      nodes: {
        shape: 'box',
        size: 20,
        font: {
          size: 14
        }
      },
      physics: {
        enabled: false
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
  }, [filters, sortMethod]);

  return <div ref={container} style={{ width: '100vw', height: '100vh' }} />;
};

export default Graph;