# 富文本

## vue-quill-editor

### 安装

```bash
npm i vue-quill-editor -D
```

### 使用

```vue
<template>
  <div class="RichText">
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
    />
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'RichText',

  // 模板依赖 (模板内使用的资源)

  components: {
    quillEditor
  },

  // 本地状态 (本地的响应式 property)

  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic'], ['image']]
        }
      }
    }
  },

  mounted () {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },

  // 其他生命周期钩子

  methods: {
    // toolbar上图片按钮事件
    // 目标：选中图片，单独上传至服务器，利用返回的url插入到现有富文本中
    imgHandler () {
      const quill = this.$refs.myQuillEditor.quill
      const startInd = quill.getLength()
      quill.insertEmbed(startInd, 'image', '/botticeli.png?timestamp=asa1273hh1238')
    }
  }
}
</script>

<style scoped lang="scss">
  .RichText {
    position: relative;
  }
</style>

```