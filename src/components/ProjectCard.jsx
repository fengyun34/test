// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Progress, Avatar, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { Clock, Users, ChevronRight } from 'lucide-react';

export function ProjectCard({
  project,
  onClick
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'planning':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'planning':
        return '规划中';
      default:
        return status;
    }
  };
  return <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>进度</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{project.endDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span>{project.teamSize}人</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {Array.from({
              length: Math.min(project.teamSize, 3)
            }).map((_, index) => <Avatar key={index} className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {String.fromCharCode(65 + index)}
                  </AvatarFallback>
                </Avatar>)}
              {project.teamSize > 3 && <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                  +{project.teamSize - 3}
                </div>}
            </div>
            <div className="flex items-center text-blue-600 text-sm">
              查看详情
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}