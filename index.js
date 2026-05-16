import fs from 'fs';
import antlr4 from 'antlr4';
import LenguajeLexer from './generated/LenguajeLexer.js';
import LenguajeParser from './generated/LenguajeParser.js';
import TraductorVisitor from './TraductorVisitor.js';

function main() {
    let input;
    try {
        // Leemos el archivo input.txt
        input = fs.readFileSync('input_correcto_1.txt', 'utf8');
    } catch (err) {
        console.error("No se encontró el archivo input.txt");
        return;
    }

    let chars = new antlr4.InputStream(input);
    let lexer = new LenguajeLexer(chars);
    let tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();

    console.log("=================================================");
    console.log("          TABLA DE LEXEMAS Y TOKENS              ");
    console.log("=================================================");
    tokens.tokens.forEach(t => {
        if (t.type !== -1) {
            let tokenName = LenguajeParser.symbolicNames[t.type] || LenguajeParser.literalNames[t.type] || "DESCONOCIDO";
            let text = t.text.replace(/\r?\n/g, "\\n");
            console.log(`${text}\t\t|\t${tokenName}`);
        }
    });

    let parser = new LenguajeParser(tokens);
    let tree = parser.programa();

    if (parser.syntaxErrorsCount > 0) {
        console.error("\n❌ ERROR LÉXICO/SINTÁCTICO: Se encontraron errores en el archivo.");
        console.error("Fijate en los mensajes de arriba para ver la línea y la causa del problema.");
        return; // Corta la ejecución para no traducir código roto
    } else {
        console.log("\n✅ ANÁLISIS EXITOSO: No se encontraron errores léxicos ni sintácticos. La entrada es CORRECTA.");
    }
    console.log("\n=================================================");
    console.log("       ÁRBOL SINTÁCTICO (FORMATO TEXTO)          ");
    console.log("=================================================");
    
    console.log(tree.toStringTree(parser.ruleNames, parser));
    console.log("\n=================================================");
    console.log("         CÓDIGO TRADUCIDO A JAVASCRIPT           ");
    console.log("=================================================");
    
    const visitor = new TraductorVisitor();
    const codigoJS = visitor.visit(tree);
    console.log(codigoJS);

    console.log("\n=================================================");
    console.log("              EJECUCIÓN DEL INTÉRPRETE           ");
    console.log("=================================================");
    
    // Truco: Simulamos el 'prompt' del navegador para que Node no explote
    global.prompt = (mensaje) => {
        console.log(`[Prompt Interactivo]: ${mensaje}`);
        return '"Santi"'; // Valor simulado que ingresa el usuario
    };

    // Evaluamos el código traducido sacando el nombre de la función dinámicamente del árbol
    const nombreFuncion = tree.funcion()[0].ID().getText();
    eval(codigoJS + `\n\n${nombreFuncion}();`);
    console.log("\n¡Ejecución finalizada!");
}

main();