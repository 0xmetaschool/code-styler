# AI CSS Styler

AI CSS Styler is a project that allows users to input HTML code, receive CSS styling suggestions, and see a live preview of the changes. This tool aims to make it easy for users to experiment with styling and instantly view the results. This tool was built using Next.js and OpenAI.

## Setup

### Prerequisites

- Node.js installed on your machine:
    - Make sure to use 18, you can do that using `use nvm 18`
- NPM (Node Package Manager) or Yarn
    - Run `npm --version` to check the version
- A web browser for live preview

### Installation

1. Clone the repository:
    
    ```bash
    git clone https://github.com/0xmetaschool/code-styler.git
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd code-styler
    ```
    
3. Install dependencies:
    
    ```bash
    npm install
    ```
    
4. Run the development server:
    
    ```bash
    npm run dev
    ```
    

### Configuration

1. Create a `.env` file in the root directory with the following environment variables:
    
    ```
    OPENAI_API_KEY=
    ```
    
2. Configure additional settings such as API keys for advanced AI functionalities (optional).

### Verification

To verify the setup:

1. Open the browser and go to `http://localhost:3000`.
2. Ensure the CSS Styler is loading and the live preview works as expected.

## Usage

### Basic Usage

Input your HTML code using the provided editor. AI CSS Styler will automatically suggest CSS styling changes. You can edit the CSS and see the changes in real time on the preview pane.

```html
<!-- Example HTML code -->
<div class="header">Hello World</div>
```

### API Integration

AI CSS Styler uses OpenAI's API to suggest CSS changes. Make sure you have the OpenAI API key set up in your environment variables.

## Features

- Live HTML and CSS editor with instant preview
- AI-powered CSS suggestions for styling
- Customizable layout and theme options
- Responsive design previews

## License

This project is licensed under the MIT License - see the [LICENSE file](https://choosealicense.com/licenses/mit/) for details.

## Contact

For support or queries, please join [our discord server](https://discord.gg/vbVMUwXWgc) and ask all relevant questions there.

---

## Examples and Use Case

### Basic Example

```html
<div class="box">Styled by AI</div>
```

The AI suggests adding the following CSS:

```css
.box {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}
```

### Advanced Use Case

Styling a responsive navigation bar:

```html
<nav class="navbar">Home | About | Contact</nav>
```

AI CSS Styler suggests this responsive CSS:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    text-align: center;
  }
}
```

### Edge Case Handling

Handling empty HTML elements or invalid CSS properties:

```html
<!-- Empty element -->
<div class="empty"></div>
```

```css
.empty {
  /* AI will suggest removing the empty class or adding a placeholder style */
}
```

## Feature Wishlist

- AI-generated media queries for responsive design
- Option to generate the HTML based on prompts
- Advanced customization options for AI-generated suggestions

We encourage community discussion and contributions to these potential features!
