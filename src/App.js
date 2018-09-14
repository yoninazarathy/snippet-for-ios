import React, { Component } from 'react';
import './App.css';

// full options list (defaults)
var md = require('markdown-it')({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});

var mk = require('markdown-it-katex');
md.use(mk);

//var snippetString = "Snippet string missing."
// var snippetImageURLstring = "https://es-app.com/snippet-assets/convertFractionToPercent.svg"
// var snippetTitle = "How can a fraction be converted to a percent?"

class SnippetBlock extends Component{
  constructor(props) {
    super(props);
    this.state = {
      snippetString: "Snippet string missing",
      snippetTitle: "Snippet title missing",
      snippetImageURL: "",
      snippetHTML: "<p>Snippet string (html) missing</p>"
    }
  }
  
  setSnippet(snip){
    this.setState(prevState => {
      return {
        snippetString: snip
      }
    })
    this.evalHTML()
  }

  setTitle(tit){
    this.setState(prevState => {
      return {
        snippetTitle: tit
      }
    })
    this.evalHTML()
  }

  setImage(im){
    this.setState(prevState => {
      return {
        snippetImageURL: im
      }
    })
    this.evalHTML()
  }

  setSnippetHTML(newHTML){
    this.setState(prevState => {
      return {
        snippetHTML: newHTML
      }
    })
  }

  evalHTML(){
    var modifiedMD = this.state.snippetString
    if(this.state.snippetImageURL !== ""){
      modifiedMD += '\n\r'
      modifiedMD += "[image1]:" + this.state.snippetImageURL
      console.log("got image")
    }

    console.log(modifiedMD)
    let ht = md.render(modifiedMD)
    this.setSnippetHTML(ht)
  }



  render(){
    return(
      <div>
        <header className="App-header">
          <h1 className="App-title">{this.state.snippetTitle}</h1>
        </header>
        <div className = "App-intro">
          <span dangerouslySetInnerHTML={{__html: this.state.snippetHTML}} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">

        <SnippetBlock ref={(x) => {window.mdBlock = x}}/>
      </div>
    );
  }
}

export default App;