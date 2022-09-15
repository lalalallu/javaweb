
window.onload=function ()
{
    // alert("hello world!");
    updateZj();

    //当页面加载完成，绑定事件
    var fruitTbl =document.getElementById("tbl_fruit");
    var rows=fruitTbl.rows;//获取表格中所有行
    for (var i=0;i<rows.length-1;i++)
    {
        var tr=rows[i];
        trBindEvent(tr);
    }
    document.getElementById("addBtn").onclick=addFruit;
}

function trBindEvent(tr)
{
    tr.onmouseover=showBGColor;//绑定当鼠标悬浮时，显示背景颜色事件
    tr.onmouseout=clearBGColor;//绑定当鼠标离开时，恢复原有样式事件

    var cells =tr.cells;//tr.cells：获取tr中所有单元格
    var priceID=cells[1];//取得单价
    priceID.onmouseover=showHand;
    priceID.onclick=editPrice;

    var img =cells[4].firstChild;
    if (img && img.tagName=="IMG")
    {
        //绑定图标删除事件
        img.onclick = delFruit;
    }
}

function addFruit()
{
    var fname=document.getElementById("fname").value;
    var price=parseInt(document.getElementById("price").value);
    var fcount=parseInt(document.getElementById("fcount").value);
    var xj=price*fcount;

    var fruitTbl =document.getElementById("tbl_fruit");
    var tr =fruitTbl.insertRow(fruitTbl.rows.length-1);

    var fnameTD= tr.insertCell();
    fnameTD.innerText=fname;

    var priceTD= tr.insertCell();
    priceTD.innerText=price;

    var fcountTD= tr.insertCell();
    fcountTD.innerText=fcount;

    var xjTD= tr.insertCell();
    xjTD.innerText=xj;

    var imgTD= tr.insertCell();
    imgTD.innerHTML="<img src=\"imgs/R-C.png\" width=\"30\" height=\"30\"/>";

    updateZj();
    trBindEvent(tr);
}

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

function editPrice()
{
    if (event && event.srcElement && event.srcElement.tagName=="TD")
    {
        var priceTD = event.srcElement;

        if (priceTD.firstChild && priceTD.firstChild.nodeType==3)//判断节点是否为文本节点
        {
            //innerText 表示设置或获取当前节点的内部文本
            var oldPrice = priceTD.innerText;
            //innerHTML 表示设置当前节点的内部HTML代码
            priceTD.innerHTML="<input type='text' size='5'/>";

            var input = priceTD.firstChild;
            if (input.tagName=="INPUT")
            {
                input.value = oldPrice;
                input.select();//选中

                input.onblur=updatePrice;//绑定失去焦点事件，失去焦点更新单价

                //保证用户输入的时数字
                input.onkeydown = ckInput;
            }
        }

    }
}



function updatePrice()
{
    if (event && event.srcElement && event.srcElement.tagName=="INPUT")
    {
        var input = event.srcElement;
        var newPrice = input.value;
        var pricrTD = input.parentElement;//父节点
        pricrTD.innerText=newPrice;

        updateXJ(pricrTD.parentElement);//更新当前行的小计
    }
}

function updateXJ(tr)
{
    if (tr &&　tr.tagName=="TR")
    {
        var tds = tr.cells;
        var price = tds[1].innerText;
        var count = tds[2].innerText;
        var xj =parseInt(price)* parseInt(count);
        tds[3].innerText=xj;

        //更新总计
        updateZj();
    }
}
function updateZj()
{
    var fruitTbl = document.getElementById("tbl_fruit");
    var rows = fruitTbl.rows;
    var sum=0;
    for (var i=1;i<rows.length-1;i++)
    {
        var tr =rows[i];
        var tds=tr.cells;
        sum+=parseInt(tds[3].innerText);   //NaN  not a number不是一个数字
    }
    rows[rows.length-1].cells[1].innerText = sum;
}

function delFruit()
{
    if (event && event.srcElement && event.srcElement.tagName==="IMG")
    {
        if (window.confirm("是否删除?"))//confirm弹出对话框。有确定true和取消false按钮
        {
            var img =event.srcElement;
            var tr =img.parentElement.parentElement;
            var fruitTbl =document.getElementById("tbl_fruit");
            fruitTbl.deleteRow(tr.rowIndex);

            updateTabs();
        }

    }
}

function ckInput()
{
    var kc = event.keyCode;
    //0-9 :48-57
    //backspace:8
    //enter:13
    //console.log(kc);//输出到控制台

    if (!((kc>=48 && kc<=57)||kc==8||kc==13))
    {
        event.returnValue=false;
    }
    if(kc==13)
    {
        event.srcElement.blur();//blur失去焦点
    }
}