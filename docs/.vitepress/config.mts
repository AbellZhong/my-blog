import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "旅记",
  description: "日知录",
  srcDir: '.',
  base: '/my-blog/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      label: '页面导航'
    },
    lastUpdated: {
      text: '最后更新时间',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '生活', link: '/生活/' },  // 直接指向生活分类首页
      { text: '技术', link: '/技术/' },  // 直接指向技术分类首页
      { text: '工作', link: '/工作/' },  // 直接指向工作分类首页
      { text: '娱乐', link: '/娱乐/' },  // 直接指向娱乐分类首页
      { text: '标签', link: '/tags.md' }  // 新增标签页入口
    ],

    // 侧边栏配置（修正路径格式，确保与文件结构完全匹配）
    sidebar: {
      // 生活分类侧边栏（匹配生活/index.md及下属文章）
      '/生活/': [
        {
          text: '生活随记',
          items: [
            { text: '日常碎片', link: '/生活/日常碎片.md' },
            { text: '2024-05 旅行札记', link: '/生活/2024-05-旅行.md' },
          ]
        }
      ],

      // 技术分类侧边栏（匹配技术/index.md及下属文章）
      '/技术/': [
        {
          text: '技术笔记',
          items: [
            { text: 'JavaScript 异步编程', link: '/技术/JavaScript异步.md' },
            { text: 'VitePress 从搭建到部署', link: '/技术/VitePress配置.md' },
          ]
        }
      ],

      // 工作分类侧边栏（匹配工作/index.md及下属文章）
      '/工作/': [
        {
          text: '管理与协作',
          items: [
            { text: '代码评审中的沟通艺术', link: '/工作/管理/代码评审.md' },
            { text: '如何优雅地拒绝不合理需求', link: '/工作/协作/拒绝需求.md' },
          ]
        },
        {
          text: '思考与成长',
          items: [
            { text: '技术管理者的思维转变', link: '/工作/成长/管理转型.md' },
          ]
        }
      ],

      // 娱乐分类侧边栏（匹配娱乐/index.md及下属文章）
      '/娱乐/': [
        {
          text: '观影与游戏',
          items: [
            { text: '《奥本海默》：技术与人性', link: '/娱乐/电影/奥本海默.md' },
            { text: '《塞尔达》的开放世界哲学', link: '/娱乐/游戏/塞尔达.md' },
          ]
        },
        {
          text: '书籍感悟',
          items: [
            { text: '《禅与摩托车维修艺术》读后感', link: '/娱乐/书籍/禅与摩托车.md' },
          ]
        }
      ],

      // 首页默认不显示侧边栏
      '/': []
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    }
  },

  // 添加评论组件注入
  vite: {
    plugins: [
      {
        name: 'giscus-inject',
        transformIndexHtml(html) {
          const giscusScript = `
            <script>
              (function() {
                function injectGiscus() {
                  const container = document.getElementById('giscus');
                  if (container) {
                    container.remove();
                  }
                  
                  const div = document.createElement('div');
                  div.id = 'giscus';
                  div.style.marginTop = '3rem';
                  div.style.paddingTop = '2rem';
                  div.style.borderTop = '1px solid #eaeaea';
                  
                  const main = document.querySelector('main');
                  if (main) {
                    main.appendChild(div);
                    
                    const script = document.createElement('script');
                    script.src = 'https://giscus.app/client.js';
                    script.setAttribute('data-repo', 'AbellZhong/my-blog');
                    script.setAttribute('data-repo-id', 'R_kgDOPJGc3A');
                    script.setAttribute('data-category', 'General');
                    script.setAttribute('data-category-id', 'DIC_kwDOPJGc3M4CsqGO');
                    script.setAttribute('data-mapping', 'pathname');
                    script.setAttribute('data-strict', '0');
                    script.setAttribute('data-reactions-enabled', '1');
                    script.setAttribute('data-emit-metadata', '0');
                    script.setAttribute('data-input-position', 'bottom');
                    script.setAttribute('data-theme', 'light');
                    script.setAttribute('data-lang', 'zh-CN');
                    script.async = true;
                    
                    div.appendChild(script);
                    console.log('Giscus 已加载，路径:', window.location.pathname);
                  }
                }

                function shouldShowComments() {
                  const path = window.location.pathname;
                  return path !== '/' && !path.endsWith('/') && !path.includes('/index.html');
                }

                // 初始加载
                if (shouldShowComments()) {
                  setTimeout(injectGiscus, 100);
                }

                // 使用 history API 监听路由变化
                let currentPath = window.location.pathname;
                
                // 监听 popstate 事件（浏览器前进后退）
                window.addEventListener('popstate', function() {
                  if (window.location.pathname !== currentPath) {
                    currentPath = window.location.pathname;
                    console.log('路由变化 (popstate):', currentPath);
                    if (shouldShowComments()) {
                      setTimeout(injectGiscus, 100);
                    } else {
                      const container = document.getElementById('giscus');
                      if (container) container.remove();
                    }
                  }
                });

                // 监听 pushstate 和 replacestate 事件
                const originalPushState = history.pushState;
                const originalReplaceState = history.replaceState;
                
                history.pushState = function() {
                  originalPushState.apply(this, arguments);
                  if (window.location.pathname !== currentPath) {
                    currentPath = window.location.pathname;
                    console.log('路由变化 (pushState):', currentPath);
                    if (shouldShowComments()) {
                      setTimeout(injectGiscus, 100);
                    } else {
                      const container = document.getElementById('giscus');
                      if (container) container.remove();
                    }
                  }
                };
                
                history.replaceState = function() {
                  originalReplaceState.apply(this, arguments);
                  if (window.location.pathname !== currentPath) {
                    currentPath = window.location.pathname;
                    console.log('路由变化 (replaceState):', currentPath);
                    if (shouldShowComments()) {
                      setTimeout(injectGiscus, 100);
                    } else {
                      const container = document.getElementById('giscus');
                      if (container) container.remove();
                    }
                  }
                };

                // 备用方案：MutationObserver 监听 DOM 变化
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                      // 检查是否有新的页面内容加载
                      const hasNewContent = Array.from(mutation.addedNodes).some(node => 
                        node.nodeType === 1 && (
                          node.classList?.contains('content') || 
                          node.querySelector?.('.content') ||
                          node.tagName === 'MAIN'
                        )
                      );
                      
                      if (hasNewContent && window.location.pathname !== currentPath) {
                        currentPath = window.location.pathname;
                        console.log('路由变化 (MutationObserver):', currentPath);
                        if (shouldShowComments()) {
                          setTimeout(injectGiscus, 100);
                        } else {
                          const container = document.getElementById('giscus');
                          if (container) container.remove();
                        }
                      }
                    }
                  });
                });

                observer.observe(document.body, { 
                  childList: true, 
                  subtree: true 
                });
              })();
            </script>
          `;
          
          return html.replace('</body>', giscusScript + '</body>');
        }
      }
    ]
  }
})
