const { NoteContent, NoteMajorCategory, NoteMinorCategory, User } = require("../db/model/index")

/**
 * 获取主分类的信息
 * @param {number} userId 用户唯一 id
 */
const getTabInfoFromUser = async (userId) => {
  const basicInfo = await NoteMajorCategory.findAll({
    attributes: ['id', 'title'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: NoteMinorCategory,
        attributes: [],
        include: [
          {
            model: NoteContent,
            attributes: [],
            include: [
              {
                model: User,
                attributes: [],
                where: {
                  id: userId
                }
              }
            ]
          }
        ]
      }
    ]
  })
  const result = basicInfo.map(c => c.toJSON())
  return result
}

const getMainInfoFromUser = async (tabId, userId) => {
  const result = await NoteMajorCategory.findAll({
    attributes: [],
    where: {
      id: tabId
    },
    include: [
      {
        model: NoteMinorCategory,
        attributes: ['id', 'title'],
        order: [
          ['id', 'desc']
        ],
        include: [
          {
            model: NoteContent,
            attributes: ['id', 'title', 'previewImage'],
            include: [
              {
                model: User,
                attributes: [],
                where: {
                  id: userId
                }
              }
            ]
          }
        ]
      }
    ]
  })
  return result.map(v => v.toJSON())
}

const getNoteContentFromUser = async (noteId, userId) => {
  const result = await NoteContent.findOne({
    attributes: ['id', 'title', 'previewImage', 'content', 'createdAt', 'updatedAt'],
    where: {
      id: noteId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'nickName', 'username', 'isVip', 'avatar', 'description', 'createdAt', 'updatedAt'],
        where: {
          id: userId
        }
      }
    ]
  })
  if (result == null) return {}
  return result.toJSON()
}

module.exports = {
  getTabInfoFromUser,
  getMainInfoFromUser,
  getNoteContentFromUser
}