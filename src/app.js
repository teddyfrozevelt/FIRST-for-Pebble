var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');
var currentTime = new Date();
var year = currentTime.getFullYear();
var teamNumber = 503;
var teamURL = 'http://www.thebluealliance.com/api/v2/team/frc' + teamNumber;
var eventURL = '/api/v2/team/frc' + teamNumber +'/' + year + '/events';
var baseMatchURL = '/api/v2/team/frc' + teamNumber + '/event/2015misou/matches';
Settings.data('teamInfo', {nickname: '', locality: '', region: '', motto: ''});
var teamInfo = Settings.data('teamInfo');
var mainMenu = new UI.Menu({
  sections: [{
    items: [{
      title: 'Team Info',
      subtitle: 'FRC ' + teamNumber
    }, {
      title: 'Events',
      subtitle: 'For ' + year
    }, {
      title: 'Points',
      subtitle: 'Current Match'
    }]
  }]
});
var teamInfoCard = new UI.Card();
mainMenu.show();

ajax ({
    url: teamURL,
    type: 'json',
    headers: { 'X-TBA-App-Id': 'frc548_owendaprile:FIRST_for_Pebble:v01' }
  },
    function(data) {
      teamInfo.nickname = data.nickname;
      teamInfo.locality = data.locality;
      teamInfo.region = data.region;
      teamInfo.motto = data.motto;
    },
    function(error) {
      console.log('Error retrieving team information: ' + error);
});

/*
function events() {
  ajax ({
    url: baseEventURL,
    type: 'json',
    headers: { 'X-TBA-App-Id': 'frc548_owendaprile:FIRST_for_Pebble:v01' }
  },
    function(data) {
      //show list of matches
    },
    function(error) {
      console.log('Error retrieving event information: ' + error);
});
}
*/

function matches() {
  ajax ({
    url: baseMatchURL,
    type: 'json',
    headers: { 'X-TBA-App-Id': 'frc548_owendaprile:FIRST_for_Pebble:v01' }
  },
    function(data) {
      //when user clicks on a match, show data and alliances
      console.log(data.score_breakdown.blue.total_points);
    },
    function(error) {
      console.log('Error retrieving team information: ' + error);
});
}

mainMenu.on('select', function(e) {
  if(e.itemIndex === 0) {
    teamInfoCard.title(teamInfo.nickname);
    teamInfoCard.subtitle(teamInfo.locality + ", " + teamInfo.region);
    teamInfoCard.body(teamInfo.motto);
    
    teamInfoCard.show();
  } else if(e.itemIndex === 1) {
  } else if(e.itemIndex === 2) {
    matches();
  }
});