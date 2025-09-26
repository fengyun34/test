// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, Badge, Button, Textarea, Avatar, AvatarFallback, AvatarImage, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, User, MessageSquare, Paperclip, CheckCircle, Circle, Plus, Send } from 'lucide-react';

export function TaskDetailModal({
  task,
  isOpen,
  onClose,
  members,
  onUpdate
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const fetchComments = async () => {
    if (!task) return;
    try {
      const result = await $w.cloud.callDataSource({
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
      if (result.records) {
        setComments(result.records);
      }
    } catch (error) {
      toast({
        title: '获取评论失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const fetchSubtasks = async () => {
    if (!task) return;
    try {
      // 假设子任务也存储在 task 表中，通过 parentTaskId 关联
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              parentTaskId: {
                $eq: task._id
              }
            }
          },
          select: {
            $master: true
          },
          orderBy: [{
            createdAt: 'asc'
          }]
        }
      });
      if (result.records) {
        setSubtasks(result.records);
      }
    } catch (error) {
      console.error('获取子任务失败:', error);
    }
  };
  useEffect(() => {
    if (isOpen && task) {
      fetchComments();
      fetchSubtasks();
    }
  }, [isOpen, task]);
  const handleAddComment = async () => {
    if (!newComment.trim() || !task) return;
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'comment',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            taskId: task._id,
            authorId: 'current-user-id',
            content: newComment,
            createdAt: new Date().toISOString()
          }
        }
      });
      if (result.id) {
        setNewComment('');
        fetchComments();
        toast({
          title: '评论添加成功',
          description: '您的评论已发布'
        });
        onUpdate && onUpdate();
      }
    } catch (error) {
      toast({
        title: '评论添加失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const handleUpdateTaskStatus = async newStatus => {
    if (!task) return;
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: newStatus,
            updatedAt: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: task._id
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
        onUpdate && onUpdate();
      }
    } catch (error) {
      toast({
        title: '更新失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const handleCreateSubtask = async title => {
    if (!title.trim() || !task) return;
    try {
      const newSubtask = {
        title: title,
        description: '',
        projectId: task.projectId,
        parentTaskId: task._id,
        assigneeId: task.assigneeId,
        reporterId: 'current-user-id',
        priority: 'medium',
        status: 'todo',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: task.dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaCreateV2',
        params: {
          data: newSubtask
        }
      });
      if (result.id) {
        toast({
          title: '子任务创建成功',
          description: '新子任务已创建'
        });
        fetchSubtasks();
        onUpdate && onUpdate();
      }
    } catch (error) {
      toast({
        title: '创建失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const toggleSubtask = async (subtaskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'done' ? 'todo' : 'done';
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'task',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: newStatus,
            updatedAt: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: subtaskId
              }
            }
          }
        }
      });
      if (result.count > 0) {
        fetchSubtasks();
        onUpdate && onUpdate();
      }
    } catch (error) {
      toast({
        title: '更新失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  if (!task) return null;
  const assignee = members.find(m => m._id === task.assigneeId);
  const reporter = members.find(m => m._id === task.reporterId);
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                {task.priority} 优先级
              </Badge>
              <Badge variant="outline">{task.status}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>截止: {task.dueDate}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">任务描述</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                负责人
              </h4>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={assignee?.avatar} />
                  <AvatarFallback>{assignee?.name?.[0] || '?'}</AvatarFallback>
                </Avatar>
                <span>{assignee?.name || '未分配'}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                报告人
              </h4>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={reporter?.avatar} />
                  <AvatarFallback>{reporter?.name?.[0] || '?'}</AvatarFallback>
                </Avatar>
                <span>{reporter?.name || '未分配'}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button size="sm" onClick={() => handleUpdateTaskStatus('todo')} disabled={task.status === 'todo'}>
              待办
            </Button>
            <Button size="sm" onClick={() => handleUpdateTaskStatus('in_progress')} disabled={task.status === 'in_progress'}>
              进行中
            </Button>
            <Button size="sm" onClick={() => handleUpdateTaskStatus('review')} disabled={task.status === 'review'}>
              审核中
            </Button>
            <Button size="sm" onClick={() => handleUpdateTaskStatus('done')} disabled={task.status === 'done'}>
              已完成
            </Button>
          </div>

          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">评论</TabsTrigger>
              <TabsTrigger value="subtasks">子任务</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comments" className="space-y-4">
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {comments.map(comment => {
                const author = members.find(m => m._id === comment.authorId);
                return <div key={comment._id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={author?.avatar} />
                        <AvatarFallback>{author?.name?.[0] || '?'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{author?.name || '未知用户'}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>;
              })}
              </div>
              
              <div className="space-y-2">
                <Textarea placeholder="添加评论..." value={newComment} onChange={e => setNewComment(e.target.value)} />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  发送
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="subtasks" className="space-y-4">
              <div className="space-y-2">
                {subtasks.map(subtask => <div key={subtask._id} className="flex items-center space-x-2 p-2 border rounded">
                    <Button variant="ghost" size="sm" onClick={() => toggleSubtask(subtask._id, subtask.status)}>
                      {subtask.status === 'done' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4" />}
                    </Button>
                    <span className={subtask.status === 'done' ? 'line-through text-muted-foreground' : ''}>
                      {subtask.title}
                    </span>
                  </div>)}
              </div>
              <Button variant="outline" size="sm" onClick={() => {
              const title = prompt('请输入子任务标题');
              if (title) handleCreateSubtask(title);
            }}>
                <Plus className="h-4 w-4 mr-2" />
                添加子任务
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>;
}