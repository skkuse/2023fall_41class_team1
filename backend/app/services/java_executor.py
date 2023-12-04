import subprocess
import os
import re
import time

from constants import TIMEOUT

def execute_java_code(java_codes: dict):
    try:
        file_names = []
        class_names = []

        for key in java_codes:
            match = re.search(r'public\s+class\s+(\w+)', java_codes[key])
            class_name = match.group(1)
            file_name = f"{class_name}.java"
            file_names.append(file_name)
            class_names.append(class_name)
            with open(file_name, 'w') as file:
                file.write(java_codes[key])

        # 컴파일
        # capture_output=True -> stdout으로 출력된것들이 결과에 포함됩니다
        for file_name in file_names:
            compile_result = subprocess.run(
                ['javac', file_name], capture_output=True, text=True)
            if compile_result.returncode != 0:
                raise Exception(
                    f"Compilation error in {file_name}: {compile_result.stderr}")

        # main 메소드가 있는 클래스 찾기
        main_class_name = None
        for class_name in class_names:
            with open(f"{class_name}.java", 'r') as file:
                if "public static void main(String[] args)" in file.read():
                    main_class_name = class_name
                    break

        if main_class_name is None:
            raise Exception("No class with a main method found")

        start_time = time.perf_counter()
        end_time = 0
        try:
            execute_result = subprocess.run(
                ['java', '-Xint', main_class_name],
                capture_output=True, text=True, timeout=TIMEOUT)  # Set timeout to 10 seconds
        except subprocess.TimeoutExpired:
            delete_java_files(file_names, class_names)
            return {"status": "Failed", "error": "The Java program execution exceeded the time limit of 10 seconds and was terminated."}
            # Handle the timeout situation as needed
        else:
            end_time = time.perf_counter()
        runtime = end_time - start_time
        print(runtime)
        # .java랑 .class파일 지우기
        delete_java_files(file_names, class_names)

        return {"status": "Success", "output": execute_result.stdout, "runtime": runtime}

    except Exception as e:
        # Clean up: attempt to remove any remaining .java and .class files
        for file_name, class_name in zip(file_names, class_names):
            try:
                os.remove(file_name)
            except:
                pass
            try:
                os.remove(f"{class_name}.class")
            except:
                pass
        print(str(e))
        return {"status": "Failed", "error": str(e)}

def delete_java_files(file_names, class_names):
    for file_name, class_name in zip(file_names, class_names):
        os.remove(file_name)
        os.remove(f"{class_name}.class")

java_codes_example = {
    "code3": """
    public class BaseClass {
        public void show() {
            System.out.println("BaseClass show method called");
        }
    }
    """,

    "code2": """
    public class DerivedClass extends BaseClass {
        public void display() {
            System.out.println("DerivedClass display method called");
        }
    }
    """,

    "code1": """
    public class MainClass {
        public static void main(String[] args) {
            DerivedClass derived = new DerivedClass();
            derived.show(); // Calls the inherited method from BaseClass
            derived.display(); // Calls the method from DerivedClass
        }
    }
    """
}
