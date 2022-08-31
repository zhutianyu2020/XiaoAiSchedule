async function scheduleHtmlProvider() {
  // 使用Fetch请求教务的接口
  try {
    const response = await fetch('http://jw.syucu.edu.cn/jsxsd/xskb/xskb_list.do')
    const html = await response.text()
    return html
  } catch (error) {
    console.error(error)
    await loadTool('AIScheduleTools')
    // 模拟Alert
    await AIScheduleAlert('请进入理论课表界面')
    return 'do not continue'
  }
}