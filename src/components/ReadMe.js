import React from 'react';

function ReadMe() {
    return (
        <div>
            <section id='main-container'>
                <h2>Devtest Readme</h2>
                <p>
                    Hello candidate, Welcome to our little dev test. The goal of
                    this exercise, is to asses your general skill level, and give
                    us something to talk about at our next appointment.
                </p>
                <section>
                    <h3>What this app should do</h3>
                    <p>
                    We'd like for you to build a tiny app called the "Vintage Meme
                    Machine". It will be a tool that allows users to overlay text
                    on a video, and capture or share it.
                    </p>
                    <p>These are the basic requirements:</p>
                    <ul>
                    <li>User can pick a point in the video</li>
                    <li>
                        User can enter text that is placed over the video <em>still</em>
                    </li>
                    <li>
                        User can save this personalized content for later use
                    </li>
                    </ul>
                </section>
                <section>
                    <h3>What we want you to do</h3>
                    <p>
                    Off course we don't expect you to build a full fledged app
                    in such a short time frame.
                    </p>
                    <p>
                    But we would like for you to get in the basic requirements,
                    in one form or another. Beyond that feel free to show off
                    your strenghts as a frontend developer.
                    </p>
                    <p>Some ideas:</p>
                    <ul>
                    <li>Make it look really nice</li>
                    <li>Allow users to provide a custom video</li>
                    <li>Download the meme as an image file</li>
                    <li>Add fancy text effects to the text overlay</li>
                    <li>Push the resulting meme to a social media API</li>
                    </ul>
                </section>
                <section>
                    <p>
                    P.s. We've already added some libraries to make your life
                    easier (Redux, Jss, React Router), but feel free to add
                    more.
                    </p>
                </section>
            </section>
        </div>
    );
}

export default ReadMe;