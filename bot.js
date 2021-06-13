console.log('start')
require('dotenv').config()
const axios = require('axios');
const Twit = require('twit');
const cloudinary = require('./cloudinary');
const fs =require('fs');
const { type } = require('os');
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
    tweetStatus="Number of days remaining till "+ registration_day.getMonth() +"/"+registration_day.getDate() + "/" + registration_day.getFullYear() + " Registration period for both overseas and local voters is " 
    + Final_Result;

    console.log(tweetStatus);
                //    + present_date.getMonth() +" "+present_date.getDay() + ", " + present_date.getFullYear()  + "and " 
                //    + election_day + " is "
    return tweetStatus
            }

//for posting Pubs
function choosePub(whichPub){
  try {
      //just put a randomizer number
      const urlPub=["https://res.cloudinary.com/halalanprompts/image/upload/v1620820538/Prompts/Schedule_bgr9g7.png", 
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_1_sfcfi4.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_2_l4exdr.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_3_quimqk.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_4_vcx2up.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_5_jraxos.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623484201/Prompts/Pub_1_Final_bfldeo.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623484201/Prompts/Pub_2_Final_en2cxq.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623484201/Prompts/Pub_3_Final_l5wf40.png"

     ]
      const alternateText=["ElectionSchedule","Importance of Voting 1", "Importance of Voting 2", "Importance of Voting 3", "Importance of Voting 4", "Importance of Voting 5", "Qualifications of Voting 1","Qualifications of Voting 2"
      ,"Qualifications of Voting 3"]
      var captions=['2022 Election schedule for the Philippines #HalalanNatin #Halalan2022',
                    'Bakit kailangan kong bumoto? Ang pagboto ay isa sa pinakamakapangyarihang karapatan na pinaghirapang makamit ng ating mga ninuno.',
                    'Sinong may sabing walang magagawa boto mo?',
                    'Ilang ba ang bumoto sa nakaraan na eleksyon?',
                    'Marami na ba ang nakapag rehistro para sa halalan 2022?',
                    'May pandemya ngayon, pwede kaya akong magparehistro nang hindi lumalabas ng bahay?',
                    'Kwalipikado ba ako maging botante?',
                    'Anung kailangan na dokumento para makarehistro?',
                    'Maging handa sa pag rerehistro!']  
      caption=captions[whichPub] + " Halina sa https://www.facebook.com/Uy-Boboto-Ka-Ba-108276488125329 para sa mga karagdagang impormasyon tungkol sa #Halalan2022 #HalalanNatin"
      
      axios({
            method: 'get',
            url: urlPub[whichPub],
            responseType: 'stream'
          }).then(function (response) {
            response.data.pipe(fs.createWriteStream('temp.png'))
            });
        const b64= fs.readFileSync('temp.png',{encoding:'base64'})

        T.post('media/upload', { media_data: b64 }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        var altText = alternateText[whichPub]
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    
        T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: caption, media_ids: [mediaIdStr] }
    
            T.post('statuses/update', params, function (err, data, response) {console.log(data)})
        }
        else {
            console.log(err)
        }
            })
        })
    } catch (error){
        console.log(error)
    }
 
}

 //for posting tweets
function tweetIt(tweetStatus){
    
    var tweet = {
        status: tweetStatus + ' #HalalanNatin #Halalan2022'
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
    var whichPub=Math.floor(Math.random()*20);
    var timeToTweetRegistration = new Date();
    console.log("which pub?" + whichPub)
    console.log(timeToTweetRegistration.getHours())
    if(timeToTweetRegistration.getHours() == "8")
        {
            var registration_day = new Date(2021, 9, 30)
            if(timeToTweetRegistration <= registration_day)
            {
            console.log("i tweet registration")
            tweetIt(timeRemainingRegistration());
            }
        }
    else if(timeToTweetRegistration.getHours() == "9")
        {
        console.log("i tweet election")
        tweetIt(timeRemainingElection());
        }
    else if(whichPub<10)
        {
            choosePub(whichPub);
        }
}

setInterval(cmndCntrl, 1000*60*60)

