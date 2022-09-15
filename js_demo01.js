
//当鼠标悬浮时，显示背景颜色
function showBGColor()
{
    //event:当前发生的事件
    //event.srcElement:事件源
    // alert(event.srcElement);
    // alert(event.srcElement.tagName);
    if (event && event.srcElement && event.srcElement.tagName=="TD")
    {
        var td=event.srcElement;
        var tr=td.parentElement;//获取td的父元素tr
        tr.style.backgroundColor="navy";//设置样式，使用.style

        var tds=tr.cells;//tr.cells：获取tr中所有单元格
        for (var i=0;i<tds.length;i++)
        {
            tds[i].style.color="white";
        }
    }
}
//当鼠标离开时，恢复原有样式
function clearBGColor()
{
    if (event && event.srcElement && event.srcElement.tagName=="TD")
    {
        var td=event.srcElement;
        var tr=td.parentElement;//获取td的父元素tr
        tr.style.backgroundColor="transparent";
        var tds=tr.cells;//tr.cells：获取tr中所有单元格
        for (var i=0;i<tds.length;i++)
        {
            tds[i].style.color="black";
        }
    }
}
//当鼠标悬浮在单价时，显示手势
function showHand()
{
    if (event && event.srcElement && event.srcElement.tagName=="TD")
    {
        var td=event.srcElement;
        //
        td.style.cursor="hand";
    }
}