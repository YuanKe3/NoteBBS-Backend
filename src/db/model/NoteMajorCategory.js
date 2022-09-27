const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const NoteMajorCategory = seq.define('note_major_category', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '笔记主分类标题'
  }
})

module.exports = NoteMajorCategory