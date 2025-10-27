# useModel 使用指南

## 项目结构

```
src/
  ├── models/           # 模型定义目录
  │   └── counterModel.ts
  ├── types/           # 类型定义目录
  │   └── plugin-model.d.ts
  └── pages/           # 页面组件
      └── home/
          ├── page1/
          │   └── index.tsx
          └── page2/
              └── index.tsx
```

## 配置说明

在 `.umirc.ts` 中启用 model 插件：

```typescript
export default {
  plugins: ['@umijs/plugins/dist/model'],
  model: {},
  // ... 其他配置
}
```

## 模型定义

在 `src/models/counterModel.ts` 中定义模型：

```typescript
import { useState, useCallback } from 'react';

export default function counterModel() {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);

  return { counter, increment, decrement };
}
```

## 类型定义

在 `src/types/plugin-model.d.ts` 中定义类型：

```typescript
declare module '@umijs/plugin-model' {
  export function useModel<T>(namespace: string): T;
}

interface CounterModel {
  count: number;
  increment: () => void;
  decrement: () => void;
}
```

## 使用示例

在页面组件中使用模型（以 `src/pages/home/page1/index.tsx` 为例）：

```typescript
import { Card, Space, Button } from 'antd';
import { useModel } from 'umi';

const Page1: React.FC = () => {
  const { counter, increment, decrement } = useModel('counterModel') as any;

  return (
    <div className={styles.container}>
      <Card title="页面1">
        <Space direction="vertical" size="large">
          <div>这是页面1的内容</div>
          <div>计数器: {counter}</div>
          <Button onClick={increment}>增加</Button>
          <Button onClick={decrement}>减少</Button>
        </Space>
      </Card>
    </div>
  );
};
```

在 `src/pages/home/page2/index.tsx` 中使用相同的模型：

```typescript
import { Card, Space } from 'antd';
import { useModel } from 'umi';

const Page2: React.FC = () => {
  const { counter } = useModel('counterModel') as any;

  return (
    <div className={styles.container}>
      <Card title="页面2">
        <Space direction="vertical" size="large">
          <div>这是页面2的内容</div>
          <div>计数器: {counter}</div>
        </Space>
      </Card>
    </div>
  );
};
```

## 状态同步说明

1. 状态共享：Page1 和 Page2 共享同一个 counterModel 实例
2. 实时同步：
   - 在 Page1 中点击按钮修改 counter 值
   - 切换到 Page2 后，counter 值会保持同步
   - 返回 Page1 时，counter 值仍然保持最新状态
3. 实现原理：
   - useModel 在组件树中维护了一个全局状态
   - 所有使用相同命名空间的组件都会订阅这个状态
   - 状态更新时会自动触发所有订阅组件的重新渲染

## 特点

1. 基于 React Hooks：使用 useState 和 useCallback 实现状态管理
2. 跨组件共享：不同页面（page1、page2）可以共享同一个模型状态
3. 类型支持：通过 TypeScript 类型定义提供类型安全
4. 插件化：通过 Umi 插件系统集成

## 最佳实践

1. 模型文件命名：使用 `xxxModel.ts` 的命名方式
2. 状态管理：使用 React Hooks 管理状态
3. 性能优化：使用 useCallback 优化回调函数
4. 类型定义：为模型定义清晰的接口类型

## 注意事项

1. 模型命名空间：使用文件名作为模型的命名空间
2. 类型断言：当前示例中使用了 `as any`，建议完善类型定义
3. 状态共享：注意状态共享可能带来的性能影响
4. 副作用处理：在模型中处理副作用时需要注意清理工作