# meyo API

## meyo()
接收option和config生成对应的文件
```js
meyo(options, config)
```

### options

**options.proto**

可为javascript对象，也可为json文件路径字符串（绝对路径）,
一个proto可以以三种方式被创建：``element``，``component``,``module``，``page``;

```js
proto = {
    name: 'logmark',    //proto名称
    config: {
        type: 'page',   //proto应用的类型
        pageName: 'logmarkPage' //页面名称
    },
    atttributes: [],        //proto自身属性
    children: [             //子节点容器
        {
            name: 'A',
            config: {
                type: 'element',
                tagName: 'p'
            },
            attributes: [],
            children: []
        },
        //实例化一个组件的时候只能指定slot
        {
            name: 'B',
            config: {
                type: 'component',
                componentId: 1,
                props: [
                    {key: '', value: ''}
                ],
                slots: []
            },
            attributes: []
        },
        {
            name: 'C',
            config: {
                type: 'module',
                moduleId: 1,
                fields: [
                    {key: 'a', value: 'ssss'}
                ]
            },
            attributes: []
        }
    ]
};
```

proto是用来描述页面组成的结构，结构和结构可以被复用，如前端框架中的组件概念，就是类型为``component``的节点，出现在proto中的节点均应是被实例化过后的，实例化一个``component``，需要标识的因素：1. 可复用组件的唯一标识 2. 外部传入状态 3. slots形式的节点

所以为``component``节点类型添加``props``和``componentId``
```js
{
    type: 'component',
    componentId: 1,     //可复用组件唯一标识
    props: [            //传入的外部状态
        {
            key: '',
            value: ''
        }
    ],
    slots: []
}
```

对应组件池也应被声明，所以增加组件库的配置项

**option.components**

```js
components = [
    {
        id: 1,
        name: 'modal',  //可复用组件名称，为辨识组件带来便利
        attributes: [],
        children: [],   //子节点信息
    }
];
```

**option.modules**
```js
modules = [
    {
        id: 1,
        name: 'headerModule',
        children: [],   //子节点信息
    }
];
```

### config

**config.plugins**

```js
var config = {
    plugins: []
};
```