module.exports = {
    name: 'contentWraper',
    config: {
        type: 'element',
        tagName: 'div',
        pageRootComponentEl: true,
        attributes: [
            {
                name: 'id',
                value: 'app'
            }
        ]
    },
    children: [
        {
            name: 'filterArea',
            config: {
                type: 'component',
                componentName: 'filters',
                attributes: [
                    {
                        name: 'ref',
                        value: 'filter'
                    },
                    {
                        name: 'store',
                        value: '{store}'
                    }
                ]
            }
        },
        {
            name: 'metaArea',
            config: {
                type: 'component',
                componentName: 'kl-card',
                library: 'nek-ui',
                slots: [
                    {
                        name: 'newEventBtn',
                        config: {
                            type: 'component',
                            componentName: 'kl-button',
                            library: 'nek-ui',
                            attributes: [
                                {
                                    name: 'title',
                                    value: '新建事件'
                                }
                            ]
                        }
                    },
                    {
                        name: 'packBtn',
                        config: {
                            type: 'component',
                            componentName: 'kl-button',
                            library: 'nek-ui',
                            attributes: [
                                {
                                    name: 'title',
                                    value: '打包任务'
                                }
                            ]
                        }
                    },
                    {
                        name: 'exportBtn',
                        config: {
                            type: 'component',
                            componentName: 'kl-button',
                            library: 'nek-ui',
                            attributes: [
                                {
                                    name: 'title',
                                    value: '导出'
                                }
                            ]
                        }
                    }
                ] 
            }
        },
        {
            name: 'tableArea',
            config: {
                type: 'component',
                componentName: 'kl-card',
                attributes: [
                    {
                        name: 'class',
                        value: 'm-table-card'
                    }
                ],
                slots: [
                    {
                        name: 'eventTable',
                        config: {
                            type: 'component',
                            componentName: 'kl-table',
                            library: 'nek-ui'
                        }
                    }
                ]
            }
        }
    ]
};