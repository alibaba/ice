export default {
  // global
  'iceworks.global.disconnect.title': 'Connect failed',
  'iceworks.global.connect': 'Connect',
  'iceworks.global.reconnecting': 'Socket connect failed, reconnecting',
  'iceworks.global.reconnect_failed': 'Socket reconnect failed, please restart the iceworks service',
  'iceworks.global.disconnect': 'Socket connect failed',
  'iceworks.global.button.yes': 'Yes',
  'iceworks.global.button.no': 'No',
  'iceworks.global.button.submit': 'Submit',
  'iceworks.global.button.selectAll': 'Select All',
  'iceworks.global.fallback.title': 'Loading',
  'iceworks.global.adapter.title': 'Enable adapter failed',
  'iceworks.global.adapter.description': 'The current project is not configured with Adapter, please refer to the <a href="https://ice.work/docs/iceworks/migrate" target="_blank">documentation <a> for more details about Adapter',
  'iceworks.global.adapter.reload': 'Reload',
  'iceworks.global.no.project': 'Not found any project, please add a project first',
  'iceworks.global.layout.login': 'Login',

  // quick start
  'iceworks.quickStart.title': 'Create a new project from the most popular templates',
  'iceworks.quickStart.open': 'Open a project',
  'iceworks.quickStart.more': 'Check more templates',

  // menu
  'iceworks.menu.project': 'Projects',
  'iceworks.menu.task': 'Engineering',
  'iceworks.menu.task.dev': 'dev',
  'iceworks.menu.task.dev.desc': 'start server (for development)',
  'iceworks.menu.task.build': 'build',
  'iceworks.menu.task.build.desc': 'build the project (for production)',
  'iceworks.menu.task.lint': 'lint',
  'iceworks.menu.task.lint.desc': 'lint the project (for development)',
  'iceworks.menu.task.configuration': 'configuration',
  'iceworks.menu.task.configuration.desc': 'custom project configuration',
  'iceworks.menu.material': 'Materials',
  'iceworks.menu.setting': 'Settings',
  'iceworks.menu.setting.general': 'General',
  'iceworks.menu.setting.general.desc': 'Set theme, language, etc.',

  // setting
  'iceworks.setting.title': 'Settings',
  'iceworks.setting.general.title': 'General Settings',
  'iceworks.setting.general.language.title': 'Language',
  'iceworks.setting.general.theme.title': 'Theme',
  'iceworks.setting.general.theme.dark': 'Dark',
  'iceworks.setting.general.theme.light': 'Light',
  'iceworks.setting.general.editor.title': 'Editor',
  'iceworks.setting.general.npm.client.title': 'NPM Client',
  'iceworks.setting.general.custom.registry': 'npm - custom registry',
  'iceworks.setting.general.custom.placeholder': 'Please input custom registry',

  // project
  'iceworks.project.title': 'Projects',
  'iceworks.project.install.dependencies.title': 'Installing dependencies',
  'iceworks.project.install.dependencies.content': 'The dependencies of this project have not been installed yet. The installation process may take several minutes. Do you want to install it immediately?',
  'iceworks.project.submenu.opts.openProject': 'Open',
  'iceworks.project.submenu.opts.createProject': 'Create',

  // project panel
  'iceworks.project.panel.fallback.title': 'Panel',
  'iceworks.project.panel.fallback.desc': 'Panel loading error',

  // project quick task
  'iceworks.project.panel.quick.task.setting': 'Go to settings',

  // project guide
  'iceworks.project.panel.guide.title': 'Getting Started Guide',
  'iceworks.project.panel.guide.project': 'Project Management',
  'iceworks.project.panel.guide.project.desc': 'View and manage the current project in a visualized way, also, you can customize the panel through the settings button on the right',
  'iceworks.project.panel.guide.engineering': 'Engineering Management',
  'iceworks.project.panel.guide.engineering.desc': 'Manage complex dev config in a visualized way, will make front-end development easier and more convenient',
  'iceworks.project.panel.guide.material': 'Material Market',
  'iceworks.project.panel.guide.material.desc': 'We provide a lot of reusable templates and blocks, let you create projects quickly, also support change theme so that meet custom requirements',

  // project page
  'iceworks.project.panel.page.create.title': 'Create Page',
  'iceworks.project.panel.page.update.title': 'Update Page',
  'iceworks.project.panel.page.create.progress.start': 'Start create page...',
  'iceworks.project.panel.page.create.builder.empty': 'Select the block from the right',
  'iceworks.project.panel.page.create.error.name.content': 'The block name must be unique in this page',
  'iceworks.project.panel.page.delete.title': 'Delete Page',
  'iceworks.project.panel.page.delete.content': 'Are you sure to delete {name}?',
  'iceworks.project.panel.page.save.title': 'Page Information',
  'iceworks.project.panel.page.save.name.label': 'Page Name',
  'iceworks.project.panel.page.save.name.placeholder': 'Please enter the page directory name, a combination of letters and numbers, beginning with letters',
  'iceworks.project.panel.page.save.routePath.label': 'Router Path',
  'iceworks.project.panel.page.save.createRouterGroup.label': 'Do you want to create a new router group?',
  'iceworks.project.panel.page.save.parentRoutePath.label': 'Router Group Path',
  'iceworks.project.panel.page.save.parentRouteComponent.label': 'Router Group Component',
  'iceworks.project.panel.page.save.routePath.group.label': 'Select Group',
  'iceworks.project.panel.page.save.routePath.placeholder': 'Enter a string of lowercase letters and numbers, also support secondary routing separated by `/`',
  'iceworks.project.panel.page.save.menuName.label': 'Page Navigation',
  'iceworks.project.panel.page.save.menuName.placeholder': 'No navigation item will be generated if this is empty',
  'iceworks.project.panel.page.button.refresh': 'refresh',
  'iceworks.project.panel.page.button.add': 'add page',

  // project dependency
  'iceworks.project.panel.dependency.main.upgrade': 'Upgrade to {wantedVestion}',
  'iceworks.project.panel.dependency.main.reset.title': 'Reinstall',
  'iceworks.project.panel.dependency.main.reset.content': 'Will remove and reinstall all the dependencies of this project. During the installation, debugging services, create new pages, build project, etc will be disabled. Please wait patiently.',
  'iceworks.project.panel.dependency.main.refresh': 'Refresh',
  'iceworks.project.panel.dependency.main.download': 'Reinstall dependencies',
  'iceworks.project.panel.dependency.main.add': 'Add dependencies',
  'iceworks.project.panel.dependency.main.incompatible.title': 'Incompatible notice',
  'iceworks.project.panel.dependency.main.incompatible.content': 'Newly added dependencies {setDependencyText} have incompatible versions with {projectDependencyText}. Are you sure to continue?',
  'iceworks.project.panel.dependency.create.title': 'Add dependencies',
  'iceworks.project.panel.dependency.create.placeholder': 'Please enter npm package name and its version, e.g., lodash@latest. Press Enter to enter multiple dependencies.',

  // project layout
  'iceworks.project.panel.layout.refresh': 'refresh',
  'iceworks.project.panel.layout.none': 'No layout',

  // project todo
  'iceworks.project.panel.todo.none': 'No comments in the code need to deal with',
  'iceworks.project.panel.todo.example': 'e.g., // TODO blah, blah, blah',
  'iceworks.project.panel.todo.refresh': 'Refresh',
  'iceworks.project.panel.todo.line': 'Line {line}',

  // project def

  // project git
  'iceworks.project.panel.git.button.add': 'New Branch',
  'iceworks.project.panel.git.button.switch': 'Checkout Branch',
  'iceworks.project.panel.git.button.pull': 'Pull',
  'iceworks.project.panel.git.button.push': 'Push',
  'iceworks.project.panel.git.button.edit': 'Edit Repository',
  'iceworks.project.panel.git.button.refresh': 'Refresh',
  'iceworks.project.panel.git.addRemote': 'Add Remote',
  'iceworks.project.panel.git.remote.url.label': 'Repository: ',
  'iceworks.project.panel.git.edit.title': 'Edit Repository',
  'iceworks.project.panel.git.createBranch.title': 'New Branch',
  'iceworks.project.panel.git.createBranch.branch.label': 'Name: ',
  'iceworks.project.panel.git.main.status.conflicted': 'conflicted',
  'iceworks.project.panel.git.main.status.not_added': 'not added',
  'iceworks.project.panel.git.main.status.modified': 'modified',
  'iceworks.project.panel.git.main.status.created': 'created',
  'iceworks.project.panel.git.main.status.deleted': 'deleted',
  'iceworks.project.panel.git.main.status.renamed': 'renamed',
  'iceworks.project.panel.git.main.submit.file': 'Select files',
  'iceworks.project.panel.git.main.submit.message': 'Input Message',
  'iceworks.project.panel.git.main.tip.unstageFiles': 'Unstaged Files',
  'iceworks.project.panel.git.main.tip.refresh': 'Change information will not be refreshed in real-time. Please update the status through the button in the upper right corner before submitting it.',
  'iceworks.project.panel.git.main.tip.nodata': 'No file changes',
  'iceworks.project.panel.git.switch.title': 'Checkout Branch',
  'iceworks.project.panel.git.switch.select': 'Select Branch',
  'iceworks.project.panel.git.switch.input': 'Input Local Branch',

  // project oss
  'iceworks.project.panel.oss.title': 'OSS',
  'iceworks.project.panel.oss.button.clear': 'Clean',
  'iceworks.project.panel.oss.region.label': 'Region',
  'iceworks.project.panel.oss.bucket.label': 'Bucket',
  'iceworks.project.panel.oss.directory.label': 'Directory',
  'iceworks.project.panel.oss.directory.tip': 'Storage path (the default path is the root directory if leave it empty)',
  'iceworks.project.panel.oss.button.upload': 'Upload',

  // project menu
  'iceworks.project.panel.menu.ordinary': 'menu',
  'iceworks.project.panel.menu.group': 'menu group',
  'iceworks.project.panel.menu.external': 'external',
  'iceworks.project.panel.menu.create.title': 'Create Menu',
  'iceworks.project.panel.menu.delete.title': 'Delete Menu',
  'iceworks.project.panel.menu.delete.content': 'Are you sure delete menu \'{name}\'?',
  'iceworks.project.panel.menu.delete.subcontent': 'Note: There are sub-menus exist in the menu group, please be careful to delete!!!',
  'iceworks.project.panel.menu.delete.warn': 'Note: Delete menu will not delete the related routing configuration, please delete it manually',
  'iceworks.project.panel.menu.edit.title': 'Edit Menu',
  'iceworks.project.panel.menu.form.type': 'type',
  'iceworks.project.panel.menu.form.type.placeholder': 'please select a type',
  'iceworks.project.panel.menu.form.name': 'name',
  'iceworks.project.panel.menu.form.name.placeholder': 'please enter a name',
  'iceworks.project.panel.menu.form.icon': 'icon',
  'iceworks.project.panel.menu.form.icon.placeholder': 'please enter an icon',
  'iceworks.project.panel.menu.form.icon.message': 'please enter a valid icon name.',
  'iceworks.project.panel.menu.form.icon.tip.first': 'You can pick up the Menu item icon from',
  'iceworks.project.panel.menu.form.icon.tip.end': '',
  'iceworks.project.panel.menu.form.path': 'path',
  'iceworks.project.panel.menu.form.path.placeholder': 'please enter a path',
  'iceworks.project.panel.menu.form.path.help': 'To modify the path, you need to modify the related path manually in the routing configuration',
  'iceworks.project.panel.menu.form.path.message': 'please enter a correct path',
  'iceworks.project.panel.menu.tab.asideMenu': 'Aside Menu',
  'iceworks.project.panel.menu.tab.headerMenu': 'Header Menu',
  'iceworks.project.panel.menu.form.newwindow': 'open a new window',
  'iceworks.project.panel.menu.form.newwindow.tip': 'click the link to open a new page',
  'iceworks.project.panel.menu.button.refresh': 'refresh',
  'iceworks.project.panel.menu.button.add': 'Create Menu',
  'iceworks.project.panel.menu.form.type.tip': 'There are three types of Menu, includes menu groups, ordinary menus and external link, only ordinary menus and external link can be put into menu groups',
  'iceworks.project.panel.menu.form.name.tip': 'Navigation name will show on the page',
  'iceworks.project.panel.menu.form.path.tip': 'Navigation path is used to  jump to one page',
  'iceworks.project.panel.menu.aside.none': 'No aside menu yet',
  'iceworks.project.panel.menu.aside.prompt.create': 'Click on the top right to create a new aside menu',
  'iceworks.project.panel.menu.header.none': 'No header menu yet',
  'iceworks.project.panel.menu.header.prompt.create': 'Click on the top right to create a new header menu',

  // project router
  'iceworks.project.panel.router.title.path': 'path',
  'iceworks.project.panel.router.title.component': 'component',
  'iceworks.project.panel.router.title.operate': 'operate',
  'iceworks.project.panel.router.title.redirect': 'redirect',
  'iceworks.project.panel.router.create.title': 'Create Router',
  'iceworks.project.panel.router.delete.title': 'Delete Router',
  'iceworks.project.panel.router.delete.content': 'Are you sure to delete router \'{name}\'?',
  'iceworks.project.panel.router.delete.warn': 'Note: Deleting routing will not delete the related navigation, please delete it manually',
  'iceworks.project.panel.router.edit.title': 'Edit Router',
  'iceworks.project.panel.router.form.path': 'path',
  'iceworks.project.panel.router.form.path.tip': 'The path needs to start with /',
  'iceworks.project.panel.router.form.path.help': 'To modify the path, you need to manually go to the navigation configuration to modify the related path.',
  'iceworks.project.panel.router.form.path.placeholder': 'please enter a path',
  'iceworks.project.panel.router.form.component': 'component',
  'iceworks.project.panel.router.form.component.none': 'none',
  'iceworks.project.panel.router.form.component.placeholder': 'please select components',
  'iceworks.project.panel.router.form.component.tip': 'If the routing group is selected above, the list here is the layouts component, the routing group is not selected, and the list here is the components component',
  'iceworks.project.panel.router.form.exact': 'exact',
  'iceworks.project.panel.router.form.exact.tip': 'If the exact matching is selected and set \'/one\', people will not access this page if they type \'/one/two\', please check out related documents',
  'iceworks.project.panel.router.form.exact.link': 'link',
  'iceworks.project.panel.router.form.layout': 'layout',
  'iceworks.project.panel.router.form.routerType': 'router group',
  'iceworks.project.panel.router.form.routerType.tip': 'Enable this, the component needs to select a layout. Subrouting can be created under the group, and subrouting can not be created under the non-group',
  'iceworks.project.panel.router.button.refresh': 'refresh',
  'iceworks.project.panel.router.button.add': 'add router',
  'iceworks.project.panel.router.form.path.required': 'path is required',
  'iceworks.project.panel.router.form.path.valid': 'The path must begin with \'/\'',
  'iceworks.project.panel.router.form.path.hasExist': 'path already exists',
  'iceworks.project.panel.router.form.redirect': 'redirect',
  'iceworks.project.panel.router.form.redirect.tip': 'When accessing this path, will be redirected to this redirect path if you set a redirect path',
  'iceworks.project.panel.router.form.redirect.placeholder': 'please enter a redirect path',
  'iceworks.project.panel.router.none': 'No router yet',
  'iceworks.project.panel.router.prompt.create': 'Click on the top right to create a new route',
  'iceworks.project.panel.router.form.no.path.and.component': 'You need to select some components if you do not set a path',
  'iceworks.project.panel.router.form.redirect.and.no.path': 'The original path is required if you set a redirect path',
  'iceworks.project.panel.router.form.redirect.and.component': 'The selected components will have no effects if you set a redirect path',

  // task
  'iceworks.task.title': 'Engineering',
  'iceworks.task.dev.title': 'dev',
  'iceworks.task.dev.desc': 'Compiles and hot-reloads for development',
  'iceworks.task.dev.start.msg': 'Running Server',
  'iceworks.task.dev.stop.msg': 'Stop Server',
  'iceworks.task.start': 'Run Task',
  'iceworks.task.stop': 'Stop Task',
  'iceworks.task.setting': 'Setting',
  'iceworks.task.build.title': 'build',
  'iceworks.task.build.desc': 'Compiles and minifies for production',
  'iceworks.task.build.start.msg': 'Run the build project service',
  'iceworks.task.build.stop.msg': 'Build project completed',
  'iceworks.task.lint.title': 'lint',
  'iceworks.task.lint.desc': 'Lint and fix files',
  'iceworks.task.lint.start.msg': 'Run lint',
  'iceworks.task.lint.stop.msg': 'Lint check completed',

  // material
  'iceworks.material.title': 'Material',
  'iceworks.material.scaffold': 'Scaffold',
  'iceworks.material.block': 'Block',
  'iceworks.material.component': 'Component',
  'iceworks.material.add': 'Add',
  'iceworks.material.preview': 'Preview',
  'iceworks.material.source': 'Source code',
  'iceworks.material.download': 'Download',
  'iceworks.material.doc': 'Docs',
  'iceworks.material.install': 'Install',
  'iceworks.material.install.component.title': 'Install Component',
  'iceworks.material.install.component.pacakgeName': 'Component Name: ',
  'iceworks.material.install.component.packageVersion': 'Component Version: ',
  'iceworks.material.noDesc': 'No Description',
  'iceworks.material.sourceUrl': 'Source URL',
  'iceworks.material.noData': 'No Data',
  'iceworks.material.customMaterial': 'Custom Material',
  'iceworks.material.officialMaterial': 'Recommended materials',
  'iceworks.material.name': 'Material name',
  'iceworks.material.delete': 'Delete material',
  'iceworks.material.deleteConfirm': 'Are you sure to delete the material?',
  'iceworks.material.sourceUrlTips': 'Material source URL is the URL of the materials data. It can be a API or a URL of a JSON file. It should be unique.',
  'iceworks.material.nameTips': 'You can customize material name',
  "iceworks.material.refresh": "Refresh materials",

  // global bar
  'iceworks.global.bar.project': 'Project Name',
  'iceworks.global.bar.log': 'Log',
  'iceworks.global.bar.folder': 'Folder',
  'iceworks.global.bar.editor': 'Editor',
  'iceworks.global.bar.feedback': 'Feedback',
  'iceworks.global.bar.feedback.title': 'Experience feedback',
  'iceworks.global.bar.feedback.join': 'Join DingTalk community',
  'iceworks.global.bar.feedback.submit': 'Feedback or Bug report',
  'iceworks.global.bar.theme.dark': 'Dark',
  'iceworks.global.bar.theme.light': 'Light',

  'iceworks.project.panel.title': 'Panel settings',
  'iceworks.engineer.config.title': 'Configuration',
};
