<@compress>
<#escape x as x?html>
<!DOCTYPE html>
<html>
<head>

    <#include "../../common/macro.ftl">
    
    <title>##{{pageNameText}}##</title>
    <meta charset="utf-8"/>
    <meta name="description" content="##{{pageName}}##"/>
    <meta name="keywords" content="##{{pageName}}##"/>
    <@css/>
</head>
<body>
    <@data />
    <@header />
    <div id="app"></div>
</body>
</html>
</#escape>
</@compress>