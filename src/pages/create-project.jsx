// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Plus, Calendar, Users, Target } from 'lucide-react';

export default function CreateProjectPage(props) {
  const {
    $w
  } = props;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'medium',
    teamSize: '3-5'
  });
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // 模拟创建项目
      console.log('创建项目:', formData);
      // 跳转到项目列表
      $w.utils.navigateTo({
        pageId: 'projects',
        params: {}
      });
    } catch (error) {
      console.error('创建项目失败:', error);
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        {/* 创建项目表单 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">创建新项目</CardTitle>
            <CardDescription>填写项目基本信息，开始您的项目管理之旅</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 项目名称 */}
              <div className="space-y-2">
                <Label htmlFor="name">项目名称 *</Label>
                <Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="例如：电商平台重构" required />
              </div>

              {/* 项目描述 */}
              <div className="space-y-2">
                <Label htmlFor="description">项目描述</Label>
                <Textarea id="description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="详细描述项目目标和范围" rows={4} />
              </div>

              {/* 日期选择 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">开始日期 *</Label>
                  <Input id="startDate" type="date" value={formData.startDate} onChange={e => handleInputChange('startDate', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">结束日期 *</Label>
                  <Input id="endDate" type="date" value={formData.endDate} onChange={e => handleInputChange('endDate', e.target.value)} required />
                </div>
              </div>

              {/* 优先级 */}
              <div className="space-y-2">
                <Label htmlFor="priority">优先级</Label>
                <Select value={formData.priority} onValueChange={value => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择优先级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">低</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 团队规模 */}
              <div className="space-y-2">
                <Label htmlFor="teamSize">预期团队规模</Label>
                <Select value={formData.teamSize} onValueChange={value => handleInputChange('teamSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择团队规模" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2人</SelectItem>
                    <SelectItem value="3-5">3-5人</SelectItem>
                    <SelectItem value="6-10">6-10人</SelectItem>
                    <SelectItem value="10+">10人以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 提交按钮 */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => $w.utils.navigateBack()}>
                  取消
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  创建项目
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>;
}