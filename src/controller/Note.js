const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getTabInfoFromUser, getMainInfoFromUser, getNoteContentFromUser } = require('../service/Note')

/**
 * 获取主分类的信息
 * @param {number} userId 用户唯一 id
 * @param {string} content 标志符
 * @return [{
 *  id: xxx,
 *  tabTitle: 'xxx',
 * }, {
 *  id: xxx,
 *  tabTitle: 'xxx
 * }]
 */
const getTabInfo = async (userId) => {
  const result = await getTabInfoFromUser(userId)
  if (result.length) {
    return new SuccessModel({
      tabData: result.map(v => {
        return {
          id: v.id,
          tabTitle: v.title
        }
      })
    })
  }
  return new ErrorModel({
    errno: -1,
    message: '获取 tab 内容失败'
  })
}

/**
 * 
 * @param {number} tabId 主分类 id
 * @param {*} userId 用户 id
 * @returns [{
 *  categoryName: 'xxx',
 *  id: xxx,
 *  lists: [{
 *    id: xxx,
 *    noteName: 'xxx',
 *    previewImage: 'xxx'
 *  }, { xxx }]
 * }, { xxx }]
 */
const getMainNoteInfo = async (tabId, userId) => {
  const result = await getMainInfoFromUser(tabId, userId)
  if (result.length) {
    const res = result
      .map(v => {
        return {
          content: v.note_minor_categories
            .map(vv => {
              return {
                id: vv.id,
                categoryName: vv.title,
                lists: vv.note_contents
                  .map(vvv => {
                    return {
                      id: vvv.id,
                      noteName: vvv.title,
                      previewImage: vvv.previewImage
                    }
                  })
              }
            })
        }
      })
    return new SuccessModel(res[0].content)
  }
  return new ErrorModel({
    errno: -1,
    message: '获取内容失败'
  })
}

// 获取笔记内容
const getNoteContent = async (noteId, userId) => {
  const result = await getNoteContentFromUser(noteId, userId)
  const hasData = Object.keys(result).length
  if (hasData) {
    return new SuccessModel(result)
  }
  return new ErrorModel({
    errno: -1,
    message: '获取笔记内容失败'
  })
}

module.exports = {
  getTabInfo,
  getMainNoteInfo,
  getNoteContent
}