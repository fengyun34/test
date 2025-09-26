// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, useToast, Badge } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Sparkles, Zap, Shield, User, Lock, ChevronRight, Github, Chrome, Mail } from 'lucide-react';

export default function LoginPage(props) {
  const {
    $w
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
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
    // 鼠标移动效果
    const handleMouseMove = e => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const handleLogin = async e => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: '登录失败',
        description: '请输入邮箱和密码',
        variant: 'destructive'
      });
      return;
    }
    setLoading(true);
    try {
      // 模拟登录逻辑
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: '登录成功',
        description: '正在跳转到项目列表...',
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
        description: error.message || '请检查您的登录信息',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSocialLogin = provider => {
    toast({
      title: `${provider} 登录`,
      description: `正在通过 ${provider} 登录...`
    });
  };
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
              欢迎来到未来工作空间
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-cyan-400" />
                  邮箱地址
                </label>
                <div className="relative">
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
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
              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25">
                {loading ? <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    登录中...
                  </div> : <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-2" />
                    安全登录
                  </div>}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">或使用以下方式</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={() => handleSocialLogin('GitHub')} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 text-slate-300">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button type="button" variant="outline" onClick={() => handleSocialLogin('Google')} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 text-slate-300">
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

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
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
            <Zap className="h-3 w-3 mr-1" />
            实时同步
          </Badge>
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
            <Shield className="h-3 w-3 mr-1" />
            企业级安全
          </Badge>
          <Badge variant="outline" className="border-pink-500/30 text-pink-400 bg-pink-500/10">
            <Sparkles className="h-3 w-3 mr-1" />
            AI 驱动
          </Badge>
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>;
}