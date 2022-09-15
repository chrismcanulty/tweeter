/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const TimeAgo = require("javascript-time-ago")

// // Load locale-specific relative date/time formatting rules.
// import en from 'javascript-time-ago/locale/en';

// Add locale-specific relative date/time formatting rules.
// addLocale(en)

// Create relative date/time formatter.
// const timeAgo = new TimeAgo('en-US')

$(document).ready(function() {


// const presetTweets = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const createTweetElement = (tweet) => {
  let $tweet =
     $(`
    <article>
    <header>
      <div><img src=${tweet.user.avatars}/> ${tweet.user.name}</div>
      <span>${tweet.user.handle}</span>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <div>${tweet.created_at}</div>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  `);
  // console.log("$tweet", $tweet);
  return $tweet;
}


const renderTweets = function(tweets) {
  const $container = $('.tweets');
  $container.empty();
  // clear container here
  for (const element of tweets) {
    const $tweetElement = createTweetElement(element);
    $container.prepend($tweetElement);
  }
}

// renderTweets(presetTweets);

const $form = $('.form-inline');

$form.submit((event) => {
  event.preventDefault();
  const serializedData = $form.serialize();
  console.log("serializedData", serializedData);
  $.post('/tweets', serializedData, (response) => {
    console.log("response", response);
    loadTweets();
  })
});

const loadTweets = () => {
  const $container = $('.tweets');
  $.ajax({
  url: '/tweets',
  type: 'GET',
  success: (data) => {
    $container.empty();
    renderTweets(data);
    // for (const tweet of data) {
    //   const $tweet = renderTweets(tweet);
    //   $container.prepend($tweet);
    // }
    }
  }
)};

loadTweets();


});
