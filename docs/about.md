# 关于我

<!-- 关键：用 div 包裹，通过 padding 预占高度 -->
<div class="avatar-wrapper">
  <img 
    src="https://picsum.photos/200/20" 
    alt="头像" 
    class="avatar"
    loading="lazy"
  >
</div>

一个热爱技术与生活的程序员，  
习惯用文字和镜头记录思考，  
相信「日拱一卒，功不唐捐」。

这里的内容无关流量，只为沉淀认知，  
欢迎通过 GitHub 评论区交流。


<style scoped>
/* 核心：按图片比例（如 1:1）预占位 */
.avatar-wrapper {
  width: 200px;       /* 图片宽度 */
  height: 200px;          /* 高度由 padding 撑开 */
  margin: 0 auto 1rem; /* 水平居中，与文字间距 */
  position: relative;  /* 给子元素做参考 */
}

.avatar {
  position: absolute;  /* 覆盖到占位区 */
  width: 100%;         /* 撑满父容器 */
  height: 100%;
  object-fit: cover;   /* 保持比例，裁剪溢出 */
  border-radius: 50%;  /* 圆形头像 */
}
</style>