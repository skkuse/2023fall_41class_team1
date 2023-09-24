# SWE_Project

## Getting Started

### Backend
1. 명령 프롬프트(cmd)에서 프로젝트의 /backend 폴더로 이동
2. 필요한 Python 패키지 설치
```c
pip install -r requirements.txt
```
3. 서버 실행하기
```c
uvicorn main:app --reload --port=8000 --host=0.0.0.0
```
4. 실행후, 브라우저에서 localhost:8000 접속 후 {"status":200,"message":"hello from server"} 문구 확인하면 성공

### Frontend
1. node.js설치 / 최신 LTS 버전: 18.18.0 (includes npm 9.8.1) https://nodejs.org/ko/download
2. 명령 프롬프트(cmd)에서 프로젝트의 /frontend 폴더로 이동
3. 필요한 패키지 설치
```c
npm install
```
4. 실행하기
```c
npm start 
```
만약 추가로 설치가 필요한 패키지가 있다면
```c
npm install [패키지이름]
```
으로 설치해주세요
5. 실행된 화면에서 hello from server 문구 확인하면 성공

## Contributing

### Backend
새로운 패키지 설치 시, 다음 명령어를 꼭 실행해주세요
```c
pip freeze > requirements.txt
```

