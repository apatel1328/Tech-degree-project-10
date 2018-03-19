$(document).ready(function($) {

	//Generate 12 Random Users
	$.ajax({
	  url: 'https://randomuser.me/api/?results=12&nat=us',
	  dataType: 'json',
	  success: function(users) {

	//Set global variables
	  	var usersSection = $('.users');
	  	var allUsers = users.results;
	  	var users = [];


	//Loop through all users and generate HTML strings for each
	    for(let i = 0; i < allUsers.length; i++){

	    	var photo = allUsers[i].picture.medium;
	    	var fullName = allUsers[i].name.first + ' ' + allUsers[i].name.last;
	    	var email = allUsers[i].email;
	    	var city = allUsers[i].location.city;
	    	var phone = allUsers[i].phone;
	    	var address = allUsers[i].location.street + ', ' + abbrState(allUsers[i].location.state, 'abbr') + ' ' + allUsers[i].location.postcode;
	    	var birthday = allUsers[i].dob;
	    	var newBirthday = new Date(birthday).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit'});

	    	users.push({
	    		"index" : [i],
	    		"image" : photo,
	    		"name" : fullName,
	    		"email" : email,
	    		"city" : city,
	    		"number" : phone,
	    		"address" : address,
	    		"birthday" : newBirthday

	    	});

	    	var userImg = '<div class="user"' + 'data-user-index=' + [i] + '><img src="' + photo + '"/>';
	    	var userName = '<div class="userInfo">' + '<p>'+ fullName + '</p>'
	    	var userEmail = '<p>' + email + '</p>';
	    	var userCity = '<p>' + city + '</p></div></div>';
	    	var userDetails = userImg + userName + userEmail + userCity;

	//Append Users to HTML
	    	usersSection.append(userDetails);
	   

	    	};

    //Overlay function and modal open

    	$('.user').on('click', function(){

    		var userIndex = parseInt($(this).attr('data-user-index'));
    		var thisUser = users[userIndex];
    		var address = thisUser.address;
    		var birthday = thisUser.birthday;
    		var city = thisUser.city;
    		var email = thisUser.email;
    		var image = thisUser.image;
    		var name = thisUser.name;
    		var number = thisUser.number;
    		var lineBreak = '<hr class="break">';
    		var overlay = $('.overlay');

    		overlay.addClass('active');

    		var modalBeginning = '<div class="modal"><p class="close">&times;</p>';
    		var modalDetails = '<img class="modalImage" src="' + image + '"/>' + '<p>' + name + '</p><p>' + email + '</p><p>' + city + '</p>' + lineBreak + '<p>' + number + '</p><p>' + address + '</p><p>Birthday: ' + birthday + '</p>';
    		var modalEnd = '<div>';
    		var modalInfo = modalBeginning + modalDetails + modalEnd;

    		overlay.append(modalInfo);

    		 //Close modal and remove overlay

		    	$('.close').on('click', () => {
		    		$('.modal').remove();
		    		$('.overlay').removeClass('active');
		    	});
    		
    	});

   

	  }//ajax success function end


	});	//ajax end



//State Abbreviation function from github plugin
	// USAGE:
	// abbrState('ny', 'name');
	// --> 'New York'
	// abbrState('New York', 'abbr');
	// --> 'NY'

	function abbrState(input, to){
	    
	    var states = [
	        ['Arizona', 'AZ'],
	        ['Alabama', 'AL'],
	        ['Alaska', 'AK'],
	        ['Arizona', 'AZ'],
	        ['Arkansas', 'AR'],
	        ['California', 'CA'],
	        ['Colorado', 'CO'],
	        ['Connecticut', 'CT'],
	        ['Delaware', 'DE'],
	        ['Florida', 'FL'],
	        ['Georgia', 'GA'],
	        ['Hawaii', 'HI'],
	        ['Idaho', 'ID'],
	        ['Illinois', 'IL'],
	        ['Indiana', 'IN'],
	        ['Iowa', 'IA'],
	        ['Kansas', 'KS'],
	        ['Kentucky', 'KY'],
	        ['Kentucky', 'KY'],
	        ['Louisiana', 'LA'],
	        ['Maine', 'ME'],
	        ['Maryland', 'MD'],
	        ['Massachusetts', 'MA'],
	        ['Michigan', 'MI'],
	        ['Minnesota', 'MN'],
	        ['Mississippi', 'MS'],
	        ['Missouri', 'MO'],
	        ['Montana', 'MT'],
	        ['Nebraska', 'NE'],
	        ['Nevada', 'NV'],
	        ['New Hampshire', 'NH'],
	        ['New Jersey', 'NJ'],
	        ['New Mexico', 'NM'],
	        ['New York', 'NY'],
	        ['North Carolina', 'NC'],
	        ['North Dakota', 'ND'],
	        ['Ohio', 'OH'],
	        ['Oklahoma', 'OK'],
	        ['Oregon', 'OR'],
	        ['Pennsylvania', 'PA'],
	        ['Rhode Island', 'RI'],
	        ['South Carolina', 'SC'],
	        ['South Dakota', 'SD'],
	        ['Tennessee', 'TN'],
	        ['Texas', 'TX'],
	        ['Utah', 'UT'],
	        ['Vermont', 'VT'],
	        ['Virginia', 'VA'],
	        ['Washington', 'WA'],
	        ['West Virginia', 'WV'],
	        ['Wisconsin', 'WI'],
	        ['Wyoming', 'WY'],
	    ];

	    if (to == 'abbr'){
	        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	        for(i = 0; i < states.length; i++){
	            if(states[i][0] == input){
	                return(states[i][1]);
	            }
	        }    
	    } else if (to == 'name'){
	        input = input.toUpperCase();
	        for(i = 0; i < states.length; i++){
	            if(states[i][1] == input){
	                return(states[i][0]);
	            }
	        }    
	    }
	}




});