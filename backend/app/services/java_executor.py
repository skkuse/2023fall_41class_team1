import subprocess
import os
import re
import time

from constants import TIMEOUT


def delete_java_files(file_names, class_names):
    for file_name, class_name in zip(file_names, class_names):
        os.remove(file_name)
        os.remove(f"{class_name}.class")


def compile_java_files(file_names, class_names):
    for file_name in file_names:
        compile_result = subprocess.run(
            ['javac', file_name], capture_output=True, text=True)
        print(compile_result)
        if compile_result.returncode != 0:
            raise SyntaxError(
                f"Compilation error in {file_name}: {compile_result.stderr}")


def find_main_class(class_names):
    for class_name in class_names:
        with open(f"{class_name}.java", 'r') as file:
            if "public static void main(String[] args)" in file.read():
                return class_name
    raise FileNotFoundError("No class with a main method found")


def execute_java_code(java_codes: dict):
    ret = {"status":"init"}
    start_time=0
    end_time=0
    runtime=0
    try:
        file_names, class_names = prepare_java_files(java_codes)
        compile_java_files(file_names, class_names)
        main_class_name = find_main_class(class_names)

        start_time = time.perf_counter()
        execute_result = subprocess.run(
            ['java', main_class_name], capture_output=True, text=True, timeout=TIMEOUT)
        end_time = time.perf_counter()
        runtime = end_time - start_time
        if execute_result.returncode != 0:
            delete_java_files(file_names, class_names)
            ret =  {"status": "RuntimeFailed", "error": execute_result.stderr}
    except subprocess.TimeoutExpired:
        delete_java_files(file_names, class_names)
        ret = {"status": "TimeoutFailed", "error": "Execution time exceeded the limit"}
    except SyntaxError as e:
        delete_java_files(file_names, class_names)
        ret = {"status": "Failed", "error": str(e)}
    except FileNotFoundError as e:
        ret = {"status": "Failed", "error": str(e)}
            
    if ret['status'] == "init":
        delete_java_files(file_names, class_names)
        ret = {"status": "Success", "output": execute_result.stdout, "runtime": runtime}

    print(ret)
    return ret


def prepare_java_files(java_codes: dict):
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
    return file_names, class_names


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
