// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
// @ts-ignore;
import { Calendar, Users, Clock } from 'lucide-react';

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
  return <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onClick(project.id)}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <Badge className={getStatusColor(project.status)}>
                {getStatusText(project.status)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>进度</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{project.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.memberCount}人</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={project.owner.avatar} />
                  <AvatarFallback>{project.owner.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{project.owner.name}</p>
                  <p className="text-xs text-muted-foreground">负责人</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>;
}