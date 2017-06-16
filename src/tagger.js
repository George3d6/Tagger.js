//Configuration objects for the td-idf library
const configurations = require("tf-idf.js").configurations;
//main function of the td-idf library which brings back a word importance Map
const makeImportanceMap = require("tf-idf.js").makeImportanceMap;

//Filter setting to exclude certain words from the map
//speficiWords -> exclude specific words (takes and array of strings)
//regex -> Exclude words which don't match regex
//wordLength -> Exclude words bellow specified length
//returnMethod -> Words are returned base on two methods:
//longest in document (if two words are as important in a doucment, pick the longest)
//"importantOverall" returns the most important words overall, no matter the document
//Default is set to "longestInDocument"
let filter = {
    specificWords : ["", "this" , "a" , "in",
  "those", "that", "where" , "are"],
    regex : /^[\-\+a-zA-Z]{0,40}$/,
    wordLength : 3,
    returnMethod : "longestInDocument",
}

// Call the algorithm
// Give as arguments the documents it should look for keywords in
// Return an array of keywords/tags/relevant words
function invokeTagger (...documents) {

  let importanceMaps = makeImportanceMap(...documents);

  if(filter.returnMethod === "longestInDocument") {
    return longestWords(importanceMaps);
  } else if (filter.returnMethod === "importantOverall") {
    return mostImportantWord(importanceMaps);
  } else {
      console.error("returnMethod isn't set to one of the correct options");
      console.error("Returning longest words in each document as a default fallback");
      return longestWords(importanceMaps);
  }
}

//Internal function used to filter a word based on the first three parameters of filter
//return true if word should be used and false if it shouldn't
function filterNonWord(word) {
  let accept = true;
  filter.specificWords.forEach((unaccWord)=>{
    if (word === unaccWord) {
      accept = false;
    }
  });
  if( filter.regex.test(word) && accept &&  word.length > filter.wordLength)
  { return true } else { return false }
}

//Return one word per document from the importance maps
//If two words are as important in a doucment, pick the longest
function longestWords(importanceMaps) {
  let tags = [];
  importanceMaps.forEach((m)=>{
    let mostImpWord = "";
    let highestImportance = 0;
    m.forEach((importance, word)=>{
      if(filterNonWord(word)) {
        if(importance > highestImportance) {
          highestImportance = importance;
          mostImpWord = word;
        } else if (importance === highestImportance) {
          if(mostImpWord.length < word.length) {
            mostImpWord = word;
          }
        }
      }
    });
    if(mostImpWord != "") {
      tags.push(mostImpWord);
    }
  });
  return tags;
}

//Return as many words as there are documents from the importance maps
//Chose the most important words, no matter the document
//If there are ties they will be decided using the length of the two words
function mostImportantWord(importanceMaps) {
  let tags = [];
  for(let i = 0; i < importanceMaps.length; ++i) {
    let mostImpWord = "";
    let highestImportance = 0;
    let mapChosenFrom = null;
    importanceMaps.forEach((m)=>{
      m.forEach((importance, word)=>{
        if(filterNonWord(word)) {
          if(importance > highestImportance) {
            mapChosenFrom = m;
            highestImportance = importance;
            mostImpWord = word;
          } else if (importance === highestImportance) {
            if(mostImpWord.length < word.length) {
              mostImpWord = word;
              mapChosenFrom = m;
            }
          }
        }
      });
    });
    mapChosenFrom.delete(mostImpWord);
    tags.push(mostImpWord);
  }
  return tags;
}


//Accessible via Tagger.[name] once the module is built with webacpk and the tagger.min.js is included in the html
//All other implementation is private
module.exports = {
  configurations : configurations,
  makeImportanceMap : makeImportanceMap,
  invokeTagger : invokeTagger,
  filter : filter
}
