/**
 * Created by rino0 on 2017-04-17.
 */
const fs = require('fs');
const Promise = require("bluebird");
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function eachBoards(webElement) {
    return webElement.click().then(function () {
        return webElement.getText();
    }).then(function (boardName) {
        return driver.getWindowHandle().then(function (windowHandle) {
            return driver.switchTo().window(windowHandle).then(function () {
                return driver.switchTo().frame('contentFrame');
            }).then(function () {
                return driver.findElement(By.xpath('//body'));
            }).then(function (body) {
                return driver.wait(until.elementsLocated(By.xpath('//*[@id="row2"]'))).then(function () {
                    return body.getAttribute("innerHTML");
                });
            }).then(function (html) {
                fs.writeFileSync(boardName + ".html", html);
                return driver.switchTo().window(windowHandle);
            }).then(function () {
                return driver.switchTo().frame("menuFrame");
            });
        });
    });
}
function eachLecture(webElement) {
    return webElement.click().then(function () {
        return driver.getAllWindowHandles();
    }).then(function (handles) {
        return driver.switchTo().window(handles[1])
    }).then(function () {
        return driver.switchTo().frame("menuFrame");
    }).then(function () {
        return driver.findElement(By.xpath('//*[@id="repeat5_1_repeat6"]/table/tbody'));
    }).then(function (boardListTableBody) {
        return boardListTableBody.findElements(By.css('.w2output.depth3_out'));
    }).then(function (boards) {
        return Promise.each(boards, eachBoards); // MOST IMPORTANT.
    }).then(function () {
        return driver.close();
    }).then(function () {
        return driver.getAllWindowHandles();
    }).then(function (handles) {
        return driver.switchTo().window(handles[0]);
    }).then(function () {
        return driver.findElement(By.id('_modal'));
    }).then(function (element) {
        return driver.wait(until.elementIsNotVisible(element));
    }).then(function () {
        return driver.switchTo().frame("contentFrame");
    });
}

driver.get("http://portal.cau.ac.kr").then(function () {
    return driver.wait(until.elementLocated(By.xpath('//*[@id="txtUserID"]'))).then(function (element) {
        return element.sendKeys("rino0601");
    }).then(function () {
        return driver.findElement(By.xpath('//*[@id="txtUserPwd"]')).sendKeys("92645813@Cu");
    }).then(function () {
        return driver.findElement(By.xpath('//*[@id="btnLogin"]')).click();
    }).then(function () {
        return driver.wait(until.elementLocated(By.xpath('//*[@id="ctl00_ctl37_RadMenu1_i3_hlMenu"]')));
    }).then(function (element) {
        return element.click();
    }).then(function () {
        return driver.wait(until.elementLocated(By.xpath('//*[@id="External_Content_IFrame"]')));
    }).then(function (elementIgnored) {
        return driver.get('http://cautis.cau.ac.kr/LMS/websquare/websquare.jsp?w2xPath=/LMS/comm/main.xml');
    }).then(function () {
        return driver.switchTo().frame('contentFrame');
    }).then(function () {
        return driver.wait(until.elementLocated(By.xpath('//*[@id="infomationCourse_body_tbody"]')));
    }).then(function (element) {
        return driver.wait(until.elementLocated(By.xpath('//*[@id="infomationCourse_body_tbody"]/tr[1]'))).then(function () {
            return element.findElements(By.css('tr'));
        });
    }).then(function (elements) {
        elements = elements.map(function (element) {
            return element.getText().then(function (text) {
                return text !== "" ? element : null;
            });
        });
        return Promise.all(elements);
    }).then(function (elements) {
        var lectures = elements.filter(function (elem) {
            return elem !== null;
        });
        return Promise.each(lectures, eachLecture);
    });
}).catch(function (error) {
    throw error;
}).then(function () {
    return driver.quit();
});


