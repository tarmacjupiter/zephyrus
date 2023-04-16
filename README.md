# Zephyrus App

[https://project-zephyrus.netlify.app](https://project-zephyrus.netlify.app)

[https://project-zephyrus.tech](https://project-zephyrus.tech)

Zephyrus is an app that helps you decide what to wear for the day. It takes a prompt from the user through a dropdown menu and then uses a geolocation API to communicate with the Whisper Chat GPT API to generate recommendations. Additionally, the app has an option to show a picture.

The app is named after the Greek god Zephyrus, who was the god of the west wind. We chose this name because 
the west wind controlled the weather, and this app is designed to help people dress appropriately for the weather.

## How to Use

1. Select your prompt from the dropdown menu.
2. Click on "Generate Recommendation" to receive your recommendation.
3. If you want to see a picture related to the recommendation, click on the "Show Picture" button.

## File Details

- *Dropdown.js* - This component creates a dropdown menu that allows the user to select their prompt.
- *Footer.js* - This component creates the footer of the app and displays relevant information.
- *Header.js* - This component creates the header of the app and displays the app's name.
- *Instructions.js* - This component displays instructions on how to use the app.
- *App.js* - This is the main component of the app. It communicates with the geolocation API and the Whisper Chat GPT API to generate recommendations based on the user's prompt. It also displays the recommendations and the option to show a picture.

Thank you for using Zephyrus!
