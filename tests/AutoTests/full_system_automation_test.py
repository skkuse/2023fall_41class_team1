import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import UnexpectedAlertPresentException

import pyperclip



def initialize_input():
    code_input_pane.click()
    actions = ActionChains(driver)
    actions.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL)
    actions.send_keys(Keys.BACK_SPACE).perform()
    actions.perform()

def handle_alert():
    try:
        alert = driver.switch_to.alert
        alert_text = alert.text
        alert.accept()
        print("Alert closed: " + alert_text)
        return alert_text
    except Exception as e:
        print("Error in handling alert: " + str(e))
        return None
def send_request(code):
    try:
        pyperclip.copy(code)
        actions = ActionChains(driver)
        actions.key_down(Keys.CONTROL).send_keys('v').key_up(Keys.CONTROL)
        actions.perform()
        compile_button.click()
    except UnexpectedAlertPresentException:
        handle_alert()
        return {"Status": "Error", "Message": "Unexpected alert during code submission"}


def wait_for_response():
    element_locator = (By.CLASS_NAME, "css-50ck3f")
    element = driver.find_element(*element_locator)
    initial_content = element.get_attribute("content")

    try:
        WebDriverWait(driver, 18).until(
            lambda d: d.find_element(*element_locator).get_attribute("content") != initial_content
        )
    except UnexpectedAlertPresentException:
        try:
            WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert_text = alert.text
            alert.accept()
            return {"Status": "Error", "Message": alert_text}
        except TimeoutException:
            return {"Status": "Failed", "Message": "Time out"}

    return {"Status": "Success"}

def get_carbon_emission():
    element_locator = (By.CLASS_NAME, "css-50ck3f")
    element = driver.find_element(*element_locator)
    return element.get_attribute("content")

driver = webdriver.Chrome()
where = "http://localhost:3000/" 


driver.get(where)
driver.maximize_window()

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, "view-lines"))
)
code_input_pane = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CLASS_NAME, "view-lines"))
)

compile_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, "compile_button"))
)

code_list = pd.read_csv("code_list.csv", encoding = 'utf-8')

results_df = pd.DataFrame(columns=["before_code", "result_before", "after_code", "result_after"])

time.sleep(0.5)
for index, row in code_list.iterrows():
    before_code = code_list.iloc[index, 0]
    after_code = code_list.iloc[index, 1]

    initialize_input()
    send_request(before_code)
    response = wait_for_response()
    if response['Status'] == "Success":
        result_before = get_carbon_emission() 
    elif response['Status'] == "Error":
        result_before = response['Message']
    else:
        result_before = response['Message']

    initialize_input()
    send_request(after_code)
    response = wait_for_response()
    if response['Status'] == "Success":
        result_after = get_carbon_emission() 
    elif response['Status'] == "Error":
        result_after = response['Message']
    else:
        result_after = response['Message']

    new_index = len(results_df)
    results_df.loc[new_index] = [before_code, result_before, after_code, result_after]


results_df.to_csv("test_result.csv", index=False, encoding='utf-8-sig')
driver.quit()
