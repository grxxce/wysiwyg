// LEXER: Tokenize the input string into meaningful units
type TokenType = 'BULLET_POINT' | 'ENUMERATION' | 'NEWLINE' | 'TEXT';

class Token {
    type: TokenType;
    value: string;

    constructor(type: TokenType, value: string) {
        this.type = type;
        this.value = value;
    }
}

function lexer(input: string): Token[] {
    const tokens: Token[] = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        if (char === '•') {
            tokens.push(new Token('BULLET_POINT', char));
            current++;
            continue;
        }

        const NUMBERS = /\d/;
        if (NUMBERS.test(char)) {
            let value = '';

            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            if (char === ')') {
                tokens.push(new Token('ENUMERATION', value));
                current++;
                continue;
            }
        }

        if (char === '\n') {
            tokens.push(new Token('NEWLINE', char));
            current++;
            continue;
        }

        let text = '';
        while (char && char !== '\n' && char !== '•' && !NUMBERS.test(char)) {
            text += char;
            char = input[++current];
        }

        if (text) {
            tokens.push(new Token('TEXT', text));
        }
    }

    return tokens;
}

// PARSER: Create a simple AST
type BulletPointNode = {
    type: 'BulletPoint';
    value: string;
};

type EnumerationNode = {
    type: 'Enumeration';
    number: string;
    value: string;
};

type TextNode = {
    type: 'Text';
    value: string;
};


type ASTNode = BulletPointNode | EnumerationNode | TextNode;

function parser(tokens: Token[]): { type: 'Root'; body: ASTNode[] } {
    let current = 0;

    function walk(): ASTNode | null {
        let token = tokens[current];

        if (!token) return null;

        // Skip NEWLINE tokens
        if (token.type === 'NEWLINE') {
            current++;
            return null; // Skip processing and move to the next token
        }

        
        if (token.type === 'BULLET_POINT') {
            current++;
            const textToken = tokens[current];
            current++;
            return {
                type: 'BulletPoint',
                value: textToken.value.trim(),
            };
        }
        
        if (token.type === 'ENUMERATION') {
            current++;
            const number = token.value;
            const textToken = tokens[current];
            current++;
            return {
                type: 'Enumeration',
                number,
                value: textToken.value.trim(),
            };
        }
        if (token.type === 'TEXT') {
            current++;
            return {
                type: 'Text',
                value: token.value.trim(),
            };
        }

        throw new TypeError(`Unknown token type: ${token.type}`);
    }

    const ast: { type: 'Root'; body: ASTNode[] } = {
        type: 'Root',
        body: [],
    };

    while (current < tokens.length) {
        const node = walk();
        if (node) {
            ast.body.push(node);
        }
    }

    return ast;
}


// CONVERT: AST to LaTeX with required formatting
function transformAstToLatex(ast: { type: 'Root'; body: ASTNode[] }): string {
    return ast.body.map(node => {
        switch (node.type) {
            case 'BulletPoint':
                return `\\textbullet{} ${node.value} \\\\`;
            case 'Enumeration':
                return `\\begin{enumerate}\n\\setcounter{enumi}{${parseInt(node.number) - 1}}\n\\item ${node.value}\n\\end{enumerate}`;
            case 'Text':
                return node.value;
            default:
                return '';
        }
    }).join('\n');
}

// Usage Example
const input = "• this is text\n(1) this is enumeration\n";
const tokens = lexer(input);
const ast = parser(tokens);
const latexContent = transformAstToLatex(ast);

// In latexParser.js
export function parseLatexContent(input: string): string {
    const tokens = lexer(input);
    const ast = parser(tokens);
    return transformAstToLatex(ast);
}