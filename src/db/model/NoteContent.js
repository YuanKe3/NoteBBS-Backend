/**
 * @description 笔记内容表
 * @author yuanke
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

const NoteContent = seq.define('note_content', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '笔记的标题'
  },
  previewImage: {
    type: STRING,
    allowNull: true,
    defaultValue: 'https://v2.cn.vuejs.org/images/logo.svg',
    comment: '笔记预览图'
  },
  content: {
    type: TEXT('long'),
    allowNull: false,
    comment: '文章内容'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  minorCategoryId: {
    type: INTEGER,
    allowNull: false,
    comment: '次分类 id'
  }
})

module.exports = NoteContent