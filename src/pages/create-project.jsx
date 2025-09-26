// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Avatar, AvatarFallback, AvatarImage, Progress, useToast, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Plus, Users, Calendar, Clock, Target, CheckCircle, X, Upload, UserPlus } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
export default function CreateProjectPage(props) {
  const {
    $w
  } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [initialTasks, setInitialTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const {
    toast
  } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm();
  const totalSteps = 3;
  useEffect(() => {
    fetchMembers();
  }, []);
  const fetchMembers = async () => {
    try {
      const result = await $w.cloud.callFunction({
        name: 'projectService',
        data: {
          action: 'getMembers'
        }
      });
      if (result.success && result.data) {
        setMembers(result.data);
      }
    } catch (error) {
      console.error('获取成员失败:', error);
      // 使用模拟数据作为后备
      setMembers([{
        _id: '1',
        name: '张三',
        role: '前端开发',
        avatar: ''
      }, {
        _id: '2',
        name: '李四',
        role: '后端开发',
        avatar: ''
      }, {
        _id: '3',
        name: '王五',
        role: '产品经理',
        avatar: ''
      }, {
        _id: '4',
        name: '赵六',
        role: 'UI设计师',
        avatar: ''
      }]);
    }
  };
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleCreateProject = async data => {
    setLoading(true);
    try {
      // 准备项目数据
      const projectData = {
        name: data.name,
        description: data.description,
        status: 'active',
        priority: data.priority,
        startDate: data.startDate,
        endDate: data.endDate,
        teamSize: selectedMembers.length,
        progress: 0,
        teamMembers: selectedMembers.map(m => m._id),
        initialTasks: initialTasks.map(task => ({
          title: task.title,
          description: task.description || '',
          assigneeId: task.assigneeId || null
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 调用云函数创建项目
      const result = await $w.cloud.callFunction({
        name: 'projectService',
        data: {
          action: 'createProject',
          project: projectData
        }
      });
      if (result.success) {
        toast({
          title: '项目创建成功',
          description: '项目已成功创建，正在跳转到项目列表...'
        });

        // 跳转到项目列表页
        setTimeout(() => {
          $w.utils.navigateTo({
            pageId: 'projects',
            params: {}
          });
        }, 1500);
      } else {
        throw new Error(result.message || '创建项目失败');
      }
    } catch (error) {
      toast({
        title: '创建失败',
        description: error.message || '创建项目时发生错误',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const toggleMember = member => {
    setSelectedMembers(prev => {
      const exists = prev.find(m => m._id === member._id);
      if (exists) {
        return prev.filter(m => m._id !== member._id);
      } else {
        return [...prev, member];
      }
    });
  };
  const addInitialTask = () => {
    if (newTaskTitle.trim()) {
      setInitialTasks([...initialTasks, {
        id: Date.now(),
        title: newTaskTitle,
        description: '',
        assigneeId: null
      }]);
      setNewTaskTitle('');
    }
  };
  const removeInitialTask = taskId => {
    setInitialTasks(initialTasks.filter(task => task.id !== taskId));
  };
  const ProgressBar = () => <div className="flex items-center space-x-2">
      {[1, 2, 3].map(step => <div key={step} className={`flex-1 h-2 rounded-full ${step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />)}
    </div>;
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">创建新项目</h1>
          <p className="text-muted-foreground">按照步骤完成项目创建</p>
        </div>

        <div className="mb-8">
          <ProgressBar />
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>项目信息</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>团队配置</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>任务设置</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleCreateProject)}>
          {/* 步骤1：项目信息 */}
          {currentStep === 1 && <Card>
              <CardHeader>
                <CardTitle>项目基本信息</CardTitle>
                <CardDescription>填写项目的基本信息和配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">项目名称 *</label>
                  <Input {...register('name', {
                required: '项目名称不能为空'
              })} placeholder="例如：电商平台重构项目" />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">项目描述</label>
                  <Textarea {...register('description')} placeholder="详细描述项目目标和范围..." rows={4} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">开始日期 *</label>
                    <Input type="date" {...register('startDate', {
                  required: '开始日期不能为空'
                })} />
                    {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">截止日期 *</label>
                    <Input type="date" {...register('endDate', {
                  required: '截止日期不能为空'
                })} />
                    {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">优先级</label>
                  <Select onValueChange={value => setValue('priority', value)} defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低优先级</SelectItem>
                      <SelectItem value="medium">中优先级</SelectItem>
                      <SelectItem value="high">高优先级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>}

          {/* 步骤2：团队配置 */}
          {currentStep === 2 && <Card>
              <CardHeader>
                <CardTitle>团队配置</CardTitle>
                <CardDescription>选择项目团队成员</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    已选择 {selectedMembers.length} 名成员
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {members.map(member => {
                  const isSelected = selectedMembers.find(m => m._id === member._id);
                  return <div key={member._id} className={`p-4 border rounded-lg cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleMember(member)}>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || ''} />
                            <AvatarFallback>{member.name ? member.name.charAt(0) : '?'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name || '未命名'}</div>
                            <div className="text-sm text-gray-500">{member.role || '未设置角色'}</div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle className="h-4 w-4 text-blue-600 ml-auto" />}
                      </div>;
                })}
                  </div>
                </div>
              </CardContent>
            </Card>}

          {/* 步骤3：任务设置 */}
          {currentStep === 3 && <Card>
              <CardHeader>
                <CardTitle>初始任务</CardTitle>
                <CardDescription>为项目创建初始任务（可选）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="输入任务标题..." className="flex-1" />
                    <Button type="button" onClick={addInitialTask} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {initialTasks.length > 0 && <div className="space-y-2">
                      {initialTasks.map(task => <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">{task.title}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeInitialTask(task.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>)}
                    </div>}

                  {initialTasks.length === 0 && <div className="text-center py-8 text-gray-500">
                      <Target className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>暂无初始任务，可以跳过此步骤</p>
                    </div>}
                </div>
              </CardContent>
            </Card>}

          {/* 导航按钮 */}
          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一步
            </Button>
            {currentStep < totalSteps ? <Button type="button" onClick={handleNext}>
                下一步
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button> : <Button type="submit" disabled={loading}>
                {loading ? '创建中...' : '创建项目'}
              </Button>}
          </div>
        </form>
      </div>
    </div>;
}