const express = require('express');
console.log('start')
require('dotenv').config()
const app = express();
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
var b64='';

app.get('/', (req, res) => {
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

//for getting pub axios
function getPub(whichPub,callback){
    const urlPub=["https://res.cloudinary.com/halalanprompts/image/upload/v1620820538/Prompts/Schedule_bgr9g7.png", 
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_1_sfcfi4.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_2_l4exdr.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_3_quimqk.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_4_vcx2up.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623481996/Prompts/Importance_5_jraxos.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623484201/Prompts/Pub_1_Final_bfldeo.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623484201/Prompts/Pub_2_Final_en2cxq.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1623484201/Prompts/Pub_3_Final_l5wf40.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625150669/Prompts/Register_1_cgc62l.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625154052/Prompts/SpecialCase_2_szgokl.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625154391/Prompts/SpecialCase_3_a1qg9p.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625154450/Prompts/SpecialCase_4_ljnubn.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625154555/Prompts/SpecialCase_5_lfv4zk.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625156533/Prompts/Do_s_Don_ts_1_qxjvw7.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625157462/Prompts/Do_s_Don_ts_2_zph5gp.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625157888/Prompts/Do_s_Don_ts_3_vpllpk.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625157948/Prompts/Do_s_Don_ts_4_jxhbeg.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158006/Prompts/Do_s_Don_ts_5_doxzjb.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158133/Prompts/Do_s_Don_ts_6_ee8ttq.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158319/Prompts/Do_s_Don_ts_7_xdehe7.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158420/Prompts/Do_s_Don_ts_8_ygf2f9.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158545/Prompts/Do_s_Don_ts_9_ka8er7.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158652/Prompts/Do_s_Don_ts_10_i5cjb6.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158818/Prompts/Do_s_Don_ts_11_rlt509.png",
      "https://res.cloudinary.com/halalanprompts/image/upload/v1625158818/Prompts/Do_s_Don_ts_12_rlt509.png"
     ]
    axios({
        method: 'get',
        url: urlPub[whichPub],
        responseType: 'stream'
      }).then(function (response) {
        const stream = fs.createWriteStream("temp.png");
        response.data.pipe(stream);
        stream.on('close',()=>{
            choosePub(whichPub)
        })    
    });
}

//for posting Pubs
function choosePub(whichPub){
  try {
      //just put a randomizer number
      const alternateText=["ElectionSchedule","Importance of Voting 1", 
      "Importance of Voting 2", "Importance of Voting 3", 
      "Importance of Voting 4", "Importance of Voting 5", 
      "Qualifications of Voting 1","Qualifications of Voting 2"
      ,"Qualifications of Voting 3", "Steps on Voting", 
        "Special cases", "Special case 1", "Special case 2", "Special case 3",
        "Do's 1", "Do's 2", "Do's 3", "Do's 4", "Do's 5", "Do's 6", "Dont's 7", "Dont's 8",
        "Dont's 9", "Dont's 10", "Dont's 11", "Dont's 12"]
      const captions=['2022 Election schedule for the Philippines #HalalanNatin #Halalan2022',
                    'Bakit kailangan kong bumoto? Ang pagboto ay isa sa pinakamakapangyarihang karapatan na pinaghirapang makamit ng ating mga ninuno.',
                    'Sinong may sabing walang magagawa boto mo?',
                    'Ilang ba ang bumoto sa nakaraan na eleksyon?',
                    'Marami na ba ang nakapag rehistro para sa halalan 2022?',
                    'May pandemya ngayon, pwede kaya akong magparehistro nang hindi lumalabas ng bahay?',
                    'Kwalipikado ba ako maging botante?',
                    'Anung kailangan na dokumento para makarehistro?',
                    'Maging handa sa pag rerehistro!',
                    'Alamin ang mga hakbang sa pag rehistro!',
                    'Kasama ka ba sa mga espesyal na kaso?',
                    'Paano kung gusto mo mag palipat ng Registration Record?',
                    'Paano kung gusto mo mag pa reactivate ng Registration Record?',
                    'Paano kung nag palit ka ng pangalan?',
                    'Mga dapat gawin sa pagboto',
                    'Huwag basta basta maniwala sa iba, Magsaliksik!',
                    'Ito ang exam na ok lang may kodigo!',
                    'Boto para sa Pilipinas! Maigi ay palagi tayong ligtas',
                    'Mas kanais nais kapag malinis, upang siguradong pasok ang iyong boto',
                    "Kapwa Pilipino lang tayo nag nanais ng pagbabago, kung kaya't wag kang matakot mag tanong",
                    'Mga di dapat gawin sa pagboto',
                    'Sandalian lang ang pagboto, huwag gamitin ang iyong mobile phone sa presinto',
                    'May tamang araw at lugar ng pangangampanya',
                    'Huwag ipakita ang iyong balota at huwag kunan to ng litrato',
                    'Sa iyo yung pagboto, hindi sa kanila.',
                    'Ok lang mag undervote pero wag lang mag over vote'
                    ]  
    //   axios({
    //         method: 'get',
    //         url: urlPub[whichPub],
    //         responseType: 'stream'
    //       }).then(function (response) {
    //         response.data.pipe(fs.createWriteStream('temp.png'))
    //         });
            b64= fs.readFileSync('temp.png',{encoding:'base64'})
            T.post('media/upload', { media_data: b64 }, function (err, data, response) {
                // now we can assign alt text to the media, for use by screen readers and
                // other text-based presentations and interpreters
                var mediaIdStr = data.media_id_string
                var altText = alternateText[whichPub]
                var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
            
                T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    // now we can reference the media and post a tweet (media will attach to the tweet)
                    var params = { status: captions[whichPub] + ' Halina sa https://www.facebook.com/Uy-Boboto-Ka-Ba-108276488125329 para sa mga karagdagang impormasyon tungkol sa #Halalan2022 #HalalanNatin', media_ids: [mediaIdStr] }
            
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
    var whichPub=Math.floor(Math.random()*50);
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
    else if(whichPub<26)
        {
            getPub(whichPub)
            //try callback pub
        }
} 
res.send("success");    
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
//setInterval(cmndCntrl, 1000*60*60)

