// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Label, useToast, Separator } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Mail, Lock, MessageCircle, Smartphone, User, Sun, Moon, Users, QrCode } from 'lucide-react';

export default function LoginPage(props) {
  const {
    $w
  } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'wechat' | 'sms'
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  const handlePasswordLogin = async e => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: '输入错误',
        description: '请填写邮箱和密码',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      const mockUsers = [{
        email: 'admin@example.com',
        password: 'admin123',
        name: '管理员',
        role: '项目经理'
      }, {
        email: 'user@example.com',
        password: 'user123',
        name: '普通用户',
        role: '前端开发'
      }, {
        email: 'demo',
        password: 'demo123',
        name: '演示用户',
        role: 'demo'
      }];
      const user = mockUsers.find(u => (u.email === email || u.name === email) && u.password === password);
      if (user) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
          localStorage.removeItem('rememberMe');
        }
        localStorage.setItem('currentUser', JSON.stringify({
          id: Date.now().toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: `https://images.unsplash.com/photo-${Date.now()}?w=64&h=64&fit=crop&crop=face`
        }));
        toast({
          title: '登录成功',
          description: `欢迎回来，${user.name}！`
        });
        setTimeout(() => {
          $w.utils.navigateTo({
            pageId: 'projects',
            params: {}
          });
        }, 1000);
      } else {
        toast({
          title: '登录失败',
          description: '邮箱或密码错误',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '登录失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleWeChatLogin = async () => {
    setIsLoading(true);
    try {
      // 模拟微信登录流程
      toast({
        title: '微信登录',
        description: '正在跳转到微信登录...'
      });

      // 模拟微信扫码登录成功
      setTimeout(() => {
        const wechatUser = {
          id: 'wechat_' + Date.now(),
          email: 'wechat_user@example.com',
          name: '微信用户',
          role: '用户',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
        };
        localStorage.setItem('currentUser', JSON.stringify(wechatUser));
        toast({
          title: '微信登录成功',
          description: '欢迎使用微信登录！'
        });
        setTimeout(() => {
          $w.utils.navigateTo({
            pageId: 'projects',
            params: {}
          });
        }, 1000);
      }, 2000);
    } catch (error) {
      toast({
        title: '微信登录失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSMSLogin = async e => {
    e.preventDefault();
    if (!phone || !smsCode) {
      toast({
        title: '输入错误',
        description: '请填写手机号和验证码',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟短信登录
      const smsUser = {
        id: 'sms_' + Date.now(),
        email: phone + '@sms.com',
        name: '手机用户',
        role: '用户',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
      };
      localStorage.setItem('currentUser', JSON.stringify(smsUser));
      toast({
        title: '短信登录成功',
        description: '欢迎使用手机登录！'
      });
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'projects',
          params: {}
        });
      }, 1000);
    } catch (error) {
      toast({
        title: '短信登录失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const sendSMSCode = () => {
    if (!phone) {
      toast({
        title: '请输入手机号',
        description: '请先输入正确的手机号码',
        variant: 'destructive'
      });
      return;
    }
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    toast({
      title: '验证码已发送',
      description: '验证码已发送到您的手机'
    });
  };
  const handleRegister = () => {
    $w.utils.navigateTo({
      pageId: 'register',
      params: {}
    });
  };
  const handleForgotPassword = () => {
    $w.utils.navigateTo({
      pageId: 'forgot-password',
      params: {}
    });
  };
  return <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">欢迎回来</CardTitle>
          <CardDescription className="text-center">
            选择您的登录方式
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 登录方式选择 */}
          <div className="flex space-x-2 mb-6">
            <Button variant={loginMethod === 'password' ? 'default' : 'outline'} className="flex-1" onClick={() => setLoginMethod('password')}>
              密码登录
            </Button>
            <Button variant={loginMethod === 'wechat' ? 'default' : 'outline'} className="flex-1" onClick={() => setLoginMethod('wechat')}>
              微信登录
            </Button>
            <Button variant={loginMethod === 'sms' ? 'default' : 'outline'} className="flex-1" onClick={() => setLoginMethod('sms')}>
              短信登录
            </Button>
          </div>

          {/* 密码登录 */}
          {loginMethod === 'password' && <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱或用户名</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="email" type="text" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked)} />
                  <Label htmlFor="remember" className="text-sm">记住我</Label>
                </div>
                <Button type="button" variant="link" className="text-sm px-0" onClick={handleForgotPassword}>
                  忘记密码？
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    登录中...
                  </> : '登录'}
              </Button>
            </form>}

          {/* 微信登录 */}
          {loginMethod === 'wechat' && <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">请使用微信扫描二维码登录</p>
                <Button onClick={handleWeChatLogin} className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      登录中...
                    </> : <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      微信一键登录
                    </>}
                </Button>
              </div>
            </div>}

          {/* 短信登录 */}
          {loginMethod === 'sms' && <form onSubmit={handleSMSLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="phone" type="tel" placeholder="13800138000" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smsCode">验证码</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input id="smsCode" type="text" placeholder="123456" value={smsCode} onChange={e => setSmsCode(e.target.value)} maxLength={6} required />
                  </div>
                  <Button type="button" variant="outline" onClick={sendSMSCode} disabled={countdown > 0}>
                    {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    登录中...
                  </> : '短信登录'}
              </Button>
            </form>}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              还没有账户？{' '}
              <Button type="button" variant="link" className="px-1" onClick={handleRegister}>
                立即注册
              </Button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              演示账户：demo / demo123 或 admin@example.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>;
}