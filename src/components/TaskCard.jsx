// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, Badge, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
// @ts-ignore;
import { Clock, MessageSquare, Paperclip } from 'lucide-react';

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
        return 'border-l-gray-400';
      case 'in_progress':
        return 'border-l-blue-400';
      case 'review':
        return 'border-l-yellow-400';
      case 'done':
        return 'border-l-green-400';
      default:
        return 'border-l-gray-400';
    }
  };
  return <Card className={`p-4 border-l-4 ${getStatusColor(task.status)} hover:shadow-md transition-shadow cursor-pointer`} onClick={() => onClick(task)}>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{task.title}</h4>
              <Badge className={getPriorityColor(task.priority)} variant="secondary">
                {task.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>{task.commentCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span>{task.attachmentCount}</span>
                </div>
              </div>
              
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Card>;
}