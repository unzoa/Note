# Element-UI

### 1. el-menu
- 高亮问题

```html
<el-menu
  router
  @select="menuHandle"
  background-color="#315697"
  text-color="#d8d8d8"
  active-text-color="#fff"
  :unique-opened=true
  :default-active="$route.path">
  ...
</el-menu>
```
