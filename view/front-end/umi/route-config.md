# 路由嵌套功能实现

## 项目结构
```
src/
├── pages/          # 页面组件
│   ├── login/      # 登录页面
│   ├── 403/        # 无权限页面
│   ├── home/       # 普通用户页面
│   └── admin/      # 管理员页面
├── layouts/        # 布局组件
├── components/     # 公共组件
├── models/         # 数据模型
├── api/           # API 接口
└── types/         # TypeScript 类型定义
```

## 主要变更

### 1. 路由配置重构
- 将路由配置从 `.umirc.ts` 移至独立的 `config/routes.ts` 文件
- 新增路由配置：
  - `/login` - 登录页面 (`src/pages/login`)
  - `/403` - 无权限页面 (`src/pages/403`)
  - `/home/*` - 普通用户路由 (`src/pages/home`)
  - `/admin/*` - 管理员路由 (`src/pages/admin`)

### 2. 权限控制增强
- 在 `src/models` 中实现用户权限控制逻辑
- 基于 `userClass` 的路由访问控制
- 添加 403 无权限页面

### 3. 菜单配置优化
- 菜单配置位于 `config/routes.ts`
- 实现动态菜单渲染
- 支持多级菜单结构

### 4. 新增功能
- 新增管理员仪表盘页面 (`src/pages/admin/dashboard`)
  - 实现流量监控图表
  - 实现恶意样本检测统计
  - 添加数据统计卡片

### 5. 项目配置优化
- 更新 `.umirc.ts` 站点配置
- 优化 `src/layouts` 布局样式
- 添加 `public` 目录下的网站图标配置

## 技术细节

### 路由守卫实现
```typescript
// src/app.tsx
export function onRouteChange({ location }: { location: any }) {
  const token = localStorage.getItem('token');
  const { pathname } = location;

  if (!token) {
    history.push('/login');
  } else {
    // 权限控制逻辑
    switch (localStorage.userClass) {
      case '4':
        // 普通用户权限控制
        break;
      default:
        history.push('/403');
        break;
    }
  }
}
```

### 菜单配置结构
```typescript
// config/routes.ts
export const normalUserMenuItems = [
  {
    key: '/home/dashboard',
    icon: createElement(DashboardOutlined),
    label: '首页'
  },
  {
    key: 'pages',
    icon: createElement(FileTextOutlined),
    label: '页面管理',
    children: [
      {
        key: '/home/page1',
        label: '页面1'
      },
      {
        key: '/home/page2',
        label: '页面2'
      }
    ]
  }
]
```

## 影响范围
- `src/pages` - 路由系统重构
- `src/models` - 权限控制系统
- `config/routes.ts` - 菜单系统
- `src/pages/admin` - 管理员仪表盘
- `.umirc.ts` - 项目配置文件

## 后续建议
1. 完善 `src/models` 中的权限管理系统
2. 优化 `src/pages` 路由加载性能
3. 在 `src/layouts` 中添加路由切换动画
4. 实现更细粒度的权限控制