import subprocess
import os

def execute_java_code(java_code: str):
    try:
        with open('TempJava.java', 'w') as file:
            file.write(java_code)
        
        compile_process = subprocess.run(['javac', 'TempJava.java'], capture_output=True, text=True)
        if compile_process.returncode != 0:
            return {"status": "Compilation Error!", "error": compile_process.stderr}
        
        run_process = subprocess.run(['java', 'TempJava'], capture_output=True, text=True)
        if run_process.returncode == 0:
            output = run_process.stdout
        else:
            return {"status": "Runtime Error!", "error": run_process.stderr}

        os.remove('TempJava.java')
        os.remove('TempJava.class')
        
        return {"status": "Success", "output": output}

    except Exception as e:
        return {"status": "Failed", "error": str(e)}
