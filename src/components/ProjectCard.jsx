// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage, Progress } from '@/components/ui';
// @ts-ignore;
import { Calendar, Users, Clock, TrendingUp, MoreVertical } from 'lucide-react';

export function ProjectCard({
  project,
  onClick
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'paused':
        return '已暂停';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  };
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
  const getPriorityText = priority => {
    switch (priority) {
      case 'high':
        return '高优先级';
      case 'medium':
        return '中优先级';
      case 'low':
        return '低优先级';
      default:
        return '未设置';
    }
  };
  // 安全地处理可能为空的值
  const safeProject = {
    name: project?.name || '未命名项目',
    description: project?.description || '暂无描述',
    status: project?.status || 'active',
    priority: project?.priority || 'medium',
    progress: project?.progress || 0,
    startDate: project?.startDate || '2024-01-01',
    endDate: project?.endDate || '2024-12-31',
    teamSize: project?.teamSize || 0,
    teamMembers: project?.teamMembers || [],
    tasks: project?.tasks || [],
    completedTasks: project?.completedTasks || 0,
    totalTasks: project?.totalTasks || 0
  };
  return <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg mb-2">{safeProject.name}</CardTitle>
            <div className="flex space-x-2">
              <Badge className={getStatusColor(safeProject.status)}>
                {getStatusText(safeProject.status)}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(safeProject.priority)}>
                {getPriorityText(safeProject.priority)}
              </Badge>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {safeProject.description}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>项目进度</span>
              <span>{safeProject.progress}%</span>
            </div>
            <Progress value={safeProject.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{safeProject.startDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>{safeProject.endDate}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span>{safeProject.teamSize} 人</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-gray-400" />
              <span>{safeProject.completedTasks}/{safeProject.totalTasks} 任务</span>
            </div>
          </div>

          {safeProject.teamMembers && safeProject.teamMembers.length > 0 && <div className="flex -space-x-2">
              {safeProject.teamMembers.slice(0, 4).map((member, index) => <Avatar key={index} className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={member.avatar || ''} />
                  <AvatarFallback>{member.name ? member.name.charAt(0) : '?'}</AvatarFallback>
                </Avatar>)}
              {safeProject.teamMembers.length > 4 && <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                  +{safeProject.teamMembers.length - 4}
                </div>}
            </div>}
        </div>
      </CardContent>
    </Card>;
}