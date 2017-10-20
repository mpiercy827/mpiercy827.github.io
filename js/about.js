var facts = [
  "I like programming, hiking, reading, basketball and old video games",
  "My eyes are two different colors",
  "My favorite video game is Donkey Kong Country",
  "I have a 4.5-pound, 3-legged teacup poodle named Mighty",
  "My favorite musical piece is Steve Reich's <a target='_blank' href='https://www.youtube.com/watch?v=plL2VDAoThU'>Electric Counterpoint</a>",
  "I've only ever lived in California: SoCal before college, Bay Area since",
  "I like to play Smash 4 and have competed in a tournament (I lost)",
  "After college, I spent a few months in India teaching science and filmmaking",
  "I don't watch much TV, but I like Game of Thrones, Dexter, and Spongebob",
  "My first dream career was to deliver pizza",
  "I once did Parkour for a few months",
  "I started programming in middle school to make a website for my video game flash movies.",
  "I read web comics daily. My favorites are <a target='_blank' href='http://www.smbc-comics.com/?id=3457'>SMBC</a> and <a target='_blank' href='http://theoatmeal.com/comics/universe_cat'>The Oatmeal</a>",
  "My favorite musical artsts are Common and Say Anything.",
  "I can (kinda) read, write and speak German, and am trying to pick up Spanish"
];

var index = Math.floor(Math.random() * facts.length);

function selectNext() {
  index = (index + 1) % facts.length;

  $('#facts p').fadeOut('fast', function() {
    $(this).html(facts[index]).fadeIn('fast');
  });
}

$(function () {
  selectNext();
});

var inter = setInterval(function() { selectNext(); }, 5000);
