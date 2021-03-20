import './../cssChecker.js';

let html = `
<form id=testTools style="position:fixed; top:10px; right:10px; background:#fff; box-shadow:0 0 10px; font-size:15px; line-height:1.2; font-family:arial">
    <table>
        <tr>
            <td>Hue:
            <td><input type=range name=h min=0 max=360>
        <tr>
            <td>Saturation:
            <td><input type=range name=s>
        <tr>
            <td>Lightness:
            <td><input type=range name=l>
    </table>
    <div class=Table id=tStyleSheets>
    </div>
</form>

<style>
#testTools table,
.Table {
    width:100%;
    display:table;
    border-collapse: collapse;
}
.Table > * {
    display:table-row;
}
.Table > * > * {
    display:table-cell;
}
#testTools td,
.Table > * > * {
    padding:.4em .8em;
    border-bottom:1px solid #eee;
}
#testTools input:not([type=checkbox], [type=radio]) {
    width:120px;
    padding:0;
}
</style>
`;

document.body.insertAdjacentHTML('beforeend',html);

testTools.addEventListener('input', function(e){
    const els = this.elements;
    document.documentElement.style.setProperty('--hsl-h', els.h.value )
    document.documentElement.style.setProperty('--hsl-s', els.s.value + '%')
    document.documentElement.style.setProperty('--hsl-l', els.l.value + '%')
})
testTools.contentEditable = false;

document.querySelectorAll('link[rel=stylesheet]').forEach(link=>{
    const name = link.href.replace(/.*\/([^/]+)/,'$1');
    const label = document.createElement('label');
    label.innerHTML = '<span><input type=checkbox></span><span>'+name+'</span>';
    const input = label.querySelector('input')
    input.checked = !link.disabled;
    tStyleSheets.append(label);
    label.addEventListener('change',function(){
        link.disabled = !input.checked;
    })
})
