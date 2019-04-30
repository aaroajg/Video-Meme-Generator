import React, { Component } from "react";
import injectSheet from "react-jss";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {toggleTitleColor} from '../store';

import Footer from './Footer';

/*global FB*/

const styles = theme => ({
  '@global body': {
    background: 'black',
    color: 'black'
  },
  FromVideo: {
    background: '#DCDCDC',
    margin: '30px 150px 30px 150px',
    padding: '10px 30px 50px 30px',
    '&  h1': {
      fontSize: '5rem',
      textAlign: 'center',
      fontFamily: 'serif',
      cursor: 'pointer'
    },
    '& input': {
      margin: '10px'
    },
    '& a': {
      color: theme.palette.text,
    }
  },
  'title-primary': {
    color: theme.palette.primary
  },
  'title-secondary': {
    color: theme.palette.secondary
  },
  
});

const stp = (state) => ({
  titleColor: state.memeState.titleColor
})

const dtp = (dispatch) => bindActionCreators( {
  toggleTitleColor: () => toggleTitleColor()
}, dispatch)

let jsonObject = {};
let jsonData;

class FromVideo extends Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      imgSrc: '',
      videoSrc: '',
      color: 'black',
      isHexColor: 'no',
      size: '40',
      savedData: '',
      fileName: '',
      loadJson: 'No'
    }
  }

  // Facebook credentials initialization
  componentDidMount = () => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '326623944710486',
        xfbml      : true,
        version    : 'v2.5',
        oauth: true,
        appSecret: '71c2e384e497d6d18b13bf7ea49ff6d8',
      });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Function to upload .json and video files
  handleFileUpload = (event) => { 
    document.getElementById('generate-meme').style.display = 'block';
    const name = event.target.files[0].name;
    let file = event.target.files[0];
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);

    if(ext === 'json') {
      this.loadFile();
    }

    else {
      document.getElementById('container').style.display = 'block';
      let fileURL = URL.createObjectURL(file);
      let videoNode = document.querySelector('video');
      videoNode.src = fileURL;
      this.setState({
        videoSrc: fileURL
      });
    }
  }

  // Function to load and parse JSON file
  loadFile = () => {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      var newArr = JSON.parse(lines); 
      jsonData = newArr;
    }
  }

  // Function to handle preview meme button click
  handlePreviewMeme = () => {
    jsonData && 
    this.setState({
      topText: jsonData.topText,
      bottomText: jsonData.bottomText,
      color: jsonData.color,
      size: jsonData.size,
      isHexColor: jsonData.isHexColor
    });
    document.getElementById('display-hidden-image').style.display = 'block';
    document.getElementById('meme-props').style.display = 'block';
    document.getElementById('hidden-buttons').style.display = 'flex';
    document.getElementById('hidden-buttons').style.justifyContent = 'space-around';
    
    jsonData ? this.draw('jsonData', jsonData) : this.draw('', '');
  }

  // Function to handle change to state variables
  handleChange = (event) => {
    let prop = event.target.name;
    let value = event.target.value;
    let type = event.target.type;
    this.setState({
      [prop]: value
    });

    if(prop === 'loadJson' && value === 'Yes')
      document.getElementById('json-file-select').style.display = 'block';
    else if(prop === 'loadJson' && value === 'No') {
      jsonObject = {};
      document.getElementById('json-file-select').style.display = 'none';
    }
    
    if(prop === 'color' && type === 'radio') {
      document.getElementById('input-text-color').style.display = 'none';
      this.setState({
        isHexColor: 'no'
      });
    }

    if(prop === 'isHexColor') {
      document.getElementById('input-text-color').style.display = 'inline';
      this.setState({
        isHexColor: 'yes',
        color: ''
      });
    }

    this.draw(prop, value);
  }

  // Function to load video from URL pasted
  handleLoadVideoFromURL = () => {
    document.getElementById('container').style.display = 'block';
    document.getElementById('generate-meme').style.display = 'block';
    let videoNode = document.querySelector('video');
    videoNode.src = this.state.videoSrc;
  }

  // Function to handle SAVE personalizations / DOWNLOAD meme image after providing names for the files
  handlePrompt = (event) => {
    let fileName = prompt('Save file as?');
    let dataStr = '';
    const { color, topText, bottomText, size, isHexColor } = this.state;

    if(event.target.id === 'download-span')
      fileName = fileName.concat('.png');
    else if(event.target.id === 'save-span') {
      fileName = fileName.concat('.json');

      jsonObject = {};
      jsonObject.color = color;
      jsonObject.size = size;
      jsonObject.topText = topText;
      jsonObject.bottomText = bottomText;
      jsonObject.isHexColor = isHexColor;

      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
    }

    this.setState({
      fileName: fileName,
      savedData: dataStr
    });
  }

  // Function to create image from video using HTML Canvas
  draw = (prop, value) => {
    let { color, topText, bottomText } = this.state;
    let size = this.state.size + 'px Arial';

    if(prop === 'jsonData') {
      color = jsonData.color;
      topText = jsonData.topText;
      bottomText = jsonData.bottomText;
      size = jsonData.size + 'px Arial';
    }
    else if(prop === 'color')
      color = value;
    else if(prop === 'size')
      size = value + 'px Arial';
    else if(prop === 'topText')
      topText = value;
    else if(prop === 'bottomText')
      bottomText = value;

    let video = document.getElementById('my_video');
    let thecanvas = document.getElementById('thecanvas');
    let img = document.getElementById('thumbnail_img');

    thecanvas.height = 450;
    thecanvas.width = 600;

    let context = thecanvas.getContext('2d');
    context.drawImage( video, 0, 0, thecanvas.width, thecanvas.height);
    context.font = 'Bold ' + size;
    context.textAlign = 'center'; 

    if(color === 'black')
      context.strokeStyle = 'white';
    else
      context.strokeStyle = 'black';
      
    context.lineWidth = 3;
    context.strokeText(topText, thecanvas.width/2, 60);
    context.strokeText(bottomText, thecanvas.width/2, 400);
    context.fillStyle = color;
    context.fillText(topText, thecanvas.width/2, 60);
    context.fillText(bottomText, thecanvas.width/2, 400);

    let dataURL = thecanvas.toDataURL("image/png");
    img.setAttribute('src', dataURL);

    this.setState({
      imgSrc: dataURL
    });
  }

  // Function to upload meme image on Facebook once logged in ** (Image URL is hardcoded for the time-being) **
  uploadPhoto = () => {
    FB.login(function(response) {
      if (response.status === 'connected') {
        FB.ui(
          {
            method: 'share',
            href: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/mouse.jpg', // ** Should be replaced by URL of image uploaded on server **
          },
          // callback
          function(response) {
            if (response && !response.error_message) {
              alert('Posting completed.');
            } else {
              alert('Error while posting.');
            }
          }
        );
      } else if (response.status === 'not_authorized') {
        alert('You are not authorized to perform this action.')
      } else {
        alert('Error occured. Try again later.')
      }
    }, {scope: 'user_photos, manage_pages, publish_pages'});
  }

  // Render lifecycle method
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.FromVideo}>
          <main id='top'>
                <div id='video-options'>
                  <label>
                    <b>Do you want to load from existing json file? </b>
                    <br />
                    <input 
                      type='radio'
                      value='Yes'
                      name='loadJson'
                      checked={this.state.loadJson === 'Yes'}
                      onChange={this.handleChange}
                    /> Yes
                    <input 
                      type='radio'
                      value='No'
                      name='loadJson'
                      checked={this.state.loadJson === 'No'}
                      onChange={this.handleChange}
                    /> No
                  </label>
                  <br />
                  <label id='json-file-select'>
                    <b>Select json file to apply saved settings:</b>
                    <input type="file" name="video" accept=".json" id='fileinput' onChange={this.handleFileUpload}/>
                  </label>
                  <br />
                  <label>
                    <b>Select custom video file from your computer: </b>
                    <input type="file" name="video" accept="video/*" id='fileinput' onChange={this.handleFileUpload}/>
                  </label>
                  <br />
                  ( OR )
                  <br />
                  <label>
                    <b>Paste video URL: </b>
                    <input type="text" name="videoSrc" placeholder='https://' onChange={this.handleChange} />
                    <a href='#container'><button type='submit' value='Load Video' onClick={this.handleLoadVideoFromURL}>Load Video</button></a>
                  </label>
                </div>
                <br />
                <div id='container'>
                  <video
                    id="my_video"
                    width="800"
                    height="450"
                    crossOrigin="anonymous"
                    playsInline                  
                    autoPlay
                    muted
                    loop
                    controls
                  >
                    <source
                      src={this.state.videoSrc}
                    />
                  </video>
                </div>
                <br />
                <br />
                <div id='generate-meme'>
                <p>Pause Video to select frame for meme</p>
                <a id='generate-meme-btn' href='#display-hidden-image'><button id='gen-btn' type="submit" value="Generate Meme" onClick={this.handlePreviewMeme}><span>Preview Meme</span></button></a>
                </div>
                  <br />
                  <hr />

                  <div className='display-hidden'>
                    <p>The Canvas</p>
                    <br />
                    <canvas id="thecanvas">
                    </canvas>
                  </div>

                  <br />
                  
                  <div id='display-hidden-image'>
                    <br />
                    <img id="thumbnail_img" alt="Right click to save" />
                    <br />
                  </div>

                  <br />

                  <div id='meme-props'>
                  <label>
                    Meme text top:
                    <input type="text" name='topText' value = {this.state.topText} placeholder="Something edgy..." onChange={this.handleChange} />
                  </label>

                  <label>
                    Meme text bottom:
                    <input type="text" name='bottomText' value = {this.state.bottomText} placeholder="Something edgy..." onChange={this.handleChange} />
                  </label>

                  <div>
                    <label>
                      Choose your color:
                      <input 
                        type='radio' 
                        name='color'
                        className='text-color' 
                        value='black' 
                        checked={this.state.color === 'black'}
                        onChange={this.handleChange}
                      /> Black

                      <input 
                        type='radio' 
                        name='color'
                        className='text-color' 
                        value='white' 
                        checked={this.state.color === 'white'}
                        onChange={this.handleChange}
                      /> White

                      <input 
                        type='radio' 
                        name='color'
                        className='text-color' 
                        value='blue' 
                        checked={this.state.color === 'blue'}
                        onChange={this.handleChange}
                      /> Blue

                      <input 
                        type='radio' 
                        name='color'
                        className='text-color' 
                        value='red' 
                        checked={this.state.color === 'red'}
                        onChange={this.handleChange}
                      /> Red

                      <input 
                        type='radio' 
                        name='isHexColor'
                        value='yes'
                        className='text-color' 
                        checked={this.state.isHexColor === 'yes'}
                        onChange={this.handleChange}
                      /> Custom (hex value)

                      <input 
                        type='text' 
                        id='input-text-color'
                        name='color'
                        placeholder='#000000'
                        value={this.state.color}
                        className='text-color' 
                        onChange={this.handleChange}
                      />
                    </label>
                  </div>

                  <label>
                    Font Size (in px):
                    <input type="number" name='size' value = {this.state.size} placeholder=" default is 30px" onChange={this.handleChange} />
                  </label>
                </div>

                <div id='hidden-buttons'>
                  <div><a href='#container'><button id='top-btn'><span>Change Video Frame</span></button></a></div>
                  <div><a href={this.state.imgSrc} download={this.state.fileName} ><button id='download-btn' name='download' onClick={this.handlePrompt}><span id='download-span'>Download</span></button></a></div>
                  <div><a href={this.state.savedData} download={this.state.fileName}><button id='save-btn' name='save' onClick={this.handlePrompt}><span id='save-span'>Save changes for later use</span></button></a></div>
                  <div><button id='upload-btn' onClick={this.uploadPhoto}><span>Upload on Facebook</span></button></div>
                </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(stp,dtp)(injectSheet(styles)(FromVideo));