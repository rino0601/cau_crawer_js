/**
 * Created by rino0 on 2017-04-17.
 */
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get("http://portal.cau.ac.kr");

// def do_some_for_lecture(window_handle, lecture_name):
// # // *[ @ id = "repeat5_1_repeat6_1_output8"]
// browser.switch_to.window(window_handle)
// browser.switch_to.frame(browser.find_element_by_id('menuFrame'))
// board_list_tbody = find_element_by_xpath_until_located('//*[@id="repeat5_1_repeat6"]/table/tbody')
//
// board_list = board_list_tbody.find_elements_by_css_selector('.w2output.depth3_out')
// for board in board_list:
// board_name = board.get_attribute('innerHTML')
// board.click()
// browser.switch_to.window(window_handle)
// browser.switch_to.frame(browser.find_element_by_id('contentFrame'))
// content = find_element_by_xpath_until_located('//body')
// time.sleep(0.5)
// html = content.get_attribute('innerHTML')
// with open('html_{}_{}.html'.format(lecture_name, board_name), 'w') as f:
// f.write(html)
// browser.switch_to.window(window_handle)
// browser.switch_to.frame(browser.find_element_by_id('menuFrame'))
//
//
var findElementWithWaitByXpath = function (xpath) {
    driver.wait(until.elementsLocated((By.xpath(xpath))), 10000);
    return driver.findElement(By.xpath(xpath));
};
try {
    var element;
    {// login
        findElementWithWaitByXpath('//*[@id="txtUserID"]').sendKeys("id here");
        driver.findElement(By.xpath('//*[@id="txtUserPwd"]')).sendKeys("password here");
        driver.findElement(By.xpath('//*[@id="btnLogin"]')).click();
    }
    {// enter eclass
        findElementWithWaitByXpath('//*[@id="ctl00_ctl37_RadMenu1_i3_hlMenu"]').click();
        findElementWithWaitByXpath('//*[@id="External_Content_IFrame"]');
        driver.get('http://cautis.cau.ac.kr/LMS/websquare/websquare.jsp?w2xPath=/LMS/comm/main.xml');
    }
    { // get course list
        driver.switchTo().frame('contentFrame');
        element = findElementWithWaitByXpath('//*[@id="infomationCourse_body_tbody"]');
        findElementWithWaitByXpath('//*[@id="infomationCourse_body_tbody"]/tr[1]');
        var es=element.findElement(By.tagName('tr'));
    }
} finally {
    // driver.quit();
}

// elements = [element for element in element.find_elements_by_tag_name('tr') if element.text is not '']
// print(browser.window_handles)
// print(len(elements))
// for element in elements:
// print(element)
// element.click()
// print(browser.window_handles)
// handles_ = browser.window_handles[1]
// print('enter popup window named %s' % handles_)
// do_some_for_lecture(handles_, element.text)
// browser.close()
// browser.switch_to.window(browser.window_handles[0])
// while browser.find_element_by_id('_modal').is_displayed():
// browser.implicitly_wait(1), print('wait 1 sec')
// browser.switch_to.frame(browser.find_element_by_id('contentFrame'))
//
// browser.switch_to.default_content()
//
