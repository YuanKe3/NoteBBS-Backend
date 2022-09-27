const User = require('./User')
const NoteContent = require('./NoteContent')
const NoteMinorCategory = require('./NoteMinorCategory')
const NoteMajorCategory = require('./NoteMajorCategory')

NoteMajorCategory.hasMany(NoteMinorCategory, {
  foreignKey: 'majorCategoryId'
})
NoteMinorCategory.hasMany(NoteContent, {
  foreignKey: 'minorCategoryId'
})
NoteContent.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  NoteContent,
  NoteMinorCategory,
  NoteMajorCategory
}