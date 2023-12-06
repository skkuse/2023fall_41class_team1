import subprocess
import os
import re
import shutil


def find_main_class_name(file_path):
    class_name_pattern = re.compile(r'public class (\w+)')
    with open(file_path, 'r', encoding='utf-8') as file:  # UTF-8 인코딩을 사용
        for line in file:
            class_match = class_name_pattern.search(line)
            if class_match:
                return class_match.group(1)
    return None

for original_file in os.listdir('.'):
    if original_file.endswith('.java'):
        main_class_name = find_main_class_name(original_file)
        if main_class_name is not None:
            renamed_file = main_class_name + '.java'
            shutil.move(original_file, renamed_file)
            # 원본 남겨두기
            shutil.copy(renamed_file, original_file)

            subprocess.run(['javac', '-target', '11', '-source', '11', renamed_file])

            jar_name = original_file[:-5] + '.jar'
            class_files = ' '.join(f for f in os.listdir('.') if f.endswith('.class'))
            subprocess.run(f'jar cfe {jar_name} {main_class_name} {class_files}', shell=True)

            for class_file in os.listdir('.'):
                if class_file.endswith('.class'):
                    os.remove(class_file)

for java_file in os.listdir('.'):
    if java_file.endswith('.java'):
        os.remove(java_file)
                    
                    




print('---.jar파일이 모두 생성됐나 확인해주세요---')
print('---모두 생성됐다면, jar_executor.py를 실행해주세요---')
