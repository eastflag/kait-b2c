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
  {"examples":  "1,2,3,4", "fomulas": null, "answers": "1,2"},
  {"examples":  "1,2,3,4|1,2,3,4", "fomulas": null, "answers": "1,2|1"},
  {"examples":  "X", "fomulas": "2,5", "answers": "@^{@}"},
  {"examples":  "X|X", "fomulas": "2,5|3,5", "answers": "@^{@}|@^{A}"}
]
```
변환
```json
[
  {"examples":  [[1,2,3,4]], "fomulas": null, "answers": [1]},
  {"examples":  [[1,2,3,4], [1,2,3,4]], "fomulas": null, "answers": []},
  {"examples":  [[]], "fomulas": ["2,5"], "answers": ["@^{@}"]},
  {"examples":  [[], []], "fomulas": ["2,5", "3,5"], "answers": ["@^{@}", "@^{A}"]}
]
```
