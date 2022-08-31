function scheduleHtmlParser(html) {

  function parserMore(courseName, lesson, courseSection, courseDay) {
    courseName = courseName.replace(/\s*/g, "");

    let courseNameArr = courseName.split(/-+/)

    let fontArr = $(lesson).find($('font'))

    let j = 0
    for (let i = 0; i < fontArr.length; i += 3) {
      let courseName = String(courseNameArr[0])

      let courseTeacher = $(fontArr[i]).text()
      let weekAndSection = $(fontArr[i + 1]).text()
      let coursePosition = $(fontArr[i + 2]).text()
      let weekArr = parseweekAndSection(weekAndSection)

      var course = {
        name: courseName,
        position: coursePosition,
        teacher: courseTeacher,
        weeks: weekArr,
        day: courseDay,
        sections: courseSection
      }

      courseInfos.push(course);

    }
  }
  //获取周
  function parseweekAndSection(weekAndSection) {
    //获取(第一次出现的位置
    let weekIndex = weekAndSection.indexOf('(')
    //获取周字符串
    let weekString = weekAndSection.substring(0, weekIndex)
    // 周数组
    let weekArr = [];
    // 不是连续周

    if (weekString.indexOf('-') === -1) {
      weekArr = weekString.split(',')
      weekArr = weekArr.map(Number)

    } else {
      //是连续周
      //起始周
      let startWeek = Number(weekString.split('-')[0])
      //结束周
      let endWeek = Number(weekString.split('-')[1])
      for (let i = startWeek; i <= endWeek; i++) {
        weekArr.push(i);
      }
    }

    return weekArr
  }



  const courseInfos = []


  //同一节有多个课
  //获取表格所有的行
  let trs = $('table tr')

  //依次获取表格第i+1行
  for (let i = 0; i < trs.length; i++) {
    let courseSection = [i]
    tr = trs[i]
    //获取该行所有的单元格
    let tds = $(tr).find('td')
    //依次获取表格的单元格
    let j = 0;
    for (j = 0; j < tds.length; j++) {
      //表格的单个单元格
      let td = tds[j];
      //获取完整课程信息
      if ($(td).find('font').length == 0) {
        continue
      }

      let courseName = $(td).find(".kbcontent1")
        .clone()    //复制元素
        .children() //获取所有子元素
        .remove('font')   //删除所有子元素
        .end()  //回到选择的元素
        .text();//获取文本值

      courseName = courseName.replace(/\s*/g, "");

      let courseDay = j + 1

      let lesson = $(td).find($('div.kbcontent')).first()
      if (courseName.indexOf("-------") != -1) {
        parserMore(courseName, lesson, courseSection, courseDay)
        continue
      }


      //获取教师信息
      let courseTeacher = $(lesson).find($('font[title="老师"]')).text()
      courseTeacher = courseTeacher.replace(/\s*/g, "");
      //获取地点信息
      let coursePosition = $(lesson).find($('font[title="教室"]')).text()
      coursePosition = coursePosition.replace(/\s*/g, "");
      //获取周次(节次)信息
      let weekAndSection = $(lesson).find($('font[title="周次(节次)"]')).text()
      weekAndSection = weekAndSection.replace(/\s*/g, "")
      let weekArr = parseweekAndSection(weekAndSection)
      var course = {
        name: courseName,
        position: coursePosition,
        teacher: courseTeacher,
        weeks: weekArr,
        day: courseDay,
        sections: courseSection
      }
      // console.log(course.name,course.position,course.teacher,course.weeks,course.day,course.sections)
      courseInfos.push(course);
    }
  }

  return courseInfos
}



