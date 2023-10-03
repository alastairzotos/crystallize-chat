# Crystalk

A simple chat app using React + Typescript + NodeJS + Vite

### Running

After pulling the repo run `yarn` in the root directory and then `yarn dev`

Then open http://127.0.0.1:5173/ in two or more tabs and have a talk with yourself!

### Technical notes

This uses websockets to do the chats. We can make multiple channels/rooms by simply creating multiple sockets, rather than having a more complex system of one socket managing all the channels.

I used [antd](https://ant.design/) and styled-components for styling the frontend to make a minimalist but quite nice look.

I tried out [DiceBear](https://www.dicebear.com/) for creating dynamic avatars and it's very easy and fun.

I also thought it would be fun to support emojis so I used [smile2emoji](https://www.npmjs.com/package/smile2emoji) so you can write "Hi : )" and get "Hi 😀"

State is managed using Zustand.

