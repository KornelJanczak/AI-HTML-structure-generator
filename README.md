# AI HTML structure generator

## Application Description

The application is a tool for generating HTML articles based on input text. It uses AI services to process the text and generate an HTML structure according to specified guidelines. The application consists of two main services:
- `AIService`: Responsible for communicating with the AI model and generating HTML content.
- `FileService`: Responsible for reading and writing files, including managing file locks to prevent simultaneous access.

### Main Features:
    1. Reading a text file containing the article content.
    2. Sending the file content to the AI service to generate an HTML structure.
    3. Saving the generated HTML structure to a file.

## Installation Instructions

### Step 1: Clone the Repository

To install the application, first clone the repository from GitHub:
```sh
git clone https://github.com/KornelJanczak/OXIDO-task.git
```

### Step 2: Install Dependencies

```sh
npm install
```

### Step 3: Configure Environment
Create a .env file in the root directory of the project and add the following environment variables:
```sh
ARTICLE_TXT_FILE_PATH="../../article-content.txt"
ARTICLE_HTML_FILE_PATH="../../article.html"
OPENAI_API_KEY=your_openai_api_key
```

### Step 4: Compile TypeScript 
Compile the TypeScript code to JavaScript:
```sh
npm run build
```

### Step 5: Run the Application
Run the application:
```sh
npm start
```

## Usage
After running the application, the input TXT file specified in the ```ARTICLE_TXT_FILE_PATH``` variable will be read, and its content will be processed by the AI service. The generated HTML structure will be saved to the file specified in the ```ARTICLE_HTML_FILE_PATH``` variable.

## Requirements
 - Node.js
 - npm

## License

[MIT](https://choosealicense.com/licenses/mit/)
