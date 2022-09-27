/**
 * @description 笔记次分类表
 * @author yuanke
 */

const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const NoteMinorCategory = seq.define('note_minor_category', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '笔记次分类标题'
  },
  majorCategoryId: {
    type: INTEGER,
    allowNull: false,
    comment: '主分类 id'
  }
})

module.exports = NoteMinorCategory
