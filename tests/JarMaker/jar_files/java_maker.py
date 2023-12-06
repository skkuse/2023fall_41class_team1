import pandas as pd

df = pd.read_csv('code_list.csv', header=None)

for index, row in df.iterrows():
    with open(f'before_{index+1}.java', 'w', encoding='utf-8') as file:
        file.write(row[0])

    with open(f'after_{index+1}.java', 'w', encoding='utf-8') as file:
        file.write(row[1])

print('---클래스이름이랑 파일이름다른거 신경안써도 됩니다---')
print('---모두 끝내셨으면 jar_maker.py를 실행해주세요---')