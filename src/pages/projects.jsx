// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Search, Loader2 } from 'lucide-react';

import { ProjectCard } from '@/components/ProjectCard';
export default function ProjectsPage(props) {
  const {
    $w
  } = props;
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const fetchProjects = async () => {
    try {
      setLoading(true);
      // 使用云开发数据源调用方式
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'project',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          getCount: true,
          orderBy: [{
            createdAt: 'desc'
          }]
        }
      });
      if (result.records) {
        setProjects(result.records);
      } else {
        toast({
          title: '获取项目失败',
          description: '无法获取项目列表',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '网络错误',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleProjectClick = projectId => {
    $w.utils.navigateTo({
      pageId: 'project-detail',
      params: {
        id: projectId
      }
    });
  };
  const handleCreateProject = async () => {
    try {
      const newProject = {
        name: '新项目',
        description: '请添加项目描述',
        ownerId: 'current-user-id',
        status: 'active',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'project',
        methodName: 'wedaCreateV2',
        params: {
          data: newProject
        }
      });
      if (result.id) {
        toast({
          title: '项目创建成功',
          description: '新项目已创建'
        });
        fetchProjects();
      } else {
        toast({
          title: '创建失败',
          description: '无法创建新项目',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '网络错误',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  return <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">项目列表</h1>
                <p className="text-muted-foreground mt-2">管理您的所有项目</p>
              </div>
              <Button onClick={handleCreateProject}>
                <Plus className="h-4 w-4 mr-2" />
                新建项目
              </Button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="搜索项目..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>

            {loading ? <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => <ProjectCard key={project._id} project={{
          ...project,
          id: project._id,
          owner: {
            name: project.ownerName || '未分配',
            avatar: project.ownerAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
          },
          memberCount: project.memberCount || 0,
          deadline: project.endDate
        }} onClick={handleProjectClick} />)}
              </div>}
          </div>
        </div>;
}