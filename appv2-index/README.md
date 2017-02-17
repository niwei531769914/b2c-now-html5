#代码结构

app
├── css #css
├── images #图片
├── index.html
├── list.html
├── scripts #js
│   ├── common
│   ├── component
│   ├── lehu.h5.require.config.js
│   ├── page
│   └── vendor
└── templates #模板
    └── components
dist #打包后生成目录
├── images
├── list.html
├── scripts
├── styles
└── templates
    └── components
publish #打包后生成目录

#本地调试

1. 安装SwitchySharp
2. 导入配置
3. 使用nproxy

#版本管理

1. master分支上只能merge代码，不能提交代码。并且和线上代码保持一致。
2. master分支和线上保持一致原则：在发布前，从master分支merge最新代码到当前分支，防止别人已经merge代码master分支了，造成代码覆盖。同时只有发布到线上后，才能merge到master分支。
3. 新开发功能统一在master基础上新建分支，分支命名规则：dev.xx，发布后立即merge到master分支上。
4. 对于周期很长的功能开发，测试可能需要提前介入测试，可能需要转部分功能，这个时候为了保证开发代码不影响测试，需要在dev.xx基础上新建test.xx分支供测试使用，自己继续在dev.xx上开发功能。开发好一部分后merge到test.xx分支发布到测试环境给测试验证。
5. 修改线上问题热补丁也需要在master基础上新建分支，分支命名规则: hotfix.xx，发布后立即merge到master分支上。
6. 新建分支要通知相关前端同事。