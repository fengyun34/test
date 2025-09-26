// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, useToast, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Sparkles, Zap, Shield, User, Lock, ChevronRight, MessageSquare, Smartphone, Mail, QrCode } from 'lucide-react';

export default function LoginPage(props) {
  const {
    $w
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('wechat');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const {
    toast
  } = useToast();
  useEffect(() => {
    // 生成粒子效果
    const newParticles = Array.from({
      length: 50
    }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);
  }, []);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  const handleLogin = async type => {
    setLoading(true);
    try {
      // 模拟登录逻辑
      await new Promise(resolve => setTimeout(resolve, 1500));
      let message = '';
      switch (type) {
        case 'wechat':
          message = '微信登录成功';
          break;
        case 'phone':
          message = '手机验证码登录成功';
          break;
        case 'email':
          message = '邮箱登录成功';
          break;
      }
      toast({
        title: '登录成功',
        description: message,
        className: 'bg-green-500 text-white border-green-500'
      });
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'projects',
          params: {}
        });
      }, 1000);
    } catch (error) {
      toast({
        title: '登录失败',
        description: error.message || '登录时发生错误',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSendCode = () => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      toast({
        title: '请输入正确手机号',
        variant: 'destructive'
      });
      return;
    }
    setCountdown(60);
    toast({
      title: '验证码已发送',
      description: '请查收短信验证码'
    });
  };
  const renderWeChatLogin = () => <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-50 animate-pulse" />
          <div className="relative w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-green-500/30">
            <QrCode className="w-32 h-32 text-green-400" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-slate-200">微信扫码登录</h3>
          <p className="text-sm text-slate-400">请使用微信扫描二维码登录</p>
          <Button onClick={() => handleLogin('wechat')} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg shadow-green-500/25">
            <MessageSquare className="h-4 w-4 mr-2" />
            模拟微信登录
          </Button>
        </div>
      </div>
    </div>;
  const renderPhoneLogin = () => <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center">
          <Smartphone className="h-4 w-4 mr-2 text-cyan-400" />
          手机号码
        </label>
        <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入11位手机号" className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center">
          <Lock className="h-4 w-4 mr-2 text-cyan-400" />
          验证码
        </label>
        <div className="flex space-x-2">
          <Input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="请输入验证码" maxLength={6} className="flex-1 bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20" />
          <Button type="button" onClick={handleSendCode} disabled={countdown > 0} variant="outline" className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 text-cyan-400">
            {countdown > 0 ? `${countdown}s` : '获取验证码'}
          </Button>
        </div>
      </div>
      
      <Button onClick={() => handleLogin('phone')} disabled={loading || !phone || !code} className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25">
        {loading ? <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            登录中...
          </div> : <div className="flex items-center justify-center">
            <Smartphone className="h-4 w-4 mr-2" />
            手机验证码登录
          </div>}
      </Button>
    </div>;
  const renderEmailLogin = () => <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center">
          <Mail className="h-4 w-4 mr-2 text-cyan-400" />
          邮箱地址
        </label>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center">
          <Lock className="h-4 w-4 mr-2 text-cyan-400" />
          密码
        </label>
        <div className="relative">
          <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {showPassword ? <EyeOff className="h-4 w-4 text-slate-500 hover:text-cyan-400 transition-colors" /> : <Eye className="h-4 w-4 text-slate-500 hover:text-cyan-400 transition-colors" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm text-slate-400">
          <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20" />
          <span>记住我</span>
        </label>
        <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
          忘记密码？
        </a>
      </div>

      <Button onClick={() => handleLogin('email')} disabled={loading || !email || !password} className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25">
        {loading ? <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            登录中...
          </div> : <div className="flex items-center justify-center">
            <Shield className="h-4 w-4 mr-2" />
            邮箱密码登录
          </div>}
      </Button>
    </div>;
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* 动态背景粒子 */}
      <div className="absolute inset-0">
        {particles.map(particle => <div key={particle.id} className="absolute rounded-full bg-cyan-400 animate-pulse" style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity,
        animation: `float ${particle.speed}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }} />)}
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.cyan.500/0.1)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.cyan.500/0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* 发光效果 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: '1s'
    }} />

      {/* 主登录卡片 */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse" />
        <Card className="relative bg-slate-900/80 backdrop-blur-xl border-slate-800/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-50 animate-pulse" />
                <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              项目管理系统
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              选择您的登录方式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
                <TabsTrigger value="wechat" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  微信
                </TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Smartphone className="h-4 w-4 mr-1" />
                  手机
                </TabsTrigger>
                <TabsTrigger value="email" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Mail className="h-4 w-4 mr-1" />
                  邮箱
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="wechat" className="mt-6">
                {renderWeChatLogin()}
              </TabsContent>
              
              <TabsContent value="phone" className="mt-6">
                {renderPhoneLogin()}
              </TabsContent>
              
              <TabsContent value="email" className="mt-6">
                {renderEmailLogin()}
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                还没有账号？{' '}
                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  立即注册
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 技术标签 */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full text-xs flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            实时同步
          </div>
          <div className="border-purple-500/30 text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full text-xs flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            企业级安全
          </div>
          <div className="border-pink-500/30 text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full text-xs flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            AI 驱动
          </div>
        </div>
      </div>

      {/* 添加CSS动画 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
      `}</style>
    </div>;
}