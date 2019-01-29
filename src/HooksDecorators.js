function hookCallLog(hookMap){
    for(let hookName in hookMap){
        let hook = hookMap[hookName];
        hook.intercept({
            call(){
                console.log(`${hookName} called`);
            }
        });
    }
}

module.exports = {
    hookCallLog
};