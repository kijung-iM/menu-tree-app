# WhaTap 모니터링 메뉴 트리 뷰어

와탭의 모니터링 서비스의 상품 유형별 메뉴 트리를 정리해 웹에서 확인할 수 있는 앱입니다.

해당 저장소를 내려 받은 후 `yanr install` 명령어를 이용해 패키지를 설치하세요.

## 메뉴명 및 트리 관계

*./src/Graph.js* 파일에서 확인할 수 있습니다.

다음은 메뉴 이름과 id, 그룹을 설정한 코드입니다.

```
{ id: 'topology', label: '토폴로지', groups: ['apm', 'mid'], color: { background: apmcolor } },
```

* `id`: 메뉴명 ID 값
* `label`: 메뉴 이름
* `groups`: 메뉴를 필터링하기 위한 배열
* `color`: 해당 메뉴의 색상

다음은 메뉴들의 연관 관계를 설정한 코드입니다.

```
{ from: 'analysis', to: 'dailyapptrend' },
```

`from`에 설정된 `id` 값과 `to`에 설정된 `id` 값이 서로 연결됩니다.

참조: <https://github.com/visjs/vis-network.git>

## 배포

Action의 트리커 메뉴를 이용해 배포할 수 있습니다. 배포 주소는 <https://whatap.github.io/menu-tree-app/> 입니다.
