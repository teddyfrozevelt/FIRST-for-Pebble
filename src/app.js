var UI = require('ui');
var ajax = require('ajax');
var currentTime = new Date();
var year = currentTime.getFullYear();
var teamNumber = 503;
var baseTeamURL = 'http://www.thebluealliance.com/api/v2/team/frc';
var baseEventURL = '';

var mainMenu = new UI.Menu({
  sections: [{
    items: [{
      title: 'Team Info',
      subtitle: 'FRC ' + teamNumber
    }, {
      title: 'Matches',
      subtitle: year
    }]
  }]
});
var teamInfoCard = new UI.Card();
mainMenu.show();

function teamInfo() {
  ajax ({
    url: baseTeamURL + teamNumber,
    type: 'json',
    headers: { 'X-TBA-App-Id': 'frc548_owendaprile:FIRST_for_Pebble:v01' }
  },
    function(data) {
      teamInfoCard.title(data.nickname);
      teamInfoCard.subtitle(data.locality + ", " + data.region);
      teamInfoCard.body(data.motto);
      
      teamInfoCard.show();
    },
    function(error) {
      console.log('error retieving data '+error);
});
}

function matchInfo() {
  ajax ({
    url: baseEventURL,
    type: 'json',
    headers: { 'X-TBA-App-Id': 'frc548_owendaprile:FIRST_for_Pebble:v01' }
  },
    function(data) {
      
    },
    function(error) {
      console.log(error); 
    });
}

mainMenu.on('select', function(e) {
  if(e.itemIndex === 0) {
    console.log('User clicked ' + e.item.title);
    teamInfo();
  } else if(e.itemIndex === 1) {
    console.log('User clicked ' + e.item.title);
    matchInfo();
  }
});