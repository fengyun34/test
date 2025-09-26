
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 项目相关操作
async function getProjects() {
  try {
    const res = await db.collection('project').get()
    return {
      success: true,
      data: res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function getProjectById(id) {
  try {
    const res = await db.collection('project').doc(id).get()
    return {
      success: true,
      data: res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function createProject(data) {
  try {
    const res = await db.collection('project').add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return {
      success: true,
      data: { id: res._id }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// 任务相关操作
async function getTasksByProject(projectId) {
  try {
    const res = await db.collection('task')
      .where({
        projectId: projectId
      })
      .get()
    return {
      success: true,
      data: res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function getTaskById(id) {
  try {
    const task = await db.collection('task').doc(id).get()
    const comments = await db.collection('comment')
      .where({
        taskId: id
      })
      .orderBy('createdAt', 'desc')
      .get()
    
    return {
      success: true,
      data: {
        ...task.data,
        comments: comments.data
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function createTask(data) {
  try {
    const res = await db.collection('task').add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return {
      success: true,
      data: { id: res._id }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function updateTask(id, data) {
  try {
    await db.collection('task').doc(id).update({
      ...data,
      updatedAt: new Date()
    })
    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// 成员相关操作
async function getMembers() {
  try {
    const res = await db.collection('member').get()
    return {
      success: true,
      data: res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function getMemberById(id) {
  try {
    const res = await db.collection('member').doc(id).get()
    return {
      success: true,
      data: res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// 评论相关操作
async function createComment(data) {
  try {
    const res = await db.collection('comment').add({
      ...data,
      createdAt: new Date()
    })
    return {
      success: true,
      data: { id: res._id }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

async function getCommentsByTask(taskId) {
  try {
    const res = await db.collection('comment')
      .where({
        taskId: taskId
      })
      .orderBy('createdAt', 'desc')
      .get()
    return {
      success: true,
      data: res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// 云函数入口
exports.main = async (event, context) => {
  const { action, params } = event
  
  switch (action) {
    case 'getProjects':
      return await getProjects()
    case 'getProjectById':
      return await getProjectById(params.id)
    case 'createProject':
      return await createProject(params.data)
    case 'getTasksByProject':
      return await getTasksByProject(params.projectId)
    case 'getTaskById':
      return await getTaskById(params.id)
    case 'createTask':
      return await createTask(params.data)
    case 'updateTask':
      return await updateTask(params.id, params.data)
    case 'getMembers':
      return await getMembers()
    case 'getMemberById':
      return await getMemberById(params.id)
    case 'createComment':
      return await createComment(params.data)
    case 'getCommentsByTask':
      return await getCommentsByTask(params.taskId)
    default:
      return {
        success: false,
        error: '未知操作'
      }
  }
}
