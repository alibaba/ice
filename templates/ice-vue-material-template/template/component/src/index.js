import ExampleComponent from './example-component';

const components = [
    ExampleComponent,
];

const install = function (Vue) {
    if (install.installed) return;
    install.installed = true;
    components.map(component => Vue.component(component.name, component));
};

// 检测到 Vue 才执行, 判断是否是直接引入文件
if (typeof window !== undefined && window.Vue) {
    install(window.Vue);
}

export default {
    install,      // 供组件全量引入的install方法
    ...components // 每个组件内部都有install方法， 供按需引入使用
};
