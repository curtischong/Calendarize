var monthsave = new Array();
var table;
var d = new Date();
var month= d.getMonth();
var year=d.getFullYear();
var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var calendar = function() {
	
	
	//0-11
	//2014
	if (month > 11) {
        month = month-12;
		year=year + 1;
	}
	var first_date = month_name[month] + " " + 1 + " " + year;
	//September 1 2014
	var tmp = new Date(first_date).toDateString();
	//Mon Sep 01 2014 ...
	var first_day = tmp.substring(0, 3);
	//Mon
	var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var day_no = day_name.indexOf(first_day);
	//1
	var days = new Date(year, month + 1, 0).getDate();
	//30
	//Tue Sep 30 2014 ...
	var calendar = get_calendar(day_no, days);
	document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
	document.getElementById("calendar-dates").appendChild(calendar);
};
function get_calendar(day_no, days) {
	table = document.createElement('table');
	var tr = document.createElement('tr');
	//row for the day letters
	for (var c = 0; c <= 6; c++) {
		var td = document.createElement('z');
		td.innerHTML = "       "[c];
		tr.appendChild(td);
	}
	table.appendChild(tr);
	//create 2nd row
	tr = document.createElement('tr');
	var c;
	for ( c = 0; c <= 6; c++) {
		if (c == day_no) {
			break;
		}
		var td = document.createElement('td');
		td.innerHTML = "";
		tr.appendChild(td);
	}
	var count = 1;
	for (; c <= 6; c++) {
		var td = document.createElement('td');
		td.innerHTML = count;
		count++;
		tr.appendChild(td);
	}
	table.appendChild(tr);
	//rest of the date rows
	for (var r = 3; r <= 7; r++) {
		tr = document.createElement('tr');
		for (var c = 0; c <= 6; c++) {
			if (count > days) {
				table.appendChild(tr);
				return table;
			}
			var td = document.createElement('td');
			td.innerHTML = count;
			count++;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	return table;
};

window.onload = function() {
	calendar();
};

$(document).ready(function() {
    //saves .html() of the months into an array (save this array when storing info to servers)
    var savemonth = function(){
    monthsave[month + (year*100)] = $('#calendar-dates').html();
};

    var checkdates = function(){
        document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
        calendar();
        $('#calendar-dates').html(monthsave[month + (year*100)]);
    };
//for going to other months if statements restrict users from entering next month during event creation etc.
	$("#triangleright").on("click", function() {
        if(calendarisshowing == false){
            $('.dayselected').removeClass('dayselected');
            savemonth();
            $('#calendar-dates table:nth-of-type(1)').remove();
            month = month+1;
                if (month > 11) {
                month = month-12;
                year=year + 1;
                }
            checkdates();
            $('#editeventbutton').hide();
        }
	});
		$("#triangleleft").on("click", function() {
            if(calendarisshowing == false){
                $('.dayselected').removeClass('dayselected');
                savemonth();
                $('#calendar-dates table:nth-of-type(1)').remove();
                month = month-1;
                    if (month < 0) {
                    month = month+12;
                    year=year - 1;
                    }
                checkdates();
                $('#editeventbutton').hide();
            }
	});
	//a black square appears to show selected date
var calendarisshowing = false;
$('#calendarevent').hide();
$('#editmodebutton').on("click",function(){
    if(editeventmode == false){
        $('.dayselected').removeClass('dayselected');
        calendarisshowing = true;
        $('#calendarevent').show();
        $('#calendardateinfo').html("");
        $('#calendardateinfo').hide();
        $("#editeventbutton").hide();
    }
});
    
    
    
    
    
        var editeventmode = false;
    $('#editeventbutton').on("click",function(){
        if(calendarisshowing==false && $('.dayselected').hasClass("dayselected")){
            calendarisshowing = true;
            editeventmode = true;
                $('#calendarevent').show();
            $("#createcalendartitle").val($('#hoverinfodiv > .calendardatet').text());
            $("#inputevent").val($('#hoverinfodiv > .calendardate').text());
                if($(".dayselected").hasClass("event_meeting")){
                    $(".dayselected").removeClass("event_meeting");
                    $(".dayselected").addClass("dayclickedon_meeting");
                    $("#meeting").prop("checked", true);
                }
                if($(".dayselected").hasClass("event_event")){
                    $(".dayselected").removeClass("event_event");
                    $(".dayselected").addClass("dayclickedon_event");
                    $("#event").prop("checked", true);
                }
                if($(".dayselected").hasClass("event_duedate")){
                    $(".dayselected").removeClass("event_duedate");
                    $(".dayselected").addClass("dayclickedon_duedate");
                    $("#duedate").prop("checked", true);
                }
            $('#calendardateinfo').html("");
            $('#calendardateinfo').hide();
        }
    });
    
    
    
    var removeeventword = function(){
        $(".dayselected > .calendardatet").remove();
        $(".dayselected > .calendardate").remove();
    };
    
    
    
    $('#chosedate').hide();
    $('#meeting,#duedate,#event').on("click",function(){
        if(editeventmode == false){
    $('#chosedate').show();
        }
    });
    
    var $selectdate = false;
    //for selecting a date for the event
    $('#chosedate').on("click",function(){
        $('#body').css('cursor','alias');
        $selectdate = true;
    });
    
        var resetcreateevent = function(){
        $('#calendarevent').hide();
        $('input[name=eventkind]').attr('checked',false);
        $('#createcalendartitle').val('');
        $('#inputevent').val('');
        $selectdate= false;
        $('#body').css('cursor','auto');
        $('#chosedate').hide();
        $selectdatesubmit = false;
        calendarisshowing = false;
        $('#calendardateinfo').show();
        editeventmode = false;
        $('.dayselected').removeClass('dayselected');
    };
        var $selectdatesubmit = false;
    $('#editeventbutton').hide();
	$('#calendar-dates').click(function(event) {
    var calendarday = $(event.target);
        if(calendarday.get(0).tagName==("TD") && $selectdate==true && calendarday.text().length >0 ){
    
            var reseteventclasses = function(){
                calendarday.removeClass("dayclickedon_duedate");
                calendarday.removeClass("dayclickedon_event");
                calendarday.removeClass("dayclickedon_meeting");
            }
            
            if(document.getElementById('duedate').checked){
                reseteventclasses();
                calendarday.addClass('dayclickedon_duedate');
                var dayselected = calendarday.text();
                var dayeventtype = duedate;
                $selectdate=false;
                $('#body').css('cursor','auto');
                $selectdatesubmit = true;
            }
            
             else if(document.getElementById('event').checked){
                reseteventclasses();
                calendarday.addClass('dayclickedon_event');
                var dayselected = calendarday.text();
                var dayeventtype = event;
                $selectdate=false;
                $('#body').css('cursor','auto');
                $selectdatesubmit = true;
            }
            else if(document.getElementById('meeting').checked){
                reseteventclasses();
                calendarday.addClass('dayclickedon_meeting');
                var dayselected = calendarday.text();
                var dayeventtype = meeting;
                $selectdate=false;
                $('#body').css('cursor','auto');
                $selectdatesubmit = true;
            }
        }
        if(calendarday.get(0).tagName==("TD") && calendarisshowing == false && calendarday.text().length >0){
            //make it so that if the user clicks outside of the calendar thingy, it removes all instances of .dayselected
			//to display events for that day
            $('#editeventbutton').hide();
            $('#calendardateinfo').html("");
            $('.dayselected').css("padding","5px");
            $('.dayselected').removeClass('dayselected');
            calendarday.addClass("dayselected");
            $('.dayselected').css("padding","4px");
            if($('.dayselected').hasClass('event_meeting')||$('.dayselected').hasClass('event_event')|| $('.dayselected').hasClass('event_duedate')){
                $('#editeventbutton').show();
                $('#calendardateinfo').append('<br id="titlebreak"> <br id="descriptionbreak">');
                var retrievingevent = calendarday.html();
                
                var eventtype ="";
                if($('.dayselected').hasClass('event_meeting')){
                    eventtype = " - meeting";
                }if($('.dayselected').hasClass('event_event')){
                    eventtype = " - event";
                }if($('.dayselected').hasClass('event_duedate')){
                    eventtype = " - duedate";
                }  
                $("#titlebreak").before("<div id='hoverinfodiv'>"+ month_name[month] + " "+retrievingevent+' '+ year + eventtype +"</div>");
                $('#titlebreak').after('<div id="hoverinfotitle">'+$('#hoverinfodiv > .calendardatet').text()+"</div>");
                $('#descriptionbreak').after("<div id='hoverinfodescription'>"+$('#hoverinfodiv > .calendardate').text()+"</div>");
                $('#hoverinfodescription').after('<button id="deleteevent">delete event</button>');
                
                    $('#deleteevent').on('click',function(){
                        if (confirm("Remove event?") == true){
                           $('.dayselected').removeClass("event_meeting");
                            $('.dayselected').removeClass("event_event");
                            $('.dayselected').removeClass("event_duedate");
                            removeeventword();
                            $('#calendardateinfo').html("");
                            $("#editeventbutton").hide();
                        }
                    });
            }
        }
	});

    
    
    
    
    
    
/*$('#calendar-dates').mouseenter(function(event){
    var mousehover = $(event.target);
    if(mousehover.get(0).tagName==("TD") && $('#calendarevent').is(":hidden")){
                mousehover.hover(function(){
                    var hovertitle = mousehover.children('.calendardatets');
                    alert(hovertitle);
                   // mousehover.find('.calendardate').show();
                });
            mousehover.mouseleave(function(event){
                mousehover.find('.calendardate').hide();
            });
        }
});*/
    
    /*$(".event_meeting").mouseenter(function() {
        alert("hi");
    //$(this).children(".description").show();
//}).mouseout(function() {
    //$(this).children(".description").hide();
});*/
    
    $('#cancelcreateevent').on("click",function(){
        if(editeventmode == false){
            //normal create event
            resetcreateevent();
            $('.dayclickedon_meeting').removeClass('dayclickedon_meeting');
            $('.dayclickedon_event').removeClass('dayclickedon_event');
            $('.dayclickedon_duedate').removeClass('dayclickedon_duedate');
        }
        if(editeventmode == true){
            resetcreateevent();
                $('.dayclickedon_meeting').addClass('event_meeting');
                $('.dayclickedon_meeting').removeClass('dayclickedon_meeting');
                $('.dayclickedon_event').addClass('event_event');
                $('.dayclickedon_event').removeClass('dayclickedon_event');
                $('.dayclickedon_duedate').addClass('event_duedate');
                $('.dayclickedon_duedate').removeClass('dayclickedon_duedate');
                $("#editeventbutton").hide();
        }
    });
    
    var hidecalendarword = function(){
        $('.calendardate').hide();
        $('.calendardatet').hide();
    };
    
    $('#submitevent').on("click",function(){
		//creates event
        var $createcalendartitle = document.getElementById("createcalendartitle").value;
        var $inputevent = document.getElementById("inputevent").value;
        //editing an event
            if($createcalendartitle.length>0 && editeventmode == true){
                $('.dayclickedon_meeting').removeClass('dayclickedon_meeting');
                $('.dayclickedon_event').removeClass('dayclickedon_event');
                $('.dayclickedon_duedate').removeClass('dayclickedon_duedate');
                $("#editeventbutton").hide();
                
            if(document.getElementById('duedate').checked){
                $(".dayselected").addClass('event_duedate');
            }else if(document.getElementById('event').checked){
                $(".dayselected").addClass('event_event');
            }else if(document.getElementById('meeting').checked){
                $(".dayselected").addClass('event_meeting ');
            }
                
                removeeventword();

                $('.dayselected').append("<div class='calendardatet'>"+$createcalendartitle+"</div>");
                $('.dayselected').append("<div class='calendardate'>"+$inputevent+"</div>");
                hidecalendarword();
                resetcreateevent();
            }
        
//confirming a new event
            else if($('input:radio[name=eventkind]:checked').length > 0 && $createcalendartitle.length>0 && $selectdatesubmit == true && editeventmode == false){
                $('.dayclickedon_meeting').append("<div class='calendardatet'>"+$createcalendartitle+"</div>");
                $('.dayclickedon_event').append("<div class='calendardatet'>"+$createcalendartitle+"</div>");
                $('.dayclickedon_duedate').append("<div class='calendardatet'>"+$createcalendartitle+"</div>");
                $('.dayclickedon_meeting').append("<div class='calendardate'>"+$inputevent+"</div>");
                $('.dayclickedon_event').append("<div class='calendardate'>"+$inputevent+"</div>");
                $('.dayclickedon_duedate').append("<div class='calendardate'>"+$inputevent+"</div>");
                    hidecalendarword();
                    resetcreateevent();
                    $('.dayclickedon_meeting').addClass('event_meeting');
                    $('.dayclickedon_meeting').removeClass('dayclickedon_meeting');
                    $('.dayclickedon_event').addClass('event_event');
                    $('.dayclickedon_event').removeClass('dayclickedon_event');
                    $('.dayclickedon_duedate').addClass('event_duedate');
                    $('.dayclickedon_duedate').removeClass('dayclickedon_duedate');
            }
            else{
            alert("you need to complete some actions in the form before submitting your event."); 
            }
        
    });
});







