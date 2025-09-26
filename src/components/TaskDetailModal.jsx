// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button, Badge, Textarea, Input } from '@/components/ui';
// @ts-ignore;
import { Calendar, User, Clock, MessageSquare } from 'lucide-react';

export function TaskDetailModal({
  task,
  isOpen,
  onClose
}) {
  if (!task) return null;
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
            </Badge>
            <Badge variant="outline">{task.status}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium flex items-center mb-1">
                <User className="h-4 w-4 mr-1" />
                负责人
              </label>
              <Input value={task.assignee} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                截止日期
              </label>
              <Input value={task.dueDate} readOnly />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium flex items-center mb-1">
              <MessageSquare className="h-4 w-4 mr-1" />
              任务描述
            </label>
            <Textarea value={task.description || '暂无描述'} rows={4} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center mb-1">
              <Clock className="h-4 w-4 mr-1" />
              评论
            </label>
            <div className="border rounded-lg p-3 text-sm text-gray-600">
              暂无评论
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
          <Button>
            编辑任务
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
}