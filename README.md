# Web-Based LaTeX Editor

A dynamic, web-based LaTeX editor designed for creating and editing complex mathematical and scientific documents. This editor integrates a powerful LaTeX processing engine with an intuitive user interface, making it easy to write, edit, and visualize LaTeX content in real-time.

## Features

- **Real-Time LaTeX Editing**: Instantly visualize the formatted output as you type LaTeX content.
- **MathQuill Integration**: Utilizes MathQuill for smooth and interactive mathematical formula input.
- **Dynamic Field Addition**: Easily add new mathematical expressions or text fields on the fly.
- **Custom LaTeX Parsing**: Includes a custom-built lexer and parser for handling specific LaTeX patterns.
- **Downloadable Content**: Export your LaTeX content as `.tex` files with a simple click.

## Getting Started

### Dependencies

- React.js and Next.js for front-end development.
- Node.js for backend operations.

### Installing

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/latex-editor.git
```

Navigate to the project directory and install dependencies:

```bash
cd staks-web
npm install
```

### Executing Program

Run the application in development mode:

```bash
npm run dev
```

The app should now be running on `http://localhost:3000/editor`.

## Usage

Navigate through the web interface to create and edit LaTeX documents. Use the toolbar to switch between different editing modes (text, math, code) and utilize the MathQuill field for interactive formula input. The editor supports custom LaTeX commands, and you can download your work as a `.tex` file. <br>

Below is a video turtorial of STaX: <br>
https://youtu.be/Cq94UmxMses?si=YMyy781y-MvzG_2g

## Contributing

Contributions to enhance the functionality or efficiency of the LaTeX editor are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Authors

- Grace Li - [graceli@college.harvard.edu](mailto:graceli@college.harvard.edu)
- Ivy Liang - [iliang@college.harvard.edu](mailto:iliang@college.harvard.edu)

## Version History

- 0.2
  - Added custom LaTeX parsing functionality.
  - Improved MathQuill integration.
- 0.1
  - Initial Release

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the creators of MathQuill for their excellent mathematical input tool.
- Inspired by LaTeX, the high-quality typesetting system.