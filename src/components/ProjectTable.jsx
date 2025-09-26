// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { MoreVertical } from 'lucide-react';

export function ProjectTable({
  projects
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
  return <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>项目名称</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>进度</TableHead>
            <TableHead>团队规模</TableHead>
            <TableHead>截止日期</TableHead>
            <TableHead>优先级</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(project => <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusText(project.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="w-32">
                  <Progress value={project.progress} className="h-2" />
                  <span className="text-xs text-gray-500">{project.progress}%</span>
                </div>
              </TableCell>
              <TableCell>{project.teamSize}人</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>
                <Badge variant={project.priority === 'high' ? 'destructive' : 'secondary'}>
                  {project.priority === 'high' ? '高' : '中'}
                </Badge>
              </TableCell>
              <TableCell>
                <MoreVertical className="h-4 w-4 cursor-pointer" />
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>;
}