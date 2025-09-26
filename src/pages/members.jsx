// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { Users, Briefcase, Clock, CheckCircle, Loader2 } from 'lucide-react';

export default function MembersPage(props) {
  const {
    $w
  } = props;
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const fetchMembers = async () => {
    try {
      setLoading(true);
      // 使用云开发数据源调用方式获取成员列表
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'member',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          orderBy: [{
            name: 'asc'
          }],
          getCount: true
        }
      });
      if (result.records) {
        setMembers(result.records);
      } else {
        toast({
          title: '获取成员失败',
          description: '无法获取团队成员列表',
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
    fetchMembers();
  }, []);
  const getRoleColor = role => {
    switch (role) {
      case '项目经理':
        return 'bg-blue-500';
      case '前端开发':
        return 'bg-green-500';
      case '后端开发':
        return 'bg-purple-500';
      case 'UI设计师':
        return 'bg-pink-500';
      case '测试工程师':
        return 'bg-yellow-500';
      case '产品经理':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getWorkloadColor = workload => {
    if (workload >= 80) return 'text-red-500';
    if (workload >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">团队成员</h1>
              <p className="text-muted-foreground mt-2">管理团队所有成员及其工作量</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => <Card key={member._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p>{member.email}</p>
                      <p>加入时间: {new Date(member.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>工作量</span>
                          <span className={getWorkloadColor(member.workload || 0)}>{member.workload || 0}%</span>
                        </div>
                        <Progress value={member.workload || 0} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{member.activeProjects || 0}</p>
                            <p className="text-xs text-muted-foreground">活跃项目</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{member.completedTasks || 0}/{member.totalTasks || 0}</p>
                            <p className="text-xs text-muted-foreground">完成任务</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>团队统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold">{members.length}</p>
                    <p className="text-sm text-muted-foreground">团队成员</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">
                      {members.reduce((sum, m) => sum + (m.activeProjects || 0), 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">活跃项目</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">
                      {members.reduce((sum, m) => sum + (m.totalTasks || 0), 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">总任务数</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">
                      {members.length > 0 ? Math.round(members.reduce((sum, m) => sum + (m.workload || 0), 0) / members.length) : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground">平均工作量</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>;
}