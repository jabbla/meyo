module.exports = {
    name: 'globalHeader',
    config: {
        type: 'element',
        tagName: 'header',
        attributes: [
            {
                name: 'class',
                value: 'page-head'
            }
        ]
    },
    children: [
        {
            name: 'logo',
            config: {
                type: 'element',
                tagName: 'a',
                attributes: [
                    {
                        name: 'href',
                        value: '/pageManagement'
                    }
                ]
            },
            children: [
                {
                    name: 'logoImage',
                    config: {
                        type: 'element',
                        tagName: 'img',
                        attributes: [
                            {
                                name: 'class',
                                value: 'page-head_logo'
                            }
                        ]
                    }
                }
            ]
        },
        {
            name: 'profile',
            config: {
                type: 'element',
                tagName: 'div',
                attributes: [
                    {
                        name: 'class',
                        value: 'page-head__profile'
                    }
                ]
            },
            children: [
                {
                    name: 'helpLink',
                    config: {
                        type: 'element',
                        tagName: 'a',
                        attributes: [
                            {
                                name: 'target',
                                value: '_blank'
                            },
                            {
                                name: 'href',
                                value: 'www.baidu.com'
                            }
                        ]
                    },
                    children: [
                        {
                            name: 'helpText',
                            config: {
                                type: 'text',
                                text: '帮助文档'
                            }
                        }
                    ]

                },
                {
                    name: 'userName',
                    config: {
                        type: 'element',
                        tagName: 'span',
                        attributes: [
                            {
                                name: 'class',
                                value: 'page-head__username'
                            }
                        ]
                    },
                    children: [
                        {
                            name: 'userNameText',
                            config: {
                                type: 'text',
                                text: '${user.username!""}'
                            }
                        }
                    ]
                },
                {
                    name: 'logoutLink',
                    config: {
                        type: 'element',
                        tagName: 'a',
                        attributes: [
                            {
                                name: 'href',
                                value: '/logout'
                            },
                            {
                                name: 'class',
                                value: 'page-head__exit'
                            }
                        ]
                    },
                    children: [
                        {
                            name: 'logoutText',
                            config: {
                                type: 'text',
                                text: '退出'
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'pageTitle',
            config: {
                type: 'element',
                tagName: 'a',
                attributes: [
                    {
                        name: 'class',
                        value: 'page-head__title'
                    },
                    {
                        name: 'href',
                        value: ''
                    }
                ]
            },
            children: [
                {
                    name: 'titleText',
                    config: {
                        type: 'text',
                        text: '考拉埋点系统'
                    }
                }
            ]
        },
        {
            name: 'systemSelector',
            config: {
                type: 'element',
                tagName: 'div',
                attributes: [
                    {
                        name: 'id',
                        value: 'page-system-selector'
                    }
                ]
            }
        }
    ]
};