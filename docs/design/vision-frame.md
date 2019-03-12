---
title: 视觉-框架
category: 设计体系
order: 4
---

页面的框架结构是在布局栅格系统下更贴近于需求的一个设计环节，需要结合具体的业务场景和用户主要的操作行为。并且考虑到平台系统的后续的迭代，设定的框架需要一定程度的「延展性」以便适应业务的发展。

结合商家赋能设计体系的三大原则「舒适、有效、无缝」，设计定位清晰、路径最优并且可扩展的框架结构可以从以下几个方面着手：

1. 平台维度定位
2. 拟定框架
3. 场景化适配
4. 嵌套方案
5. 可扩展设定

## 平台维度定位

设计需要兼容商业（业务需求）和用户（可用性）基于我们归纳了两个核心的考量维度，分别是：一，平台承载的业务单一还是多样性；二，平台任务侧重浏览性强还是操作性强。按这两重的维度，划分出四个象限：

![Group 2.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/9277/1550111945748-9796366c-8c0d-42ef-86c4-46c795599538.png#align=left&display=inline&height=314&name=Group%202.png&originHeight=1090&originWidth=2588&size=135118&width=746)

归纳出四种平台在分别适用于各象限，分别是，极简平铺型、平铺扩展型、信息聚焦型、一统全局型。依据平台的业务和使用的定位，圈定一种适合的类型。

## 拟定框架

框架包含的范围不仅仅包括导航，还包括结合不同平台定位在页面区域的布局指导，方便参考的时候更全局去考虑用户在多个页面之间清晰的定位和跳转。

#### 极简平铺型

内容最大化平铺，通过面包屑定位和跳转，层级简单。适合单个业务场景，设置操作繁琐类型的平台<br />解法：顶部导航+内容平铺

![Group 3@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115518057-d77fdc5e-ff10-49a0-b9ab-dd40aff2f4a3.jpeg#align=left&display=inline&height=323&name=Group%203%402x.jpg&originHeight=1224&originWidth=2828&size=196194&width=746)

内容平铺是指原本需要跳转去下一个层级查看的内容，以模块化的形式整合在平台的首页，更方便信息查看，适合内容不多的平台业务。极简平铺型的顶部导航可增加类目入口这部分内容会在「可扩展设定」中进行详细描述。

#### 信息聚焦型

侧边导航平铺各相关业务入口，类目的核心信息可以通过首页模块透出，模块也做为类目的入口方便用户识别。这类的框架适合多场景的业务，或者是多个业务融合的平台。由于页面整个右侧都是内容展示区，操作浏览可以更加聚焦。<br />解法：侧边导航+Dashboard+类目入口

![Group 4@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115548234-856a2b06-57f3-47b5-9a67-2a64b975df65.jpeg#align=left&display=inline&height=329&name=Group%204%402x.jpg&originHeight=1260&originWidth=2860&size=227041&width=746)

侧边导航类目建议在 2-7 个以内，标题长 2-6 个中文字符（英文字符4-15 个）较为适宜。

#### 一统全局型

适合不同大领域下的类似平台整合型的大型中台系统，需要有大的领域的切换，各领域下的类目入口又不具相似性，作为统一的中台部分信息还需要统一展示。

解法：L型导航+Dashboard+类目入口

![Group 5@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115401124-f2c87c36-4abf-4f2c-a439-170d20a33a5d.jpeg#align=left&display=inline&height=304&name=Group%205%402x.jpg&originHeight=1150&originWidth=2824&size=179820&width=746)

顶部横向导航进行全局性设置，左侧导航为业务入口，页面部分的内容布局可以参考前两种框架形式。

三种框架是提炼了各中台业务后归纳而成的对于基于平台定位和目标的一种解法，并非限制，设计的时候还需要结合本身业务的特性，以及考虑下面说到的几个点产出更适合需求的设计框架。

## 场景化适配

框架中的导航承载的功能不仅仅是静态的，而需要结合变化的场景做适宜的变化，让用户更好聚焦信息和操作

#### 导航固定与消失

根据顶部导航承载不同的功能，滑动页面时考虑导航的能否更好的匹配浏览行为

![Group 6@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115581628-0ea1e373-0af3-4e3b-9d3e-9d4f9a9eae6d.jpeg#align=left&display=inline&height=344&name=Group%206%402x.jpg&originHeight=1162&originWidth=2522&size=217809&width=746)

也可以针对实际功能对滑动浏览时导航做降低高度或透明度的调整。

#### 导航折叠收起

侧边导航由于占据一定的页面宽度，在操作时候可以利用收起的方式，扩大右侧的可视空间。导航折叠的设计原类目标题需要有图标，以及平台的logo需要考虑缩小以后的展示效果。

![Group 7@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115613658-53a50a13-ff0c-4d0b-b981-3ebfd02620f6.jpeg#align=left&display=inline&height=288&name=Group%207%402x.jpg&originHeight=1088&originWidth=2822&size=121266&width=746)

#### 嵌套方案

作为平台系统对接其他业务场景很常见，业务上需要介入，体验上更需要做到「无缝」的对接，然后体验更加一致。

![Group 8@2x.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/9277/1550114345721-cc08c5f3-10e8-4194-a98d-7177db419f90.png#align=left&display=inline&height=305&name=Group%208%402x.png&originHeight=1152&originWidth=2822&size=106841&width=746)

嵌套的iframe区域也需要严格按照平台制定的视觉规范，并沿用统一的组件实现，才能做到体验上的「无缝」

## 可扩展设定

在第二部分拟定框架中提到三种框架，可以对导航进行扩展，方便业务扩展

#### 极简平铺-扩展

解法：顶部导航增加类目入口+Dashboard+类目入口

![Group 8@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115738186-2422a5a1-fb5a-4cf7-b39a-76e640dd4792.jpeg#align=left&display=inline&height=305&name=Group%208%402x.jpg&originHeight=1152&originWidth=2822&size=191261&width=746)

#### 信息聚焦型-扩展

解法：侧边导航增加二级类目入口

![Group 9@2x.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2019/jpeg/9277/1550115763706-de35c38f-e7b9-41e2-9464-50a786f0cc5f.jpeg#align=left&display=inline&height=303&name=Group%209%402x.jpg&originHeight=1150&originWidth=2828&size=197213&width=746)
