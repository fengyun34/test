// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Avatar, AvatarFallback, Badge } from '@/components/ui';
// @ts-ignore;
import { UserPlus, Mail, Phone, MapPin, Calendar, Award, Users, Activity } from 'lucide-react';

export default function MembersPage(props) {
  const {
    $w
  } = props;
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchMembers();
  }, []);
  const fetchMembers = async () => {
    try {
      // 模拟获取团队成员数据
      const mockMembers = [{
        id: 1,
        name: '张三',
        role: '前端开发工程师',
        email: 'zhangsan@company.com',
        phone: '138-0000-0001',
        location: '北京',
        joinDate: '2024-01-15',
        status: 'online',
        avatar: '',
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
        projects: 5
      }, {
        id: 2,
        name: '李四',
        role: '后端开发工程师',
        email: 'lisi@company.com',
        phone: '138-0000-0002',
        location: '上海',
        joinDate: '2024-02-20',
        status: 'online',
        avatar: '',
        skills: ['Node.js', 'Python', 'PostgreSQL'],
        projects: 3
      }, {
        id: 3,
        name: '王五',
        role: 'UI/UX设计师',
        email: 'wangwu@company.com',
        phone: '138-0000-0003',
        location: '广州',
        joinDate: '2024-03-10',
        status: 'offline',
        avatar: '',
        skills: ['Figma', 'Sketch', 'Adobe XD'],
        projects: 4
      }, {
        id: 4,
        name: '赵六',
        role: '产品经理',
        email: 'zhaoliu@company.com',
        phone: '138-0000-0004',
        location: '深圳',
        joinDate: '2024-01-05',
        status: 'online',
        avatar: '',
        skills: ['需求分析', '项目管理', '用户研究'],
        projects: 6
      }, {
        id: 5,
        name: '钱七',
        role: '测试工程师',
        email: 'qianqi@company.com',
        phone: '138-0000-0005',
        location: '杭州',
        joinDate: '2024-04-01',
        status: 'online',
        avatar: '',
        skills: ['自动化测试', '性能测试', 'Jest'],
        projects: 3
      }, {
        id: 6,
        name: '孙八',
        role: 'DevOps工程师',
        email: 'sunba@company.com',
        phone: '138-0000-0006',
        location: '成都',
        joinDate: '2024-03-25',
        status: 'offline',
        avatar: '',
        skills: ['Docker', 'Kubernetes', 'CI/CD'],
        projects: 2
      }];
      setMembers(mockMembers);
      setLoading(false);
    } catch (error) {
      console.error('获取成员失败:', error);
      setLoading(false);
    }
  };
  const getStatusColor = status => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-400';
  };
  const getStatusText = status => {
    return status === 'online' ? '在线' : '离线';
  };
  const formatJoinDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">团队成员</h1>
            <p className="text-gray-600 mt-1">管理您的团队成员</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            添加成员
          </Button>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总成员数</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
              <p className="text-xs text-gray-500">活跃团队成员</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">在线成员</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.filter(m => m.status === 'online').length}</div>
              <p className="text-xs text-gray-500">当前在线</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均项目数</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(members.reduce((sum, m) => sum + m.projects, 0) / members.length)}
              </div>
              <p className="text-xs text-gray-500">每人参与项目</p>
            </CardContent>
          </Card>
        </div>

        {/* 成员网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-blue-500 text-white text-lg">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {member.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {member.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    加入时间: {formatJoinDate(member.joinDate)}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {member.projects} 个项目
                    </Badge>
                    <Badge variant={member.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                      {getStatusText(member.status)}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm font-medium mb-2">技能标签</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>)}
                    {member.skills.length > 3 && <Badge variant="outline" className="text-xs">
                        +{member.skills.length - 3}
                      </Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </div>;
}