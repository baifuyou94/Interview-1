"use client"
import './home.css'
import { useState, useEffect } from 'react';

export default function Home() {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 添加倒计时状态
  const [countdown, setCountdown] = useState(0);
  // 验证手机号
  const validateMobile = (value: string = mobile) => {
    if (!value) {
      setMobileError('请输入手机号');
      return false;
    }
    const mobileRegex = /^1[3-9]\d{9}$/;
    if (!mobileRegex.test(value)) {
      setMobileError('手机号格式错误');
      return false;
    }
    setMobileError('');
    return true;
  };

  // 验证验证码
  const validateCode = (value: string = code) => {
    if (!value) {
      setCodeError('请输入验证码');
      return false;
    }
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(value)) {
      setCodeError('验证码格式错误');
      return false;
    }
    setCodeError('');
    return true;
  };

  // 输入框变化时触发验证
  const handleMobileChange = (e: any) => {
    setMobile(e.target.value);
    validateMobile(e.target.value);
  };
  // 验证码输入时触发验证
  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
    validateCode(e.target.value);
  };
  // 提交表单时触发验证
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateMobile() && validateCode()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        console.log({ mobile, code})
        console.log('登录成功，跳转到首页');
      }, 1000);
    }
  };

  // 获取验证码
  const handleGetCode = () => {
    setCountdown(60);
  }

// 倒计时逻辑
useEffect(() => {
  if (countdown > 0) {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }
}, [countdown]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        {/* 表单错误提示，会出现两种情况
        1.必填校验，错误提示“请输入手机号”
        2.格式校验，需满足国内手机号规则，错误提示“手机号格式错误”
        举例：<p className="form-error">手机号格式错误</p> */}
        <input
          placeholder="手机号"
          name="mobile"
          value={mobile}
          onChange={handleMobileChange}
        />
        {mobileError && <p className="form-error">{mobileError}</p>}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input
            placeholder="验证码"
            name="code"
            value={code}
            onChange={handleCodeChange}
          />
          {/* getcode默认disabled=true，当mobile满足表单验证条件后才位false */}
          <button
            className="getcode"
            disabled={!!mobileError || !mobile || countdown > 0}
            onClick={handleGetCode}
          >
            {countdown > 0 ? `${countdown}s 后重试` : '获取验证码'}
          </button>
        </div>
        {/* 表单错误提示，会出现两种情况
        
        1.必填校验，错误提示“请输入验证码”
        2.格式校验，6位数字，错误提示“验证码格式错误”
        举例：<p className="form-error">验证码格式错误</p> */}
        {codeError && <p className="form-error">{codeError}</p>}
      </div>
      {/* 表单提交中，按钮内的文字会变成“submiting......” */}

      <button className="submit-btn" type="submit" >
        {isSubmitting ? "submiting......" : "登录"}
      </button>
    </form>
  );
}
