// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';

export function TaskCard({
  task,
  onClick
}) {
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
  const getStatusColor = status => {
    switch (status) {
      case 'todo':
        return 'bg-gray-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'todo':
        return '待办';
      case 'in-progress':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };
  return <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {getStatusText(task.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>负责人: {task.assignee}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>截止日期: {task.dueDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>;
}