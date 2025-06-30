import * as postModel from '../models/postModel.js'

export const selectALLPost = async (req, res) => {
  try {
    const post = await postModel.selectALLPost()
    res.json(post)
  } catch (error) {
    console.error('Ошибка при получении должности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectPostByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const post = await postModel.selectPostByColumn(columnData)
    res.json(post)
  } catch (error) {
    console.error('Ошибка при получении должности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertPost = async (req, res) => {
  const postData = req.body
  try {
    const post = await postModel.insertPost(postData)
    res.json(post)
  } catch (error) {
    console.error('Ошибка при добавлении должности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updatePost = async (req, res) => {
  const postData = req.body
  try {
    const post = await postModel.updatePost(postData)
    res.json(post)
  } catch (error) {
    console.error('Ошибка при обновлении должности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deletePost = async (req, res) => {
  const title = req.params.title
  try {
    const post = await postModel.deletePost(title)
    res.json(post)
  } catch (error) {
    console.error('Ошибка при удалении должности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
