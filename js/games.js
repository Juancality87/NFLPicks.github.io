var api_url="http://localhost:44324/api";
var date = '';

jQuery(document).ready(function ($) {
    Application.init();

    
});

var Application = function () {
    return {
        init: function () {   
            Load_datesstring();         
            load_sched();
            GET_Schedule_Games();            
            GET_ByeWeek_teams();
        }
    };
}();

function Load_datesstring(){
    
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/GET_datesString?type=current",        
        async: false,
        dataType: "json",
        
        success: function (response) {
            console.log(response);
            date = response;
            

        },
        failure: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        }
    });

}
function load_sched(){
    console.log('Games Loaded');
    const settings = {
        "async": true,
        "crossDomain": true,
        //"url": "https://nfl-schedule.p.rapidapi.com/v1/schedules",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=" + date,
        "method": "GET"
    };
    
    $.ajax(settings).done(function (response) {
        
        var arrayObject = Object.values(response);   
            
                 
        
        for(var i=0; i<arrayObject[1].length; i++){       
            console.log(); // shortname
            console.log(); // game name
            console.log(); // game date
            var childdata = Object.values(arrayObject[1][i]); 
            var childchilddata = Object.values(childdata[7][0]); 
            console.log(); //hometeam Scores
            console.log(); // awayteam
            console.log(); //hometeamname
            console.log(); //awayteamname      
            
            var data={
                "name": arrayObject[1][i].name, 
                "shortName": arrayObject[1][i].shortName, 
                "date":arrayObject[1][i].date, 
                "venue": arrayObject[1][i].venue,
                "away_team": childchilddata[10][1].team.displayName, 
                "away_score": childchilddata[10][1].score,
                "home_team": childchilddata[10][0].team.displayName,
                "home_score": childchilddata[10][0].score
            };
            
            Post_sched(data);
        }
        

        
        

        
    });

}
function Post_sched(data){
    
    $.ajax({
        type: "POST",
        url: api_url + "/Schedule/Post_Schedule",
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
function GET_Schedule_Games(){
    var data;
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

                            field: "score_away",
                            title: "",
                            width: "5px",                            
                            hidden: true,
                            attributes:
                            {
                                style: "font-size: 12px"
                            },
                            filterable: false,
                            canSelect: false

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
                            width: "200px",
                            attributes:
                            {
                                style: "font-size: 12px; text-align: center; color: white; border:0;"
                            },
                            headerAttributes: {
                                style: "display: none"
                            }
                        },
                        {
                            field: "game_name",                            
                            width: "10px",
                            hidden: true,
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
                            field: "game_date",                            
                            width: "10px",
                            hidden: true,
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
                            width:"40px",
                            attributes:
                            {
                                style: "border:0;"
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

                            field: "score_home",
                            title: "",
                            width: "5px",                            
                            hidden: true,
                            attributes:
                            {
                                style: "font-size: 12px"
                            },
                            filterable: false,
                            canSelect: false

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

                            field: "score_away",
                            title: "",
                            width: "5px",                            
                            hidden: true,
                            attributes:
                            {
                                style: "font-size: 12px"
                            },
                            filterable: false,
                            canSelect: false

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
                                style: "font-size: 12px; width='80' height='100' "
                            },
                            filterable: false,
                            canSelect: false

                        },
                        {
                            width: "200px",
                            attributes:
                            {
                                style: "font-size: 12px; text-align: center; color: white; border:0;"
                            },
                            headerAttributes: {
                                style: "display: none"
                            }
                        },
                        {
                            field: "game_name",                            
                            width: "10px",
                            hidden: true,
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
                            field: "game_date",                            
                            width: "10px",
                            hidden: true,
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
                            width:"40px",
                            attributes:
                            {
                                style: "border:0;"
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

                            field: "score_home",
                            title: "",
                            width: "5px",                            
                            hidden: true,
                            attributes:
                            {
                                style: "font-size: 12px"
                            },
                            filterable: false,
                            canSelect: false

                        }                       
                    ], 
                                     
                dataBound: function (e) {
                    Grid_Configuration2();
                       
                }
            }
        );
        
}

function Grid_Configuration() {
    var grid = $('#grid').data('kendoGrid');    
    grid.table[0].id = "table";    
    var row = document.getElementById('table').rows;    
    
        for (var i = 0; i < row.length; i++) {

            row[i].cells[0].innerHTML += "<h4><strong>"+row[i].cells[1].innerHTML+"</strong></h4>";
            row[i].cells[2].innerHTML += "<img src='"+row[i].cells[3].innerHTML+"' style='width:90px;'/>";           
            row[i].cells[4].innerHTML += "<p><strong>"+row[i].cells[5].innerHTML+"</strong></p><p>"+row[i].cells[6].innerHTML+"</p>";
            row[i].cells[7].innerHTML += "<img src='"+row[i].cells[8].innerHTML+"' style='width:90px;'/>";           
            row[i].cells[9].innerHTML += "<h4><strong>"+row[i].cells[10].innerHTML+"</strong></h4>";
                
        }
    
}
function Grid_Configuration2() {
    
    var grid2 = $('#grid2').data('kendoGrid');
    grid2.table[0].id = "table2";
    var row2 = document.getElementById('table2').rows;
    
    
    
    
        for (var i = 0; i < row2.length; i++) {

            row2[i].cells[0].innerHTML += "<h4><strong>"+row2[i].cells[1].innerHTML+"</strong></h4>";
            row2[i].cells[2].innerHTML += "<img src='"+row2[i].cells[3].innerHTML+"' style='width:90px;'/>";           
            row2[i].cells[4].innerHTML += "<p><strong>"+row2[i].cells[5].innerHTML+"</strong></p><p>"+row2[i].cells[6].innerHTML+"</p>";
            row2[i].cells[7].innerHTML += "<img src='"+row2[i].cells[8].innerHTML+"' style='width:90px;'/>";           
            row2[i].cells[9].innerHTML += "<h4><strong>"+row2[i].cells[10].innerHTML+"</strong></h4>";
                
        }
    
}

function GET_ByeWeek_teams(){
    console.log('bye_teams');
    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/byeweek",        
        crossDomain: true,
        withCredentials: true,
        async: false,
        dataType: "json",
        success: function (response) {
            
            ByeWK_Grid_Modification(response)

        },
        failure: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        }
    });
        
}

function ByeWK_Grid_Modification(data) {
        var arrayObject = Object.values(data);
        var element = document.getElementById('byes');    
        var head = document.getElementById("titleschd");
        var nav = document.getElementById("picks");
        head.innerHTML += "<h3>Week " + arrayObject[0].week + "</h3>";
        nav.innerHTML += arrayObject[0].week
        
        for(var i=0; i<=arrayObject.length; i++){
            
            element.innerHTML += "<div id='" + arrayObject[i].id_team_pk + "'><img class='img-fluid' src='"+ arrayObject[i].team_logo +"' width='80' height='100'/></div>";
            
        }
        
}