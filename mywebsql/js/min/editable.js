/*
    http://mywebsql.net/license
*/
var curEditField=null,fieldInfo=null,selectedRow=null,alterTable=!1,editOptions={sortable:!1,highlight:!1,selectable:!0,editEvent:"click",editFunc:editTableCell},checkBoxCode='<span class="check">'+__("Yes")+"</span>",deletedFields=[],dataTypes={bigint:[1,1,0],binary:[0,1,0],bit:[0,0,0],blob:[0,1,0],bool:[0,0,0],"boolean":[0,0,0],"char":[0,1,0],date:[0,0,0],datetime:[0,0,0],decimal:[1,1,0],"double":[1,1,0],"enum":[0,0,1],"float":[1,1,0],"int":[1,1,0],longblob:[0,0,0],longtext:[0,0,0],mediumblob:[0,
0,0],mediumint:[1,1,0],mediumtext:[0,0,0],numeric:[1,1,0],real:[1,1,0],set:[0,0,1],smallint:[1,1,0],text:[0,1,0],time:[0,0,0],timestamp:[0,0,0],tinyblob:[0,0,0],tinyint:[1,1,0],tinytext:[0,0,0],varbinary:[0,1,0],varchar:[0,1,0],year:[0,1,0]},fieldInfo=[{id:"fname",type:"char",list:[],desc:__("Field Name")},{id:"ftype",type:"list",list:dataTypes,desc:__("Field Datatype")},{id:"flen",type:"num",list:[],desc:__("Maximum Length of field value")},{id:"fval",type:"char",list:[],desc:__("Default value [Use quotes to specify string values]")},
{id:"fsign",type:"check",list:[],desc:__("Unsigned numbered field only")},{id:"fzero",type:"check",list:[],desc:__("Pad field values with leading zeros")},{id:"fpkey",type:"check",list:[],desc:__("Create Primary Index on this field")},{id:"fauto",type:"check",list:[],desc:__("Field value is Auto Incremented")},{id:"fnull",type:"check",list:[],desc:__("Disallow NULL values in Field")}];
function addField(a){for(i=0;i<a;i++){rows="<tr>";for(j=0;j<fieldInfo.length;j++)rows+='<td class="edit '+fieldInfo[j].type+' n"></td>';null!=selectedRow?$("#table_grid tbody tr.ui-state-active").after(rows):$("#table_grid tbody").append(rows)}}
function loadTable(){addField(rowInfo.length);for(i=0;i<rowInfo.length;i++)info=rowInfo[i],row=$("#table_grid tbody tr").eq(i+1),row.removeClass("n").addClass("o").data("oname",info.fname),row.find("td").each(function(a){id=fieldInfo[a].id;type=fieldInfo[a].type;text=info[id];"list"==type&&0<info.flist.length?($(this).data("listValues",info.flist),$(this).html("<span>"+text+"</span>"),appendListEditor($(this))):"check"==type?$(this).html("1"==text?checkBoxCode:""):$(this).text(text)});deletedFields=
[]}
function setupGrid(a,b){b.editEvent||(b.editEvent="dblclick");b.editFunc||(b.editFunc=editTableCell);b.sortable&&(sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/,table=document.getElementById(a),sorttable.makeSortable(table));$("#"+a+" tbody tr").live("mouseenter",function(){$(this).addClass("ui-state-hover")});$("#"+a+" tbody tr").live("mouseleave",function(){$(this).removeClass("ui-state-hover")});b.selectable&&$("#"+a+" tbody tr").live("click",function(){selectedRow!=null&&$(selectedRow).removeClass("ui-state-active");$(this).addClass("ui-state-active");
selectedRow=this});b.editable&&(editOptions=b,$("#"+a+" td.edit").live(b.editEvent,b.editFunc))}function editTableCell(){td=$(this);null!=curEditField&&closeEditor(!0);span=td.find("span:first");txt=span.length?span.text():td.text();tstyle="left";td.data("defText",txt).addClass("current");curEditField=this;index=td.index();fi=getField(index);w=td.width();h=td.height();td.attr("width",w);setMessage(fi.desc);input=createCellEditor(td,fi,txt,w,h,tstyle);setTimeout(function(){input.focus()},50)}
function closeEditor(a,b,c){if(!curEditField)return!1;txt="";obj=$(curEditField);b?"combo"==a?(txt=obj.find("select").val(),obj.html("<span>"+txt+"</span>")):"check"==a?(txt=obj.find("input").prop("checked")?checkBoxCode:"",obj.html(txt)):(txt=obj.find("input").val(),obj.text(txt)):txt=obj.data("defText");obj.removeClass("current");txt!=obj.data("defText")&&obj.parent().addClass("m");$(curEditField).removeAttr("width");curEditField=null;if(""!=txt&&"combo"==a&&1==obj.index()&&(typeInfo=dataTypes[txt],
fieldLengthTd=obj.parent().find("td").eq(2),fieldLength=fieldLengthTd.text(),0==typeInfo[1]&&""!=fieldLength?fieldLengthTd.data("fLength",fieldLength).text(""):1==typeInfo[1]&&(fieldLength=fieldLengthTd.data("fLength"),fieldLengthTd.text(fieldLength)),1==typeInfo[2]))if(appendListEditor(obj),c)return setTimeout(function(){editListOfValues(obj)},50),!1;return!0}
function checkEditField(a){combo=$(this).is("select");check="checkbox"==$(this).attr("type");tag=combo?"combo":check?"check":"input";keys=combo?[13,9]:[13,9,38,40];if(-1!=keys.indexOf(a.keyCode)){a.preventDefault();elem=!1;if(9==a.keyCode)elem=a.shiftKey?$(curEditField).prev(".edit"):$(curEditField).next(".edit"),elem.length||(tr=a.shiftKey?$(curEditField).parent().prev():$(curEditField).parent().next(),tr.length&&(elem=a.shiftKey?tr.find("td:last"):tr.find("td:first")));else if(38==a.keyCode||40==
a.keyCode)tr=38==a.keyCode?$(curEditField).parent().prev():$(curEditField).parent().next(),tr.length&&(elem=tr.find("td").eq($(curEditField).index()));(moveNext=closeEditor(tag,!0,!(9==a.keyCode&&a.shiftKey)))&&elem&&elem.length&&elem.trigger(editOptions.editEvent)}else if(!isCellEditable($(curEditField)))return setError($(this),__("This attribute is not required for selected field type")),a.preventDefault(),!1}
function createCellEditor(a,b,c,e,f,d){keyEvent="keydown";input=null;code='<form name="cell_editor_form" class="cell_editor_form" action="javascript:void(0);">';switch(b.type){case "list":code+='<select name="cell_editor" class="cell_combo" style="text-align:'+d+";width: "+e+'px;">';code+='<option value=""></option>';for(opt in b.list)sel=c==opt?' selected="selected"':"",opt=str_replace('"',"&quot;",opt),code+='<option value="'+opt+'"'+sel+">"+opt+"</option>";code+="</select>";break;case "check":code+=
'<input type="checkbox" name="cell_editor" class="cell_check" style="text-align:'+d+'"';""!=c&&(code+=' checked="checked" ');code+="/>";break;default:code+='<input type="text" name="cell_editor" class="cell_editor" style="text-align:'+d+";width: "+e+'px;" />'}code+="</form>";a.html(code);switch(b.type){case "list":input=a.find("select");input.bind(keyEvent,checkEditField).blur(function(){closeEditor("combo",!0)}).bind("click",function(a){a.stopPropagation()});break;case "check":input=a.find("input");
input.bind(keyEvent,checkEditField).blur(function(){closeEditor("check",!0)}).bind("click",function(a){a.stopPropagation()});break;default:input=a.find("input"),input.val(c).select().bind(keyEvent,checkEditField).blur(function(){closeEditor("text",!0)}).bind("click",function(a){a.stopPropagation()})}return input}function getField(a){return fieldInfo[a]}
function isCellEditable(a){col=a.index();if(2>col)return!0;row=a.parent();name=row.find("td").eq(0).text();td=row.find("td").eq(1);span=td.find("span:first");type=span.length?span.text():td.text();if(""==name||""==type||!dataTypes[type])return!1;typeInfo=dataTypes[type];return 2==col&&0==typeInfo[1]?!1:!0}
function deleteField(){3>$("#table_grid tbody tr").length?setError(null,__("Table information requires at least one valid field")):($(selectedRow).length&&($(selectedRow).hasClass("o")&&deletedFields.push($(selectedRow).data("oname")),$(selectedRow).remove(),setMessage("Field deleted")),selectedRow=null)}function editListOfValues(a){$("#dialog-list").data("attachField",a);$("#dialog-list").dialog("open")}
function validateTableInfo(){if(""==$("#table-name").val())return setError("#table-name",__("Table name is required")),!1;errors=0;errorFields=[];$("#table_grid tbody tr:gt(0)").each(function(){$(this).removeClass("x");$(this).children("td").each(function(){if(""!=$(this).text())return $(this).parent().addClass("x"),!1})});$("#table_grid tbody tr.x").each(function(){$(this).children("td").each(function(a){if((0==a||1==a)&&""==$(this).text())errorFields[errors++]=$(this).parent()})});numFields=$("#table_grid tbody tr.x").length;
errors?setError(errorFields,__("One or more field information is incomplete")):0==numFields?setError(null,__("Table information requires at least one valid field")):submitTableInfo(numFields)}
function submitTableInfo(){numFields=0;fields=[];$("#table_grid tbody tr.x").each(function(){row={};row.fstate=$(this).hasClass("o")?$(this).hasClass("m")?"change":"old":"new";row.oname=$(this).data("oname");$(this).children("td").each(function(a){id=fieldInfo[a].id;span=$(this).find("span:first");row[id]=span.length?span.text():$(this).text();"list"==fieldInfo[a].type&&span.length&&(row.flist=$(this).data("listValues"))});fields[numFields++]=row});json={name:$("#table-name").val()};json.props={engine:$("#enginetype").val(),
charset:$("#charset").val(),collation:$("#collation").val(),comment:$("#comment").val()};json.fields=fields;json.delfields=deletedFields;query=JSON.stringify(json);setMessage("Please wait...");page=alterTable?"altertbl":"createtbl";command=alterTable?"alter":"create";wrkfrmSubmit(page,command,"",query,responseHandler)}
function clearTableInfo(){optionsConfirm(__("Are you sure you want to clear all field information from table?"),"grid.clear",function(a,b,c){a&&(c&&optionsConfirmSave(b),$("#table_grid tbody td").html("").removeData("listValues"),$("#enginetype").val(""),$("#charset").val(""),$("#collation").val(""),$("#comment").val(""),setMessage("Field information cleared"))})}
function responseHandler(a){result=$(a).find("#result").text();message=$(a).find("#message").html();"1"==result?(setMessage(alterTable?__("Table successfully modified"):__("Table successfully created")),$("#tab-messages").html(message),$("#table_grid tbody tr.x").removeClass("x m n").addClass("o"),deletedFields=[],alterTable||parent.objectsRefresh()):(setMessage("Error"),$("#tab-messages").html(message));$("#grid-tabs").tabs("select",2);div=0<$("#tab-messages div.sql_text").length?$("#tab-messages div.sql_text"):
$("#tab-messages div.sql_error");div.length&&(code=div.html2txt(),obj_lines=$('<div class="sql_lines"></div>'),obj_out=$('<pre class="sql_output"></pre>'),div.html("").append(obj_lines).append(obj_out),parent.commandEditor.win.highlightSql($("#tab-messages pre.sql_output"),$("#tab-messages div.sql_lines"),code));$("#popup_overlay").addClass("ui-helper-hidden")}
function setupEditable(a){alterTable=a;$("#grid-tabs").tabs({select:function(a,c){btn=alterTable?"#btn_add, #btn_del":"#btn_add, #btn_del, #btn_clear";0==c.index?$(btn).show():$(btn).hide()}});$("#dialog-list").dialog({autoOpen:!1,width:240,height:240,modal:!0,draggable:!1,resizable:!1,open:loadDialogValues,buttons:{Add:addListValue,Delete:function(){$("#list-items option:selected").remove();setTimeout(function(){$("#list-items").focus()},10)},Done:saveDialogValues}});setupGrid("table_grid",{selectable:!0,
editable:!0,editEvent:"click",editFunc:editTableCell});a?($("#table-name").attr("disabled",!0),loadTable()):(addField(10),$("#table-name").bind("keydown",function(a){9==a.keyCode&&(a.preventDefault(),$("#table_grid").find("td").eq(0).trigger("click"))}),setTimeout(function(){$("#table-name").focus()},50));$("#dialog-list #item").keydown(function(a){a.keyCode==13&&addListValue()});$("#btn_add").button().click(function(){addField(1)});$("#btn_del").button().click(function(){deleteField()});$("#btn_submit").button().click(function(){validateTableInfo()});
alterTable?$("#btn_clear").hide():$("#btn_clear").button().click(function(){clearTableInfo()})}function setError(a,b){$("#grid-messages").html(b).addClass("error");$(selectedRow).length&&($(selectedRow).removeClass("ui-state-active"),selectedRow=null);$(a).each(function(){$(this).addClass("error")});setTimeout(function(){$(a).each(function(){$(this).removeClass("error")})},2E3)}function setMessage(a){$("#grid-messages").html(a).removeClass("error")}
function loadDialogValues(){$("#list-items").html("");obj=$(this).data("attachField");list=obj.data("listValues");$(list).each(function(a){option=$("<option></option>").val(list[a]).text(list[a]);$("#list-items").append(option)});setTimeout(function(){$("#dialog-list #item").focus()},50)}
function saveDialogValues(){obj=$(this).data("attachField");list=[];$("#list-items option").each(function(){list.push($(this).val())});obj.data("listValues",list);setTimeout(function(){obj.next().trigger("click")},100);$("#dialog-list").dialog("close")}
function addListValue(){val=$("#item").val();""!=val&&(found=!1,$("#list-items option").each(function(){if($(this).val()==val)return found=!0,!1}),found||(option=$("<option></option>").val(val).text(val),$("#list-items").append(option),$("#item").val("").focus()))}function appendListEditor(a){a.append($('<span title="Edit list of values for this field" class="list">&nbsp;</span>').click(function(a){a.stopPropagation();editListOfValues($(this).parent())}))};
