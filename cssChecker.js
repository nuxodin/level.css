
Array.from(document.styleSheets).forEach(checkStyleSheet);


function checkStyleSheet(ss){
    try {
        checkRules(ss.cssRules)
    } catch(e) {
        console.warn('can not check '+ss.href, e)
    }
}
function checkRules(rules){
    Array.from(rules).forEach(checkRule);
}
function checkRule(rule){
    if (rule.type === CSSMediaRule.MEDIA_RULE) {
        checkRules(rule.cssRules);
        return;
    }

    if (rule.selectorText.match(/:visited/)) {
        let allowed = {'color':1,
        'background-color':1,
        'border-color':1,
        'border-bottom-color':1,
        'border-left-color':1,
        'border-right-color':1,
        'border-top-color':1,
        'outline-color':1,
        'column-rule-color':1,
        'fill und stroke':1,};
        for (let style of rule.style) {
            if (!allowed[style]) {
                console.error(style+' has no effect in :visited');
            }
        }
    }
    checkStyle(rule.style);
}
function checkStyle(style) {
    for (let prop of style) {
        let value = style.getPropertyValue(prop)
        if (prop === 'line-height') {
            console.log(prop, value)
            if (!value.match(/^([0-9.]+|inherit)$/)) {
                console.error('line-height should have no unit');
            }
        }
    }
}










/* find browser bugs */
const els = document.querySelectorAll(':visited')
if (els.length) console.error('there are elements found with :visited!')
