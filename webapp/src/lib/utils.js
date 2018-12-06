export function parseStyleText(cssText) {
    
    return !cssText? {} : JSON.parse(cssText);
};