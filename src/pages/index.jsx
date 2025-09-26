// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
// @ts-ignore;
import { Plus, Clock, Users, CheckCircle, AlertCircle, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

export default function DashboardPage(props) {
  const {
    $w
  } = props;
  const [stats, setStats] = useState({
    totalProjects: 12,
    activeTasks: 24,
    completedTasks: 156,
    teamMembers: 8
  });
  const [recentProjects, setRecentProjects] = useState([{
    id: 1,
    name: '电商平台重构',
    progress: 75,
    status: 'active',
    dueDate: '2024-12-15',
    team: ['张三', '李四', '王五']
  }, {
    id: 2,
    name: '移动APP开发',
    progress: 45,
    status: 'active',
    dueDate: '2024-12-20',
    team: ['赵六', '钱七']
  }, {
    id: 3,
    name: '数据分析系统',
    progress: 90,
    status: 'completed',
    dueDate: '2024-11-30',
    team: ['孙八', '周九']
  }]);
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">项目仪表板</h1>
          <p className="text-gray-600 mt-2">欢迎回来，管理您的项目进度</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总项目数</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-gray-500">+2 本月新增</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待办任务</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTasks}</div>
              <p className="text-xs text-gray-500">需要处理</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已完成任务</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <p className="text-xs text-gray-500">总计完成</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">团队成员</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamMembers}</div>
              <p className="text-xs text-gray-500">活跃成员</p>
            </CardContent>
          </Card>
        </div>

        {/* 最近项目 */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">最近项目</h2>
            <Button onClick={() => $w.utils.navigateTo({
            pageId: 'create-project',
            params: {}
          })}>
              <Plus className="h-4 w-4 mr-2" />
              新建项目
            </Button>
          </div>

          <div className="grid gap-6">
            {recentProjects.map(project => <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => $w.utils.navigateTo({
            pageId: 'project-detail',
            params: {
              id: project.id
            }
          })}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        截止日期: {project.dueDate}
                      </CardDescription>
                    </div>
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                      {project.status === 'completed' ? '已完成' : '进行中'}
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
                    
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => <Avatar key={index} className="h-8 w-8 border-2 border-white">
                            <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                          </Avatar>)}
                        {project.team.length > 3 && <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            +{project.team.length - 3}
                          </div>}
                      </div>
                      <Button variant="ghost" size="sm">
                        查看详情
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
}