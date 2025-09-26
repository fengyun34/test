// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Avatar, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Clock, Users, CheckCircle, AlertCircle, Plus, Calendar, Target } from 'lucide-react';

export default function ProjectDetailPage(props) {
  const {
    $w
  } = props;
  const projectId = props.$w.page.dataset.params.id;
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);
  const fetchProjectDetails = async () => {
    // 模拟获取项目详情
    const mockProject = {
      id: projectId,
      name: '电商平台重构',
      description: '全面升级现有电商平台，包括前端界面优化、后端性能提升、数据库优化等',
      status: 'active',
      progress: 75,
      startDate: '2024-10-01',
      endDate: '2024-12-15',
      priority: 'high',
      team: [{
        id: 1,
        name: '张三',
        role: '前端开发',
        avatar: ''
      }, {
        id: 2,
        name: '李四',
        role: '后端开发',
        avatar: ''
      }, {
        id: 3,
        name: '王五',
        role: 'UI设计师',
        avatar: ''
      }, {
        id: 4,
        name: '赵六',
        role: '产品经理',
        avatar: ''
      }],
      milestones: [{
        id: 1,
        name: '需求分析',
        completed: true,
        date: '2024-10-15'
      }, {
        id: 2,
        name: '设计阶段',
        completed: true,
        date: '2024-11-01'
      }, {
        id: 3,
        name: '开发阶段',
        completed: false,
        date: '2024-11-30'
      }, {
        id: 4,
        name: '测试上线',
        completed: false,
        date: '2024-12-15'
      }]
    };
    const mockTasks = [{
      id: 1,
      title: '首页UI设计',
      status: 'completed',
      priority: 'high',
      assignee: '王五',
      dueDate: '2024-11-10'
    }, {
      id: 2,
      title: '用户认证API',
      status: 'in-progress',
      priority: 'high',
      assignee: '李四',
      dueDate: '2024-11-20'
    }, {
      id: 3,
      title: '商品列表优化',
      status: 'todo',
      priority: 'medium',
      assignee: '张三',
      dueDate: '2024-11-25'
    }];
    setProject(mockProject);
    setTasks(mockTasks);
    setLoading(false);
  };
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'todo':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'todo':
        return '待办';
      default:
        return status;
    }
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 返回按钮和标题 */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
        </div>

        {/* 项目信息卡片 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>项目概览</CardTitle>
                <CardDescription>项目基本信息和进度</CardDescription>
              </div>
              <Badge className={project.status === 'active' ? 'bg-blue-500' : 'bg-green-500'}>
                {project.status === 'active' ? '进行中' : '已完成'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-gray-500">开始日期</div>
                <div className="font-medium flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {project.startDate}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">截止日期</div>
                <div className="font-medium flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {project.endDate}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">优先级</div>
                <div className="font-medium mt-1">
                  <Badge variant={project.priority === 'high' ? 'destructive' : 'secondary'}>
                    {project.priority === 'high' ? '高' : '中'}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">团队规模</div>
                <div className="font-medium flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  {project.team.length}人
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>项目进度</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* 标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="tasks">任务</TabsTrigger>
            <TabsTrigger value="team">团队</TabsTrigger>
            <TabsTrigger value="timeline">时间线</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>项目里程碑</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones.map(milestone => <div key={milestone.id} className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-3 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div className="flex-1">
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-sm text-gray-500">{milestone.date}</div>
                        </div>
                        {milestone.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>团队成员</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.team.map(member => <div key={member.id} className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>项目任务</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    添加任务
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map(task => <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          负责人: {task.assignee} | 截止日期: {task.dueDate}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusText(task.status)}
                        </Badge>
                        <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                          {task.priority === 'high' ? '高优先级' : '中优先级'}
                        </Badge>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>团队成员</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.team.map(member => <div key={member.id} className="flex items-center p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>项目时间线</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => <div key={milestone.id} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        {index < project.milestones.length - 1 && <div className={`w-0.5 h-16 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`} />}
                      </div>
                      <div>
                        <div className="font-medium">{milestone.name}</div>
                        <div className="text-sm text-gray-500">{milestone.date}</div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}