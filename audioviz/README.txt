Neon Audio Visualizer​
By: DineshaS14
A responsive, neon-themed audio visualizer built with HTML5, CSS3, and vanilla JavaScript. It leverages the Web Audio API to create dynamic visualizations of audio files, featuring interactive elements like customizable waveforms and animated particle effects.​

Features
Audio Playback: Supports uploading and playing local audio files.
Real-Time Visualizations: Displays frequency bars that react to the audio in real-time.
Customizable Waveforms: Offers multiple visualization styles, including bars, sine waves, and mirrored spectrums.
Interactive Particle Effects: Clicking outside the canvas triggers colorful, animated particles resembling fireworks.
Responsive Design: Adapts seamlessly to various screen sizes, ensuring usability on desktops, tablets, and mobile devices.

Usage
Upload an Audio File: Click on the file input to select an audio file from your device.
Play the Audio: Use the audio controls to play, pause, or stop the audio.
Select Visualization Style: Choose between bars, sine waves, or mirrored spectrums using the dropdown menu.
Interact with the Canvas: Click outside the canvas area to trigger colorful, animated particle effects.​

Technologies Used
HTML5: Structure and layout.
CSS3: Styling and responsive design.
JavaScript (ES6): Functionality and interactivity.
Web Audio API: Audio processing and analysis

Visualization Details
Audio Analysis
The visualizer uses the Web Audio API's AnalyserNode to extract frequency data from the audio source. This data is then used to render visual representations on the canvas.​

Visualization Styles
Bars: Displays vertical bars representing the amplitude of different frequency bands.
Sine Wave: Renders a continuous waveform that reflects the audio's time-domain data.
Mirrored Spectrum: Shows symmetrical bars extending from the center, creating a mirrored effect

Particle Effects
Clicking outside the canvas area generates multiple particles with random RGB colors and varying sizes. These particles animate outward, simulating a fireworks-like effect, and fade out after a short duration.​

Responsive Design
The visualizer is designed to be fully responsive, ensuring optimal display and functionality across various devices and screen sizes.​

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your enhancements.

Acknowledgments
This project utilizes the Web Audio API for audio processing and visualization. For more information on the Web Audio API, refer to the https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API