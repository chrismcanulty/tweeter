/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ensure page elements exist prior to execution of client.js code
$(document).ready(function() {

  const createTweetElement = (tweet) => {
  // define variable to format date created for each tweet
    const ago = timeago.format(tweet.created_at);
    // define and escape function to prevent contents of tweet form being used to hack our app
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    // define tweet structure for new tweets based on user input
    let $tweet =
      $(`
      <article>
      <header>
        <div><img src=${tweet.user.avatars}/> ${tweet.user.name}</div>
        <span>${tweet.user.handle}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <div>${ago}</div>
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </article>
    `);
    return $tweet;
  };

  // define function that empties tweet container, then prepends created tweets (most recent first)
  const renderTweets = function(tweets) {
    const $container = $('.tweets');
    $container.empty();
    for (const element of tweets) {
      const $tweetElement = createTweetElement(element);
      $container.prepend($tweetElement);
    }
  };

  const $form = $('.form-inline');
  const $text = $('.tweet-text');

  // create event handler for form submission that throws errors if tweet content is invalid or loads tweets if valid
  $form.submit((event) => {
    // prevent default behaviour of brower, i.e. prevent page from refreshing when form submitted
    event.preventDefault();
    // serialize data submitted via form (payload) so our app can read it
    const serializedData = $form.serialize();
    // conditional to throw error if form is blank, including if user submits one or more spaces only
    const $trimText = $.trim($text.val());
    if ($trimText === "") {
      const $elem = $('#err1');
      // Slow slidedown feature if error is thrown
      $elem.slideDown("slow");
      return;
    }

    // conditional to throw error if char limit exceeded
    const $maxChar = 140;
    const $tweetChars = $text.val();
    if ($tweetChars.length > $maxChar) {
      const $elem = $('#err2');
      $elem.slideDown("slow");
      return;
    }
    //otherwise post and load tweets
    $.post('/tweets', serializedData, (response) => {
      const $error1 = $('#err1');
      const $error2 = $('#err2');
      $error1.slideUp();
      $error2.slideUp();
      loadTweets();
    });
  });

  // function to load new tweets that have been submitted via Ajax GET request
  const loadTweets = () => {
    const $container = $('.tweets');
    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: (data) => {
        $container.empty();
        renderTweets(data);
      }
    }
    );
  };

  // call the load tweets function
  loadTweets();
});
