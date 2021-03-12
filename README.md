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
