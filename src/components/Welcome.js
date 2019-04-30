import React from 'react';
import Footer from './Footer';
import developer_done from '../images/developer_done.jpeg'
import bugs from '../images/bugs.jpeg';

function Welcome() {
    return (
        <div id='welcome'>
            <div id='main-container'>
                <h1>Welcome!</h1>
                <br />
                <p>
                    This is a real cool Video Meme Generator web app aka <b>'Vintage Meme Machine'</b>.
                </p>
                <br />
                <div id='welcome-img'>
                    <img
                        src={developer_done}
                        alt='developer done'
                    />
                </div>
                <p>
                    <b>How to use:</b>
                    <ol>
                        <li>Go to Create Meme tab</li>
                        <li>Select an already existing .json file downloaded previously to set the parameters or start fresh</li>
                        <li>Select custom video from your computer or paste video URL</li>
                        <li>Pause video and preview the meme image</li>
                        <li>Make changes to the image as needed</li>
                        <li>Share the meme image on Facebook and/or download meme</li>
                        <li>Save the changes in .json file for later use if required</li>
                    </ol>
                </p>
                <br />
                <div id='welcome-img'>
                    <img
                        src={bugs}
                        alt='bugs'
                        width='300px'
                    />
                </div>
                <p>
                    <b>Basic things that you can do:</b>
                    <ul>
                        <li>Pick a point in the video</li>
                        <li>Enter text that is placed over the video still</li>
                        <li>Save your personalized content for later use as .json file</li>
                    </ul>
                </p>
                <br />
                <p>
                    <b>Some other stuff that you can also do:</b>
                    <ul>
                        <li>Provide a custom video from your computer or paste video URL</li>
                        <li>Download your created meme as an image</li>
                        <li>Add fancy text effects to the text overlay</li>
                        <li>Push the resulting meme to Facebook</li>
                    </ul>
                </p>
                <br />
                <p id='last-para'>
                    So 1, 2, 3, 4.... Declare a Meme war!!!
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Welcome;