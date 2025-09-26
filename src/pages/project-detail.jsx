// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Avatar, AvatarFallback, AvatarImage, Tabs, TabsContent, TabsList, TabsTrigger, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, Users, Clock, ArrowLeft, LayoutGrid, BarChart3, Loader2, Plus } from 'lucide-react';

import { TaskCard } from '@/components/TaskCard';
import { TaskDetailModal } from '@/components/TaskDetailModal';
export default function ProjectDetailPage(props) {
  const {
    $w
  } = props;
  const projectId = props.$w.page.dataset.params.id;
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const fetchProjectData = async () => {
    try {
      setLoading(true);
      // 获取项目详情
      const projectResult = await $w.cloud.callDataSource({
        dataSourceName: 'project',
        methodName: 'wedaGetItemV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: projectId
              }
            }
          },
          select: {
            $master: true
          }
        }
      });
      if (projectResult) {
        setProject(projectResult);
      }
      // 获取项目任务
      const tasksResult = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              projectId: {
                $eq: projectId
              }
            }
          },
          select: {
            $master: true
          },
          orderBy: [{
            createdAt: 'desc'
          }]
        }
      });
      if (tasksResult.records) {
        setTasks(tasksResult.records);
      }
      // 获取所有成员
      const membersResult = await $w.cloud.callDataSource({
        dataSourceName: 'member',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          orderBy: [{
            name: 'asc'
          }]
        }
      });
      if (membersResult.records) {
        setMembers(membersResult.records);
      }
    } catch (error) {
      toast({
        title: '获取数据失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);
  const handleTaskClick = async task => {
    try {
      const taskResult = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaGetItemV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: task._id
              }
            }
          },
          select: {
            $master: true
          }
        }
      });
      if (taskResult) {
        // 获取任务评论
        const commentsResult = await $w.cloud.callDataSource({
          dataSourceName: 'comment',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                taskId: {
                  $eq: task._id
                }
              }
            },
            select: {
              $master: true
            },
            orderBy: [{
              createdAt: 'desc'
            }]
          }
        });
        setSelectedTask({
          ...taskResult,
          comments: commentsResult.records || []
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      toast({
        title: '获取任务详情失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleCreateTask = async () => {
    try {
      const newTask = {
        projectId: projectId,
        title: '新任务',
        description: '请添加任务描述',
        assigneeId: 'current-user-id',
        reporterId: 'current-user-id',
        priority: 'medium',
        status: 'todo',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaCreateV2',
        params: {
          data: newTask
        }
      });
      if (result.id) {
        toast({
          title: '任务创建成功',
          description: '新任务已创建'
        });
        fetchProjectData();
      } else {
        toast({
          title: '创建失败',
          description: '无法创建新任务',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '网络错误',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: newStatus
          },
          filter: {
            where: {
              _id: {
                $eq: taskId
              }
            }
          }
        }
      });
      if (result.count > 0) {
        toast({
          title: '任务状态更新成功',
          description: `任务状态已更新为 ${newStatus}`
        });
        fetchProjectData();
      }
    } catch (error) {
      toast({
        title: '更新失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }
  if (!project) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>项目不存在</p>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBack} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回项目列表
              </Button>
              
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{project.name}</h1>
                  <p className="text-muted-foreground mt-2">{project.description}</p>
                </div>
                <Badge className={project.status === 'active' ? 'bg-green-500' : project.status === 'paused' ? 'bg-yellow-500' : 'bg-blue-500'}>
                  {project.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>任务列表</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                          <LayoutGrid className="h-4 w-4 mr-2" />
                          列表视图
                        </Button>
                        <Button variant={viewMode === 'gantt' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('gantt')}>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          甘特图
                        </Button>
                        <Button onClick={handleCreateTask}>
                          <Plus className="h-4 w-4 mr-2" />
                          新建任务
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {viewMode === 'list' ? <div className="space-y-4">
                        {tasks.map(task => <TaskCard key={task._id} task={{
                  ...task,
                  id: task._id,
                  assignee: members.find(m => m._id === task.assigneeId) || {
                    name: '未分配',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                  },
                  commentCount: 0,
                  attachmentCount: 0
                }} onClick={() => handleTaskClick(task)} />)}
                      </div> : <div className="text-center py-12 text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                        <p>甘特图视图开发中...</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>项目信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>整体进度</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">开始日期</span>
                        <span>{project.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">截止日期</span>
                        <span>{project.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">负责人</span>
                        <span>{members.find(m => m._id === project.ownerId)?.name || '未分配'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>团队成员</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {members.map(member => {
                  const memberTasks = tasks.filter(t => t.assigneeId === member._id).length;
                  return <div key={member._id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {memberTasks} 任务
                            </Badge>
                          </div>;
                })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <TaskDetailModal task={selectedTask} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} members={members} onUpdate={fetchProjectData} />
        </div>;
}