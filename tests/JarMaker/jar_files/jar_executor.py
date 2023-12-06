import subprocess

# ex) 본인 번호가 11~15번이면 range(11,16)
file_range = range(1, 33)

for i in file_range:
    before_file = f'before_{i}.jar'
    after_file = f'after_{i}.jar'

    subprocess.run(['java', '-jar', before_file])

    print(str(i)+ "번 before.jar 실행 완료")

    subprocess.run(['java', '-jar', after_file])

    print(str(i)+ "번 after.jar 실행 완료")


print("---실행 완료가 표시됐다고 해서 무조건 정상적으로 실행됐다는 뜻은 아닙니다---")
print("---중간에 오류 메시지가 있나 꼭 확인해주세요---")
