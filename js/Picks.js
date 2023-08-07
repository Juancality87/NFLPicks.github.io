var api_url="http://localhost:44324/api";
var user = '';

jQuery(document).ready(function ($) {
    if(document.cookie.split('=')[1] == null){
        window.location.href ="login.html";
    }
    user = document.cookie.split('=')[1];
    Application.init();

    
});
var Application = function () {
    return {
        init: function () {            
            Load_Users_picks();            
        }
    };
}();
function creategrid(data,i){
    var gridname = '#grid'+i;
    var mainelem = document.getElementById("gridrows");
    var secdiv = document.createElement("div");
    secdiv.setAttribute('class','col-md-2');
    var thirddiv = document.createElement("div");
    thirddiv.setAttribute('id','header'+i);
    thirddiv.setAttribute('style','text-align: center;');
    secdiv.appendChild(thirddiv);
    var fordiv = document.createElement("div");
    fordiv.setAttribute('id','name'+i);
    fordiv.setAttribute('style','text-align: center;');
    secdiv.appendChild(fordiv);
    var fifdiv = document.createElement("div");
    fifdiv.setAttribute('id','grid'+i);
    secdiv.appendChild(fifdiv);
    mainelem.appendChild(secdiv);       
    
  
    $(gridname).kendoGrid
    (
        {
            dataSource: data,   
            scrollable: false,                            
            columns:
      [        
        {//column for <img>
            width: "10px",   
            attributes:{
                style:" text-align: right; color: white;border:0;"
            },                            
            headerAttributes: {
                style: "display: none; "
            }                      
        },
        {//column for <img> good or Bad
            width: "10px",   
            attributes:{
                style:" text-align: left; color: white;border:0;"
            },                            
            headerAttributes: {
                style: "display: none; "
            }                      
        },
        {//username
            field:"username",
            hidden:true,
            width: "5px",   
            attributes:{
                style:" text-align: right; color: white;border:0;"
            },                            
            headerAttributes: {
                style: "display: none; "
            }                      
        },
        {//url user image
            field:"user_photo",
            hidden:true,
            width: "5px",   
            attributes:{
                style:" text-align: right; color: white;border:0;"
            },                            
            headerAttributes: {
                style: "display: none; "
            }                      
        },
        {//url team selected
          field:"logo",
          hidden:true,
          width: "5px",   
          attributes:{
              style:" text-align: right; color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
      },
      {//pick result 
        field:"pick_result",
        hidden:true,
        width: "5px",   
        attributes:{
            style:" text-align: right; color: white;border:0;"
        },                            
        headerAttributes: {
            style: "display: none; "
        }                      
    },
    {//points
        field:"points",
        hidden:true,
        width: "5px",   
        attributes:{
            style:" text-align: right; color: white;border:0;"
        },                            
        headerAttributes: {
            style: "display: none; "
        }                      
    }      
    ],                             
      dataBound: function (e) {
        
          Grid_Configuration(gridname,i);
             
      }
  }
);

}
function Grid_Configuration(grid,j) {
    
    var grid = $(grid).data('kendoGrid');    
    grid.table[0].id = "table"+j;    
    var row = document.getElementById('table'+j).rows; 
    var good=0;
    var bad =0;
   
    document.getElementById("header"+j).innerHTML +=  "<img src='"+row[1].cells[3].innerHTML+"' style='width:90px;'/>";
    document.getElementById("name"+j).innerHTML +=  "<h4>"+row[1].cells[2].innerHTML+"</h4> <h5>"+row[1].cells[6].innerHTML+"</h5> ";
    
        for (var i = 0; i < row.length; i++) {

            
            row[i].cells[0].innerHTML += "<img src='"+row[i].cells[4].innerHTML+"' style='width:40px;'/>"; 
            
            if(row[i].cells[5].innerHTML == -1){
                row[i].cells[1].innerHTML += "<img src='/img/png_bad.png' style='width:30px;'/>"; 
                bad--;
            } 
            else if(row[i].cells[5].innerHTML == 1){
                row[i].cells[1].innerHTML += "<img src='/img/png_good.png' style='width:30px;'/>"; 
                good++;
            }
            else if(row[i].cells[5].innerHTML == 2){
                row[i].cells[1].innerHTML += "<img src='/img/png_bad.png' style='width:30px;'/>"; 
                bad--;
            }
            else{
                row[i].cells[1].innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;'
            }
         
                
        }  
        
        document.getElementById("name"+j).innerHTML +=  "<h5>+"+good+" "+bad+"</h5>";
        
}
function Load_Users_picks(){
    
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/GET_User_picks",
        crossDomain: true,
        withCredentials: true,
        async: false,
        dataType: "json",
        success: function (response) {
             
            var qtygames = response[1].gameqty;
            var qtyplayers = response.length / qtygames;
            console.log(qtyplayers);
            for(var i=1;i<=qtyplayers; i++){
                
                data = response.splice(0,qtygames);
                
                creategrid(data,i);
            }         

        },
        failure: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        }
    });
    
}
