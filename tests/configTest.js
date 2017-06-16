const textValidate = `    In information systems, a tag is a non-hierarchical keyword or term assigned to a piece of information (such as an Internet bookmark, digital image, or computer file). This kind of metadata helps describe an item and allows it to be found again by browsing or searching. Tags are generally chosen informally and personally by the item's creator or by its viewer, depending on the system.
Tagging was popularized by websites associated with Web 2.0 and is an important feature of many Web 2.0 services. It is now also part of some desktop software.`;

const Tagger = require('../tagger.js');

Tagger.filter.wordLength = 4;
Tagger.configurations.tfFunction = "inverse";
Tagger.configurations.idfFunction = "probabilistic";

let tags = Tagger.invokeTagger(textValidate);
let expected = ["information", "searching", "informally", "popularized", "important", "services", "software"];

assertTest1 = true;
if(tags.length != expected.length) {
  assertTest1 = false;
}
for(let i = 0; i < tags.length; ++i) {
  if(tags[i] != expected[i]) {
    assertTest1 = false;
  }
}

if(!assertTest1){
  console.log("Tests failed");
  console.log("Tags resulted were: ", tags);
  console.log("Tags expected were", expected);
  console.log("Tests failed");
} else {
  console.log("Tests have passed");
}
