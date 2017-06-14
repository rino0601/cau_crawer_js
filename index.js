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

const models = require('./models'),
    sequelize = models.sequelize,
    Sequelize = models.Sequelize;


function contentParser(matrix) {
    return matrix.map(function (item) {
        const title = item[1];
        const text = item.join();
        return {
            title: title,
            base64: Buffer.from(text).toString("base64")
        }
    });
}

function noticeParser(matrix) {
    return matrix.map(function (item) {
        const title = item[1];
        item.splice(4, 1); // remove view count.
        const text = item.join();
        return {
            title: title,
            base64: Buffer.from(text).toString("base64")
        }
    });
}

function assignmentParser(matrix) {
    return matrix.map(function (item) {
        const title = item[1];
        const text = item.join();
        return {
            title: title,
            base64: Buffer.from(text).toString("base64")
        }
    });
}

function projectParser(matrix) {
    return matrix.map(function (item) {
        const title = item[1];
        const text = item.join();
        return {
            title: title,
            base64: Buffer.from(text).toString("base64")
        }
    });
}

function shareParser(matrix) {
    return matrix.map(function (item) {
        const title = item[1];
        item.splice(4, 1); // remove view count.
        const text = item.join();
        return {
            title: title,
            base64: Buffer.from(text).toString("base64")
        }
    });
}

function qnaParser(matrix) {
    return matrix.map(function (item) {
        const title = item[1];
        item.splice(4, 1); // remove view count.
        const text = item.join();
        return {
            title: title,
            base64: Buffer.from(text).toString("base64")
        }
    });
}


function htmlToSequelize(user, lectureName, boardName) {
    return driver.executeScript(boardParser).then(function (matrix) {
        switch (boardName) {
            case '강의콘텐츠':
                return contentParser(matrix);
            case '과목공지사항':
                return noticeParser(matrix);
            case '과제방':
                return assignmentParser(matrix);
            case '팀프로젝트':
                return projectParser(matrix);
            case '공유자료실':
                return shareParser(matrix);
            case '과목Q&A':
                return qnaParser(matrix);
            case '노트정리':
            case '학습관리':
            default:
                return [];
        }
    }).then(function (titleBase64Pairs) {
        Promise.each(titleBase64Pairs, function (pair) {
            return models.Item.findOrCreate({
                where: {
                    base64: pair.base64
                },
                defaults: {
                    UserId: user.id,
                    lecture: lectureName,
                    board: boardName,
                    title: pair.title,
                    mailed: false
                }
            });
        });
    });
}


/* ------------------------------------------------------------------------------------------------------------------ */


function boardParser() {
    var nodeSnapshot = document.evaluate('//*[@id="row2"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var rows = [];
    for (var i = 0; i < nodeSnapshot.snapshotLength; i++) {
        rows.push(nodeSnapshot.snapshotItem(i));
    }
    return rows.filter(function (tr) {
        return tr.textContent !== "";
    }).map(function (tr) {
        return Array.prototype.slice.call(tr.querySelectorAll('td nobr')).filter(function (nobr) {
            return nobr.textContent !== "";
        }).map(function (nobr) {
            return nobr.textContent;
        });
    });
}

function eachBoards(user, lectureName) {
    return function (webElement) {
        return webElement.click().then(function () {
            return webElement.getText();
        }).then(function (boardName) {
            return driver.getWindowHandle().then(function (windowHandle) {
                return driver.switchTo().window(windowHandle).then(function () {
                    return driver.switchTo().frame('contentFrame');
                }).then(function () {
                    return driver.wait(until.elementsLocated(By.xpath('//*[@id="row2"]')));
                }).then(function () {
                    return htmlToSequelize(user, lectureName, boardName);
                }).then(function () {
                    return driver.switchTo().window(windowHandle);
                }).then(function () {
                    return driver.switchTo().frame("menuFrame");
                });
            });
        });
    };
}


function eachLecture(user) {
    return function (webElement) {
        return webElement.click().then(function () {
            return webElement.getText();
        }).then(function (lectureName) {
            return driver.getAllWindowHandles().then(function (handles) {
                return driver.switchTo().window(handles[1])
            }).then(function () {
                return driver.switchTo().frame("menuFrame");
            }).then(function () {
                return driver.findElement(By.xpath('//*[@id="repeat5_1_repeat6"]/table/tbody'));
            }).then(function (boardListTableBody) {
                return boardListTableBody.findElements(By.css('.w2output.depth3_out'));
            }).then(function (boards) {
                return Promise.each(boards, eachBoards(user, lectureName)); // MOST IMPORTANT.
            });
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
}

function crawlerForUser(user) {
    return driver.get("http://portal.cau.ac.kr").then(function () {
        return driver.wait(until.elementLocated(By.xpath('//*[@id="txtUserID"]'))).then(function (element) {
            return element.sendKeys(user.id);
        }).then(function () {
            return driver.findElement(By.xpath('//*[@id="txtUserPwd"]')).sendKeys(user.password);
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
            return Promise.filter(elements, function (elem) {
                return elem.getText().then(function (text) {
                    return text !== "";
                });
            })
        }).then(function (elements) {
            return Promise.each(elements, eachLecture(user));
        });
    }).catch(function (error) {
        throw error;
    }).then(function () {
        return driver.quit();
    });
}


// start main.
sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
}).then(function () {
    return models.User.findOrCreate({
        where: {id: 'rino0601'},
        defaults: {
            password: '92645813@Cu'
        }
    });
}).then(function () {
    return models.User.findAll();
}).then(function (users) {
    return Promise.each(users, crawlerForUser);
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});