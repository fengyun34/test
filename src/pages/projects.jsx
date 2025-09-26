// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Plus, Search, Filter, Clock, Users, CheckCircle, MoreVertical } from 'lucide-react';

export default function ProjectsPage(props) {
  const {
    $w
  } = props;
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      // 模拟获取项目数据
      const mockProjects = [{
        id: 1,
        name: '电商平台重构',
        description: '全面升级现有电商平台，提升用户体验',
        status: 'active',
        progress: 75,
        startDate: '2024-10-01',
        endDate: '2024-12-15',
        teamSize: 5,
        priority: 'high'
      }, {
        id: 2,
        name: '移动APP开发',
        description: '开发iOS和Android原生应用',
        status: 'active',
        progress: 45,
        startDate: '2024-11-01',
        endDate: '2024-12-20',
        teamSize: 3,
        priority: 'medium'
      }, {
        id: 3,
        name: '数据分析系统',
        description: '构建企业级数据分析平台',
        status: 'completed',
        progress: 100,
        startDate: '2024-09-01',
        endDate: '2024-11-30',
        teamSize: 4,
        priority: 'high'
      }, {
        id: 4,
        name: '客户管理系统',
        description: 'CRM系统升级与优化',
        status: 'planning',
        progress: 10,
        startDate: '2024-12-01',
        endDate: '2025-02-28',
        teamSize: 6,
        priority: 'medium'
      }];
      setProjects(mockProjects);
      setLoading(false);
    } catch (error) {
      console.error('获取项目失败:', error);
      setLoading(false);
    }
  };
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
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
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题和按钮 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">所有项目</h1>
            <p className="text-gray-600 mt-1">管理您的所有项目</p>
          </div>
          <Button onClick={() => $w.utils.navigateTo({
          pageId: 'create-project',
          params: {}
        })}>
            <Plus className="h-4 w-4 mr-2" />
            新建项目
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="搜索项目..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="筛选状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="active">进行中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="planning">规划中</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 项目列表 */}
        {loading ? <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div> : <div className="grid gap-6">
            {filteredProjects.map(project => <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">进度</span>
                      <div className="mt-1">
                        <Progress value={project.progress} className="h-2" />
                        <span className="text-xs text-gray-600">{project.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">团队</span>
                      <div className="mt-1 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{project.teamSize}人</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">优先级</span>
                      <div className="mt-1">
                        <Badge variant={project.priority === 'high' ? 'destructive' : 'secondary'}>
                          {project.priority === 'high' ? '高' : '中'}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">截止日期</span>
                      <div className="mt-1 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{project.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" onClick={() => $w.utils.navigateTo({
                pageId: 'project-detail',
                params: {
                  id: project.id
                }
              })}>
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>}
      </div>
    </div>;
}