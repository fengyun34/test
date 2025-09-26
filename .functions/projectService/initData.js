
// 初始化数据脚本
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

async function initData() {
  try {
    // 检查是否已有数据
    const projectCount = await db.collection('project').count()
    if (projectCount.total > 0) {
      console.log('数据已存在，跳过初始化')
      return
    }

    // 初始化成员数据
    const members = [
      {
        name: "张三",
        role: "项目经理",
        email: "zhangsan@company.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
        workload: 85,
        activeProjects: 3,
        totalTasks: 25,
        completedTasks: 20,
        createdAt: new Date()
      },
      {
        name: "李四",
        role: "前端开发",
        email: "lisi@company.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
        workload: 75,
        activeProjects: 2,
        totalTasks: 30,
        completedTasks: 22,
        createdAt: new Date()
      },
      {
        name: "王五",
        role: "后端开发",
        email: "wangwu@company.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
        workload: 90,
        activeProjects: 2,
        totalTasks: 28,
        completedTasks: 18,
        createdAt: new Date()
      },
      {
        name: "赵六",
        role: "UI设计师",
        email: "zhaoliu@company.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
        workload: 60,
        activeProjects: 1,
        totalTasks: 20,
        completedTasks: 15,
        createdAt: new Date()
      }
    ]

    const memberIds = []
    for (const member of members) {
      const res = await db.collection('member').add(member)
      memberIds.push(res._id)
    }

    // 初始化项目数据
    const projects = [
      {
        name: "电商平台重构",
        description: "基于微服务架构的电商平台重构项目",
        ownerId: memberIds[0],
        status: "active",
        progress: 75,
        startDate: "2024-08-01",
        endDate: "2024-12-31",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "移动APP开发",
        description: "iOS和Android双端原生应用开发",
        ownerId: memberIds[1],
        status: "active",
        progress: 45,
        startDate: "2024-09-01",
        endDate: "2025-02-15",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    const projectIds = []
    for (const project of projects) {
      const res = await db.collection('project').add(project)
      projectIds.push(res._id)
    }

    // 初始化任务数据
    const tasks = [
      {
        projectId: projectIds[0],
        title: "用户注册登录模块",
        description: "实现用户注册、登录、找回密码等功能",
        assigneeId: memberIds[1],
        reporterId: memberIds[0],
        priority: "high",
        status: "done",
        startDate: "2024-08-15",
        dueDate: "2024-09-15",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: projectIds[0],
        title: "商品管理系统",
        description: "商品CRUD操作、分类管理、库存管理",
        assigneeId: memberIds[2],
        reporterId: memberIds[0],
        priority: "high",
        status: "in_progress",
        startDate: "2024-08-20",
        dueDate: "2024-10-01",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: projectIds[1],
        title: "用户界面设计",
        description: "设计APP的用户界面和交互流程",
        assigneeId: memberIds[3],
        reporterId: memberIds[0],
        priority: "medium",
        status: "todo",
        startDate: "2024-09-01",
        dueDate: "2024-09-30",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const task of tasks) {
      await db.collection('task').add(task)
    }

    console.log('初始化数据完成')
  } catch (error) {
    console.error('初始化数据失败:', error)
  }
}

exports.main = async (event, context) => {
  await initData()
  return {
    success: true,
    message: '数据初始化完成'
  }
}
