const express = require('express')
const router = express.Router()
const { getTabInfo, getMainNoteInfo, getNoteContent } = require('../controller/Note')

// 获取主分类的 id、tabTitle
router.get('/', async (req, res, next) => {
  // 获取用户 id
  const userId = req.auth.id
  const result = await getTabInfo(userId)
  res.json(result)
})

// 获取主要内容
router.get('/:id/minorCategory', async (req, res, next) => {
  const { id: tabId } = req.params
  const userId = req.auth.id
  const result = await getMainNoteInfo(tabId, userId)
  res.json(result)
})

router.get('/minorCategory/note/:noteId', async (req, res, next) => {
  const { noteId } = req.params
  const userId = req.auth.id
  const result = await getNoteContent(noteId, userId)
  res.json(result)
})

module.exports = router