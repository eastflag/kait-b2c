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
