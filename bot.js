console.log('start')
require('dotenv').config()

var Twit = require('twit');

var T = new Twit({
    consumer_key:         process.env.consumer_key,
    consumer_secret:      process.env.consumer_secret,
    access_token:         process.env.access_token,
    access_token_secret: process.env.access_token_secret
    //timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })



//For getting the tweets
  var params ={
    q:'Laban Pilipinas since:2021-05-11',//queries
    count:2//howmany
}

// T.get('search/tweets',params, gotData);

// function gotData(err,data,response) {
//      var tweets = data.statuses;
//      for (var i=0; i<tweets.length; i++){
//          console.log(tweets[i].text)
//      }
//      if(err){
//          console.log(err)
//      }
//  }
function timeRemainingElection(){
// One day Time in ms (milliseconds)
var one_day = 1000 * 60 * 60 * 24
var tweetStatus ='';
// To set present_dates to two variables
var present_date = new Date();
  
// 0-11 is Month in JavaScript
var election_day = new Date(2022, 5, 9)
  
// To Calculate next Hallalan if passed already.
// if (present_date.getMonth() == 5 && present_date.getdate() > 9)
//     election_day.setFullYear(election_day.getFullYear() + 6)
  
// To Calculate the result in milliseconds and then converting into days
var Result = Math.round(election_day.getTime() - present_date.getTime()) / (one_day);
  
// To remove the decimals from the (Result) resulting days value
var Final_Result = Result.toFixed(0);

tweetStatus="Number of days remaining till "+ election_day.getMonth() +"/"+election_day.getDate() + "/" + election_day.getFullYear() + " election is " 
+ Final_Result;
//To display the final_result value
console.log(tweetStatus);
return tweetStatus
            //    + present_date.getMonth() +" "+present_date.getDay() + ", " + present_date.getFullYear()  + "and " 
            //    + election_day + " is "

        }

function timeRemainingRegistration(){
    // One day Time in ms (milliseconds)
    var one_day = 1000 * 60 * 60 * 24
    var tweetStatus ='';
    // To set present_dates to two variables
    var present_date = new Date();
      
    // 0-11 is Month in JavaScript
    var registration_day = new Date(2021, 9, 30)
      
    // To Calculate next Hallalan if passed already.
    // if (present_date.getMonth() == 9 && present_date.getdate() > 30)
    //     election_day.setFullYear(election_day.getFullYear() + 6)
      
    // To Calculate the result in milliseconds and then converting into days
    var Result = Math.round(registration_day.getTime() - present_date.getTime()) / (one_day);
      
    // To remove the decimals from the (Result) resulting days value
    var Final_Result = Result.toFixed(0);
      
    //To display the final_result value
    tweetStatus="Number of days remaining till "+ registration_day.getMonth() +"/"+registration_day.getDate() + "/" + registration_day.getFullYear() + " Registration period for both overseas and local voters is" 
    + Final_Result;

    console.log(tweetStatus);
                //    + present_date.getMonth() +" "+present_date.getDay() + ", " + present_date.getFullYear()  + "and " 
                //    + election_day + " is "
    return tweetStatus
            }

//for posting Pubs
function choosePub(){
    //here is the list of pubs to choose from
}
 //for posting tweets
function tweetIt(tweetStatus){
    
    var tweet = {
        status: tweetStatus + ' #HalalanNatin'
    }

    T.post('statuses/update', tweet, function(err, data, response) {
        if(err){
            console.log(err)
        }
        console.log(data)
    })
}

//for following in twitter (deprecated)
// var stream = T.stream('user');
// stream.on('follow',followed);

// function followed(eventMsg) {
//     console.log("Follow event!");
//     var name = eventMsg.source.name;
//     var screenName = eventMsg.source.screen_name;
//     tweetIt('Mabuhay ka!'+'@' + screenName + "Boboto tayo! Atin ang halalan!")
// }

function cmndCntrl() {
    // timeRemainingRegistration();
    var timeToTweetRegistration = new Date();
    console.log(timeToTweetRegistration.getHours())
    if(timeToTweetRegistration.getHours() == "8")
        {
        tweetIt(timeRemainingRegistration());
        }
    if(timeToTweetRegistration.getHours() == "9")
        {
        tweetIt(timeRemainingRegistration());
        }
}
setInterval(cmndCntrl, 1000*60*60)

