var api_url="http://localhost:44324/api";
var user = '';

jQuery(document).ready(function ($) {
    if(document.cookie.split('=')[1] == null){
        window.location.href ="login.html";
    }

    var cockies = document.cookie.split(';');

    for (var i = 0; i < cockies.length; i++){
        var singlecockie = cockies[i].split('=');
        console.log(singlecockie);
        if(singlecockie[0].trim() == 'login'){
            user = singlecockie[1].trim();
;        }
    } 
    console.log(user);
    
    Application.init();
    
    
});

var Application = function () {
    return {
        init: function () {            
            
            GET_Schedule_Games();           
            
        }
    };
}();
function GET_Schedule_Games(){
    
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/GET_Schedule_Games",
        crossDomain: true,
        withCredentials: true,
        async: false,
        dataType: "json",
        success: function (response) {
             
            data1 = response.splice(0,8);
            data2 = response.splice(-8);

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
            dataSource: data1,   
            scrollable: false,                            
            columns:
      [
        {
            width: "10px",   
            attributes:{
                style:" text-align: right; color: white;border:0;"
            },                            
            headerAttributes: {
                style: "display: none; "
            }                      
        },
        {
          field:"id_game_match_pk",
          hidden:true,
          width: "5px",   
          attributes:{
              style:" text-align: right; color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
      },
      {
        field: "id_away_team",
        hidden:true,
        width: "5px",   
        attributes:{
            style:" text-align: right; color: white;border:0;"
        },                            
        headerAttributes: {
            style: "display: none; "
        }                      
    },
        {
          width: "20px",   
          attributes:{
              style:" text-align: right;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; border:0;"
          }                      
      },
        {
            field: "away_logo",
            title: "",
            width: "5px",                            
            hidden: true,
            attributes:
            {
                style: "font-size: 12px;"
            },
            filterable: false,
            canSelect: false

        },
        {
             
          attributes:{
              style:" text-align: right;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; border:0;"
          }                      
      },
        {
          width: "40px",   
          attributes:{
              style:" text-align: right;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; border:0;"
          }                      
      },
        {
            field: "home_logo",
            title: "",
            hidden: true,
            width: "10px",
            headerAttributes:
            {
                style: "font-size: 12px; font-weight: bold"
            },
            attributes:
            {
                style: "font-size: 12px"
            },
            filterable: true
        },
        {
          width: "20px",   
          attributes:{
              style:" text-align: left;color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
        },
        {
          field: "id_home_team",
          width: "5px",   
          hidden:true,
          attributes:{
              style:" text-align: right; color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
      }                             
    ],                             
      dataBound: function (e) {
          Grid_Configuration();
             
      }
  }
);

//grid2
$("#grid2").kendoGrid
(
  {
      dataSource: data2,
      noRecords: true,
      messages:
      {
          noRecords: "<div class=\"text-center\"><h4>Dificultades Tecnicas</h4></div>"
      },                 
      scrollable: false,                     
      columns:
      [
        {
            width: "20px",   
            attributes:{
                style:" text-align: right; color: white;border:0;"
            },                            
            headerAttributes: {
                style: "display: none; "
            }                      
        },
        {
          field:"id_game_match_pk",
          hidden:true,
          width: "5px",   
          attributes:{
              style:" text-align: right; color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
      },
      {
        field: "id_away_team",
        hidden:true,
        width: "5px",   
        attributes:{
            style:" text-align: right; color: white;border:0;"
        },                            
        headerAttributes: {
            style: "display: none; "
        }                      
    },
        {
          width: "40px",   
          attributes:{
              style:" text-align: right;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; border:0;"
          }                      
      },
        {
            field: "away_logo",
            title: "",
            width: "5px",                            
            hidden: true,
            attributes:
            {
                style: "font-size: 12px;"
            },
            filterable: false,
            canSelect: false

        },
        {
             
          attributes:{
              style:" text-align: right;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; border:0;"
          }                      
      },
        {
          width: "40px",   
          attributes:{
              style:" text-align: right;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; border:0;"
          }                      
      },
        {
            field: "home_logo",
            title: "",
            hidden: true,
            width: "10px",
            headerAttributes:
            {
                style: "font-size: 12px; font-weight: bold"
            },
            attributes:
            {
                style: "font-size: 12px"
            },
            filterable: true
        },
        {
          width: "20px",   
          attributes:{
              style:" text-align: left;color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
        },
        {
          field: "id_home_team",
          width: "5px",   
          hidden:true,
          attributes:{
              style:" text-align: right; color: white;border:0;"
          },                            
          headerAttributes: {
              style: "display: none; "
          }                      
      }                             
    ],       
          dataBound: function (e) {
            Grid_Configuration2();
               
        }
      }
    )
}

function Grid_Configuration() {
  var grid = $('#grid').data('kendoGrid');    
  grid.table[0].id = "table";    
  var row = document.getElementById('table').rows;    
  
      for (var i = 0; i < row.length; i++) {

          row[i].cells[0].innerHTML += "<input type='checkbox' name='check' value='" + row[i].cells[1].innerHTML+ "," + row[i].cells[2].innerHTML + "' />";
          row[i].cells[3].innerHTML += "<img src='"+row[i].cells[4].innerHTML+"' style='width:90px;'/>";          
          row[i].cells[6].innerHTML += "<img src='"+row[i].cells[7].innerHTML+"' style='width:90px;'/>";           
          row[i].cells[8].innerHTML += "<input type='checkbox' name='check' value='" + row[i].cells[1].innerHTML+ "," + row[i].cells[9].innerHTML + "' />";
              
      }
  
}
function Grid_Configuration2() {
  
  var grid2 = $('#grid2').data('kendoGrid');
  grid2.table[0].id = "table2";
  var row2 = document.getElementById('table2').rows;
  
  
  
  
      for (var i = 0; i < row2.length; i++) {

        row2[i].cells[0].innerHTML += "<input type='checkbox' name='check' value='" + row2[i].cells[1].innerHTML+ "," + row2[i].cells[2].innerHTML + "' />";
        row2[i].cells[3].innerHTML += "<img src='"+row2[i].cells[4].innerHTML+"' style='width:90px;'/>";          
        row2[i].cells[6].innerHTML += "<img src='"+row2[i].cells[7].innerHTML+"' style='width:90px;'/>";           
        row2[i].cells[8].innerHTML += "<input type='checkbox' name='check' value='" + row2[i].cells[1].innerHTML+ "," + row2[i].cells[9].innerHTML + "' />";
              
      }
  
}

function complete(){    
        var checkboxes = 
            document.getElementsByName('check');
        //get array from games in kendo

        var grid = $('#grid').data('kendoGrid');    
        grid.table[0].id = "table";    
        var row = document.getElementById('table').rows;
        var Fcountgrid = row.length; 

        var grid2 = $('#grid2').data('kendoGrid');    
        grid2.table[0].id = "table2";    
        var row2 = document.getElementById('table2').rows;
        var Fcountgrid2 = row2.length;
        
        var gamesarr = new Array();

        for(var j = 1; j < row.length; j++){
            
            gamesarr[j-1] = row[j].cells[1].innerHTML;
        }
        for(var k = 1; k < row2.length; k++){
            gamesarr[k+7] = row2[k].cells[1].innerHTML;
        }
        
        gamesarr.sort();
       
//get array from games in kendo


//Get user selection to compare with first array and get user selection to send to API       
        
        var arraygameselected = new Array();
        var arrUserGames = new Array();
        var count = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                arrUserGames[count] = checkboxes[i].value;                         
                arraygameselected[count] = checkboxes[i].value.split(',')[0];
                count++;
            }
        }
        arraygameselected.sort();
        
//Get user selection to compare with first array and get user selection to send to API 


//compare two arrays, needs to be same to send data to API
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

     if(compareArrays(arraygameselected, gamesarr)){        
        
        for(var i=0; i<arrUserGames.length; i++){           

            var data={
                "id_game_fk": arrUserGames[i].split(',')[0], 
                "id_team_fk": arrUserGames[i].split(',')[1], 
                "user": user.split(';')[0],
                "id_gametype_fk": 1               
            };
            console.log(data);
            Post_selection(data);
        }
     } 
     else{
        alert('Verifica la seleccion de picks hay un error.');
     }  
     //al terminar redirigir a una nueva ventana con las selecciones hechas. 
     //compare two arrays, needs to be same to send data to API
}
function Post_selection(data){
    
    $.ajax({
        type: "POST",
        url: api_url + "/Schedule/Post_Selection_User",
        data: data,
        
        async: false,
        dataType: "json",
        
        success: function (response) {

            

        },
        failure: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        }
    });

}