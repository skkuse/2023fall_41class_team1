# SWE_Project

## Backend
1. 명령 프롬프트(cmd)에서 프로젝트의 /backend 폴더로 이동
2. pip install fastapi uvicorn
3. uvicorn --reload --port=8000 --host=0.0.0.0
4. 실행후, 브라우저에서 localhost:8000 접속해서 {"status":200,"message":"hello from server"} 문구 확인하면 성공

## Frontend
1. 명령 프롬프트(cmd)에서 프로젝트의 /frontend 폴더로 이동
2. npm install
3. npm start (추가로 설치가 필요한 패키지가 있다면 npm install [패키지이름] 으로 설치해주세요 뭐 설치해야됐는지 잘 기억이 안나네요..)
4. 실행된 화면에서 hello from server 문구 확인하면 성공
