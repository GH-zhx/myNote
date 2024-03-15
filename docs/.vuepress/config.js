const { copyCode } = require("vuepress-plugin-copy-code2");

module.exports = {
  // 站点配置
  base: "/myNote/",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/imgs/favicon.jpg" }]],
  title: "zhx_docs",
  description: "个人博客",
  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/imgs/favicon.jpg",
    lastUpdated: false,
    navbar: [
      {
        text: "WebAPI",
        link: "/WebAPI/",
      },
      {
        text: "structure",
        link: "/structure/",
      },
      {
        text: "structure",
        link: "/structure/",
      },
      {
        text: "network",
        link: "/network/",
      },
      {
        text: "React",
        link: "/react/",
      },
      {
        text: "Vue",
        link: "/Vue/",
      },
      {
        text: "js",
        link: "/js/",
      },
      {
        text: "HTML",
        link: "/html/",
      },
      {
        text: "CSS",
        link: "/css/",
      },
      {
        text: "issue",
        link: "/developIssue/",
      },
      {
        text: "skill",
        link: "/programSkill/",
      },
      {
        text: "concept",
        link: "/concept/",
      },
      {
        text: "公共库",
        link: "/commonLibrary/",
      },
      {
        text: "面试题",
        link: "/test/"
      }
    ],
    sidebar: {
      "/structure/": [
        {
          text: "构建工具",
          children: ["/structure/README.md"]
        },
        {
          text: "webpack",
          children: [
            "/structure/webpack/README.md",
            // {
            //   text: "学习教程",
            //   children: ["/structure/webpack/intro/README.md", "/structure/webpack/intro/pre.md", "/structure/webpack/intro/group.md", "/structure/webpack/intro/learn.md", "/structure/webpack/intro/asset.md"]
            // },
            {
              text: "基础配置",
              children: [
                "/structure/webpack/base/README.md",
                "/structure/webpack/base/base.md",
                "/structure/webpack/base/config.md",
                "/structure/webpack/base/development.md",
                "/structure/webpack/base/css.md",
                "/structure/webpack/base/image.md",
                "/structure/webpack/base/output.md",
                "/structure/webpack/base/clean.md",
                "/structure/webpack/base/font.md",
                "/structure/webpack/base/other.md",
                "/structure/webpack/base/javascript.md",
                "/structure/webpack/base/html.md",
                "/structure/webpack/base/server.md",
                "/structure/webpack/base/production.md",
                "/structure/webpack/base/optimizeCss.md",
                "/structure/webpack/base/minifyHtml.md",
                "/structure/webpack/base/summary.md",
              ],
            },
            {
              text: "高级优化",
              children: ["/structure/webpack/senior/README.md", "/structure/webpack/senior/enhanceExperience.md", "/structure/webpack/senior/liftingSpeed.md", "/structure/webpack/senior/reduceVolume.md", "/structure/webpack/senior/optimizePerformance.md", "/structure/webpack/senior/summary.md"],
            },
            {
              text: "项目配置",
              children: ["/structure/webpack/project/README.md", "/structure/webpack/project/react-cli.md", "/structure/webpack/project/vue-cli.md", "/structure/webpack/project/summary.md"],
            },
            {
              text: "原理分析",
              children: ["/structure/webpack/origin/README.md", "/structure/webpack/origin/loader.md", "/structure/webpack/origin/plugin.md", "/structure/webpack/origin/summary.md"],
            },]
        },
      ],
      "/react/": [
        {
          // text:'React知识点',
          children: ['/react/README.md', '/react/UsageTips', '/react/Router', '/react/redux']
        }
      ],
      "/programSkill/": [
        {
          // text:'React知识点',
          children: ['/programSkill/README.md']
        }
      ],
      "/js/": [
        {
          // text:'React知识点',
          children: ['/js/README.md', '/js/es6', '/js/API', '/js/class', '/js/inherit', '/js/promise','/js/ts']
        }
      ],
      "/html/": [
        {
          // text:'React知识点',
          children: ['/html/README.md']
        }
      ],
      "/css/": [
        {
          text: 'css相关',
          children: ['/css/README.md', '/css/pretreatment', '/css/layout', '/css/common']
        }
      ],
      "/concept/": [
        {
          // text:'React知识点',
          children: ['/concept/README.md']
        }
      ],
      "/developIssue/": [
        {
          // text:'React知识点',
          children: ['/developIssue/README.md']
        }
      ],
      "/commonLibrary/": [
        {
          // text:'React知识点',
          children: ['/commonLibrary/README.md']
        }
      ],
      "/network/": [
        {
          text:'网络相关',
          children: ['/network/README.md','/network/Ajax.md','/network/http.md']
        }
      ],
      "/Vue/": [
        {
          text: 'Vue相关',
          children: ['/Vue/README.md', '/Vue/vue3.md']
        }
      ],
      "/test/": [
        {
          // text: '面试题',
          children: ['/test/README.md']
        }
      ],
      "/WebAPI/": [
        {
          text: 'WebAPI',
          children: ['/WebAPI/README.md']
        }
      ],
    },
  },
  plugins: [
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCode({
      // 插件选项
      pure: true,
    }),
    [
      "@vuepress/plugin-external-link-icon",
      {
        locales: {
          "/": {
            openInNewWindow: "open in new window",
          },
          "/zh/": {
            openInNewWindow: "在新窗口打开",
          },
        },
      },
    ],
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "Search",
          },
          "/zh/": {
            placeholder: "搜索",
          },
        },
      },
    ],
  ],
};