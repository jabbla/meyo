const { meyo, pageEntryPlugin } = require('../src/index.js');
const pageHeader = require('./header');
const path = require('path');
const pageContentWraper = require('./contentWraper');
const options = {
    proto: {
        name: 'logmarkEventPage',
        config: {
            type: 'page',
            pageName: 'eventManagement',
            pageNameText: '事件管理'
        },
        attributes: [],
        children: [
            pageHeader,
            pageContentWraper
        ]
    }
};
meyo(options, {
    plugins: [pageEntryPlugin({
        input: {
            ftlTemplatePath: path.resolve(__dirname, './pageFtl.ftl'),
            entryJsTemplatePath: path.resolve(__dirname, './pageEntryJs.js'),
            pageConfigTemplatePath: path.resolve(__dirname, './pageConfig.js')
        },
        output: {
            pageRoot: path.resolve(__dirname, './pages/##{{pageName}}##'),
            ftlPath: path.resolve(__dirname, './pages/##{{pageName}}##/index.ftl'),
            entryJsPath: path.resolve(__dirname, './pages/##{{pageName}}##/index.js'),
            pageConfigPath: path.resolve(__dirname, './pages/##{{pageName}}##/config.js'),
            component: {
                templatePath: path.resolve(__dirname, './pages/##{{pageName}}##/##{{componentName}}##.html'),
                jsPath: path.resolve(__dirname, './pages/##{{pageName}}##/##{{componentName}}##.js'),
                stylePath: path.resolve(__dirname, './pages/##{{pageName}}##/##{{componentName}}##.mcss')
            }
        }
    })]
});