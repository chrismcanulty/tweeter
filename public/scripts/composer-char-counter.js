
// document.getElementsByClassName("tweet-text");

// ensure document is loaded prior to running below code
$(document).ready(function() {
  const tweetBox = $('.tweet-text');
  // listen for user input in the form
  tweetBox[0].addEventListener("input", function() {
    // upon input, traverse up the tree to access parent --> define variable which is parent of tweetbox: parent()?
    const form = $(tweetBox[0]).parent();
    // then, locate the counter from within the parent --> variable above .counter?
    const counter = ((form.children('div')).children('.counter'));
    const maxChar = 140;
    // once located, modify value displayed by counter, decreasing by 1 for each input character
    let inputChars = tweetBox.val().length;
    // Running total of remaining characters: maxChar - inputChars
    let remChars = maxChar - inputChars;
    // Set remChars to the counter
    counter.val(remChars);
    if (remChars < 0) {
      $(counter).addClass('color-red');
    } else if (remChars >= 0) {
      $(counter).removeClass('color-red');
    }
  });
});
