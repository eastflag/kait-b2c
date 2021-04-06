### UI
https://xd.adobe.com/view/cdbfc36a-0462-4730-9e9c-388b0bac4969-98ec/
### notion
https://www.notion.so/
### figma
https://www.figma.com/
### json 규칙
데이터
```json
[
    {"name": "0093", "examples":  "1,2,3,4", "equations": "", "answers": "2"},
    {"name": "0094", "examples":  "1,2,3,4", "equations": "", "answers": "1,2"},
    {"name": "0095", "examples":  "1,2,3,4|1,2,3,4", "equations": "|", "answers": "1,2|1"},
    {"name": "0096", "examples":  "X", "equations": "@^{@} \\times @^{@}", "answers": "2,5,3,4"},
    {"name": "0097", "examples":  "X|X", "equations": "@^{@} \\times @^{@}|@^{@} \\times @^{@}", "answers": "2,5,3,4|2,5,3,4"}
  ]
```
변환
```json
[
  {"examples":  [[1,2,3,4]], "fomulas": "|", "answers": [1]},
  {"examples":  [[1,2,3,4], [1,2,3,4]], "fomulas": "|", "answers": []},
  {"examples":  [[]], "fomulas": ["2,5"], "answers": ["@^{@}"]},
  {"examples":  [[], []], "fomulas": ["2,5", "3,5"], "answers": ["@^{@}", "@^{A}"]}
]
```

### 방 입장시 로직
message 이벤트 수신 설정
join 이벤트 발송
채팅방의 채팅 히스토리 가져오기
=> store에 저장
채팅메시지 수신시 store에 추가

https://anoto-my.sharepoint.com/:x:/g/personal/minchol_kang_kaitsolutions_com/EaxlWY-69kNAo9G5ftiOwnwB_d6Zxtj2bwOYTUXJmghuxQ?e=I9hmTS&CID=EF56339A-47FA-4119-8422-4CE7C41339C1&wdLOR=c903CCCCB-A5CC-4F81-914A-17B2B5A0D795


### 방 알람 로직
선생님입장: 학생방 가져오기
isJoined 가 true이면서,
학생이 여러명일수 있으므로 questionId로 distinct 해서 하나만 가져온다.
chat_history에 맨마지막 roleName도 가져온다.
chat_history의 맨 마지막이 user이면 클라이언트가 알람을 표시한다.
학생입장: 자기 id의 방정보를 isJoined true인 것만 가져온다.
방에 입장후 나가게 되면 isRead true 처리로 읾음 처리한다.
chat_history의 맨 마지막이 teacher 이고 isRead 0 이면 알람 표시.

학생이 의미없는 말을 했을 경우 클리어할 필요가 있다.
선생님방에서 읾음처리를 한다.
chat_history 테이블에 isClear 필드를 만들고 이 항목을 true로 만든다.
