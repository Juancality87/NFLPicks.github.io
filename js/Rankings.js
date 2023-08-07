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
            
            Load_rankings();           
            Load_weeks();
            Load_years();
        }
    };
}();

function Load_rankings(){
    
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/GET_Rankings",
        crossDomain: true,
        withCredentials: true,
        async: false,
        dataType: "json",
        success: function (response) {
             
            data = response;
            

        },
        failure: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        }
    });

    $("#grid").kendoGrid
    (
        {
            dataSource: data,   
            scrollable: false,                            
            columns:
      [        
        {
          field:"place", 
          title: "Lugar",
          width: "2px",   
          attributes:{
              style:" text-align: center; color: black; border: solid 1px black;"
          },
          headerAttributes: {
            style: "text-align: center; color: black; border: solid 1px black;"
        }                                   
      },
      {
        width: "10px",   
        title: "",
        attributes:{
            style:" text-align: center; color: black; border: solid 1px black;"
        },        
        headerAttributes: {
            style: "text-align: center; color: black; border: solid 1px black; "
        }                         
    },
      {
        field: "username",   
        title: "Nombre",         
        width: "5px",   
        attributes:{
            style:" text-align: center; color: black; border: solid 1px black;"
        },
        headerAttributes: {
            style: "text-align: center; color: black; border: solid 1px black; "
        }                               
    },
        {
            field: "image",
            title: "",
            width: "5px",                            
            hidden: true,
            attributes:
            {
                style: "font-size: 12px;"
            }              
        },        
        {
            field: "points",
            title: "Puntos",            
            width: "10px",            
            attributes:
            {
                style: "text-align: center; color: black; border: solid 1px black;"
            },
            headerAttributes: {
                style: "text-align: center; color: black; border: solid 1px black; "
            }        
        }                 
    ],                             
      dataBound: function (e) {
          Grid_Configuration();
             
      }
  }
);
}

function Grid_Configuration() {
    var grid = $('#grid').data('kendoGrid');    
    grid.table[0].id = "table";    
    var row = document.getElementById('table').rows;
    
    //row[1].cells[0].innerHTML += "<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTsk9X45FPyOVdbfeoJVqubyc48vZOTj15w&usqp=CAU' style='width:30px;'/>";
        for (var i = 0; i < row.length; i++) {     
                  
            row[i].cells[1].innerHTML += "<img src='"+row[i].cells[3].innerHTML+"' style='width:35px;'/>";                
        }
    
  }

  function Load_weeks() {
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/GET_Weeks",
        crossDomain: true,
        withCredentials: true,
        dataType: "json",
        async: false,
        success: function (response) {

            var items = '<option value=""></option>';

            for (i = 0; i < response.length; i++) {
                items += "<option value='" + response[i].week + "'>Week " + response[i].week + "</option>";
                
            }

            $('#week').html(items);

        },
        failure: function (response) {
            Notification("Something was wrong", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Something was wrong", response.responseJSON.Message, "error");
        }
    });
}

function Load_years() {
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/GET_years",
        crossDomain: true,
        withCredentials: true,
        dataType: "json",
        async: false,
        success: function (response) {

            var items = '<option value=""></option>';

            for (i = 0; i < response.length; i++) {
                items += "<option value='" + response[i].year + "'>" + response[i].year + "</option>";                
            }
            console.log(items);

            $('#year').html(items);

        },
        failure: function (response) {
            Notification("Something was wrong", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Something was wrong", response.responseJSON.Message, "error");
        }
    });
}
function getpicks(){
    
        var week = $('#week').val();
        var year = $('#year').val();

        if (week == '' || year == ''){
            return ;
        }
        
        $.ajax({
            type: "GET",
            url: api_url + "/Schedule/GET_goodbad_ByWeek?week=" + week + "&year=" + year,
            crossDomain: true,
            withCredentials: true,
            async: false,
            dataType: "json",
            success: function (response) {
                 
                data = response;
                
    
            },
            failure: function (response) {
                Notification("Algo salio mal", response.responseJSON.Message, "error");
            },
            error: function (response) {
                Notification("Algo salio mal", response.responseJSON.Message, "error");
            }
        });
    
        $("#gridbyweek").kendoGrid
        (
            {
                dataSource: data,   
                scrollable: false,                            
                columns:
          [        
            {
              field:"username", 
              title: "Nombre",
              width: "5px",   
              attributes:{
                  style:" text-align: center; color: black; border: solid 1px black;"
              },
              headerAttributes: {
                style: "text-align: center; color: black; border: solid 1px black;"
            }                                   
          },
          {
            width: "10px",   
            title: "",
            attributes:{
                style:" text-align: center; color: black; border: solid 1px black;"
            },        
            headerAttributes: {
                style: "text-align: center; color: black; border: solid 1px black; "
            }                         
            },          
            {
                field: "image",
                title: "",
                width: "5px",                            
                hidden: true,
                attributes:
                {
                    style: "font-size: 12px;"
                }              
            }, 
            {
                width: "10px",   
                title: "",
                attributes:{
                    style:" text-align: center; color: black; border: solid 1px black;"
                },        
                headerAttributes: {
                    style: "text-align: center; color: black; border: solid 1px black; "
                }                         
                },       
            {
                field: "good",
                title: "",            
                width: "10px",   
                hidden:true,         
                attributes:
                {
                    style: "text-align: center; color: black; border: solid 1px black;"
                },
                headerAttributes: {
                    style: "text-align: center; color: black; border: solid 1px black; "
                }        
            },
            {
                field: "bad",
                title: "",            
                width: "10px",   
                hidden:true,         
                attributes:
                {
                    style: "text-align: center; color: black; border: solid 1px black;"
                },
                headerAttributes: {
                    style: "text-align: center; color: black; border: solid 1px black; "
                }        
            }                          
        ],                             
          dataBound: function (e) {
              Grid_Configuration2();
                 
          }
      }
    );       
    
}
function Grid_Configuration2() {
    var grid = $('#gridbyweek').data('kendoGrid');    
    grid.table[0].id = "table1";    
    var row = document.getElementById('table1').rows;
    
    
        for (var i = 0; i < row.length; i++) {     
                  
            row[i].cells[1].innerHTML += "<img src='"+row[i].cells[2].innerHTML+"' style='width:35px;'/>";                
            row[i].cells[3].innerHTML += "<p>+"+row[i].cells[4].innerHTML+"  -"+ row[i].cells[5].innerHTML +"</p>";       
        }
    
  }