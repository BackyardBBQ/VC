# VC
The files listed are the working code files.
Ensure you download the files to a location you can find.
Inside the new VC folder you will find a folder called blankGame. Duplicate this folder and rename it something you want. Keep it in the VC folder until you have completed and built it.

This will be your new game folder. When asked to find your game location in the app, point to this folder. Any saves you make to the files from within the app need you to point to the corresponding files in this folder. The app tells you this and does its best to find them for you. However Apple have this whole security thing where they want user to pick folders themselves.

NB: the Venture Creator requires npm to be installed so you can use the app. To build your finished game you will require yarn too.
    To install npm, navigate to the VC folder in the "Terminal" window. ("cd VC" normally takes you into this folder if you have installed just         under your username. Now type "npm install npm@latest -g" to install npm. 
    Next type "npm init" to initialise npm.
    Now type "npm install electron --save-dev" which installs the electron app.
    Now "npm install --save xml2json" which allows for the app to use json.
    
   Ok, now you should be ready to run the app. Normally I would have grouped the neccessary npm stuff with the download but the size was too big for github.
    
   Type "npm start" inside the VC folder to run the app. Boom!
   
There instructions relating to each section in the app.

When you have completed writing your game you will find the Build game to stand alone, section. Press the Build game button and the program will try and build the game for you, by installing yarn and the electron builder before building the game. If this does not work there are manual instructions in that screen.

The xml files contain all the game objects, rooms, people, conversations etc. Feel free to look but use the VC to edit them because the wrong entry could mess the game up. Spells anfd events are in the src folder as they are js scripts. Again use the editor for fear of entering the wrong thing.
The js files run the game and by editing these in the game folder you can change the game even more than you would by using the editor. I just could not think of everything you might want to meddle with.

I hope you enjoy.

