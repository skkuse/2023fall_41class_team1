import subprocess
import os
import re
import time

def execute_java_code(java_code: str):
    try:
        # 클래스 이름 추출
        match = re.search(r'public\s+class\s+(\w+)', java_code)
        
        class_name = match.group(1)
        file_name = f"{class_name}.java"

        with open(file_name, 'w') as file:
            file.write(java_code)

        # class파일 생성
        subprocess.run(['javac', file_name], capture_output=True, text=True)

        start_time = time.time()
        result = subprocess.run(['java', file_name], capture_output=True, text=True)
        end_time = time.time()
        runtime = end_time-start_time

        # .class파일과 .java파일 모두 삭제
        os.remove(file_name)
        os.remove(f"{class_name}.class")

        return {"status": "Success", "output": result,"runtime":runtime}

    except Exception as e:
        return {"status": "Failed", "error": str(e)}
