<h1 style="text-align:center">
  <img src="img/TaggerLogo2nd.png" alt="" style="max-width:80%;width:900px;display:inline-block">
</h1>

<h6>*Version 0.3.9*</h6>

<h3>Searching for relevance in piles of text was never this easy</h3>
<h3>No dependencies, no need for a special builder or framework or bundler</h3>
<h3>Only 8.57 K and only 2.4 K gziped (compression level 6)</h3>

A small and easy to use javascript library for finding keywords in small-medium amounts of text using the good 'ol td-idf and some other basic tricks. Works out of the box and can be configured to the core if the results aren't good enough.

Install:
>npm install tagger.js

You can start using the library within a few seconds or minutes.

<h2>Basic Usage</h2>
```html
<script src="../dist/tagger.min.js"></script>
<script type="text/javascript">
  let keywords = Tagger.invokeTagger(yourText, "Some more text", other text);
</script>
```
```javascript
  console.log(keywords);
  //---> ["FirstKeyword","SecondKeyword","etc"...]
```
That's pretty much it, now "keywords" is an array containing some keywords from the text
These can be used for server side indexing, detecting user interest and behavior patterns, creating summaries of text-blobs client-side and anything else you can think of.

<h2>Advanced configurations</h2>

If the out of the box function isn't quite doing it for you there are some easy things you can do to configure it in order to obtain better results:


```javascript
Tagger.configurations.trainingDocuments = ["Training documents. Go here, in an array", "as many as you want"];
```
>Default value is an empty array

Adding training documents, in certain situations, might help the algorithm find relevant and unique keywords better. This is not a guarrante but if you have some "examples" lying around and aren't lacking server bandwidth this is an easy way to make the algorithm perform much better.


```javascript
Tagger.configurations.separators = ["\n", "\t", ".", "|"];
```
>Default value is ["\n", "."]

Separators are used by the algorithm to separate unique blocks of text from the input. Currently the default is to separate every sentence marked by a . and/or every new body of text marked by newline. Depending on your language and the type of text you are parsing you may wish to chose other separators.


<h2>Filters</h2>

If the configurations object isn't doing it for you, you might tweaking the filters a bit:


```javascript
Tagger.filter.specificWords = ["", "this" , "a" , "in","those", "that", "where" , "are"];
```
>Default value ["", "this" , "a" , "in","those", "that", "where" , "are"]

These are specific words which you know hold no meaning and as such can eliminate them. This might greatly help improve result if the algorithm is getting stuck in common words like "the", "I", "and"... etc, or the equivalent of those for the language you are parsing.


```javascript
Tagger.filter.regex = /^[\-\+a-zA-Z]{0,40}$/;
```
>Default value /^[\-\+a-zA-Z]{0,40}$/

Regex check, words that don't match the [regex](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) are ignored. Default only accepts letters, plus sign and minus sign, to be honest I feel like a better job could be done with this one but I'm still chewing on the exact characters I should include. Also, it caps the length of words at 40 letters


```javascript
Tagger.filter.wordLength = 3;
```
>Default value 3

This is a number and it represents the minium size a word should have to be counted in-between the keywrods. The default value is 3 but playting with this one might yeld surpirsingly good results.


<h2>Very advanced configs</h2>

If nothing else if doing it for you there is one more filter and two more configurations you can tweak

```javascript
Tagger.filter.returnMethod = "importantOverall";
```
>Default value "longestInDocument"

This is the function based on which the important words are returned. The default function returns the most important words in each document and in the case of a tie the longest word wins.
Currently the only other option is "importantOverall" which bring the words in order of "importance rating" no matter the document. Bringing as many as there are documents and breaking ties using word length.


```javascript
Tagger.configurations.tfFunction = "importantOverall";
```
>Default raw

Options are: binary, inverse, logNormalization or raw

```javascript
Tagger.configurations.idfFunction = "importantOverall";
```
>Default idf

Options are: idf, unary, smooth, probabilistic

The default combination of algorithm is the bog standard:
>tf (raw) - idf

Other good options might be:

>logNormalization - smooth
>logNormalization - idf
>binary - probabilistic

At least, in my limited experience with the library. In the end, the best way to find out is through looking at samples and experimenting on them with various combinations. In the end trail and error often beat overthinking. If you've got the time for it.

If you're unsure what those algorithm's are check some documentation about [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) or check the [td-idf javascript library](https://git.cerebralab.com/george/td-idf) onto which this library is built.

##Is it not working yet ?

In this case I'd consider this issue worthy. If you have the time and patience please present me with your configurations and the samples you tested it on by posting and issue or sending me and email over at: george.hosu@protonmail.com or george.h.personal@gmail.com

##Can I help development ?

Though this library is pretty basic Its still unfinished and I'd love new ideas for how I can improve it. If you wish to help me develop the library feel free to clone it and look through the comments. If you have any improvements or features that you can add feel free to make your own branch and make a pull request when you feel its completed.
