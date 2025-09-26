// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Badge, Button, Progress } from '@/components/ui';

export function ProjectTable({
  projects,
  onProjectClick
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
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">进度</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">团队规模</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map(project => <tr key={project._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500">{project.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{project.progress}%</div>
                      <Progress value={project.progress} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{project.startDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{project.endDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{project.teamSize || 0} 人</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm" onClick={() => onProjectClick(project)}>
                    查看
                  </Button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}