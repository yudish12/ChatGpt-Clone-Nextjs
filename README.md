# Getting Started

First, Clone the git repository in your vscode<br/>

Second, Run command in the folder which have package.json file(make sure you have installed nodejs and npm)

```
npm install
```

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Descriptoin and Tech Stack

I have used the following technologies and api's for this project
1)Nextjs fullstack framework based on reactjs<br/>
2)supabase an postgres database with auth service and etc<br/>
3)Shadcn ui library and tailwind CSS <br/>
4)Cohere api for gpt response api url -> https://api.cohere.ai/v1/chat<br/>

In this project I have tried to clone the functionality of ChatGPT as close as I can get with the free tier api<br/>

I have used the supabase auth and database to store chats prompts and user's session etc so that I can create a <br/>
protected ai chatting or prompting system where the ai will response to your queries

## Features
1)Authentication system for loggin in and signing up<br/>
2)create and delete a chat with the timestamp of it's creation<br/>
3)Ask Prompts to ai regarding anything and it will reply based on previous history
4)Light mode and dark mode available for AI chat screen

## Video