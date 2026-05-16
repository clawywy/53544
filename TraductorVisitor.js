import LenguajeVisitor from './generated/LenguajeVisitor.js';

export default class TraductorVisitor extends LenguajeVisitor {
    
    // Une todas las funciones traducidas del programa
    visitPrograma(ctx) {
        return ctx.funcion().map(f => this.visit(f)).join('\n\n');
    }

    // Traduce: funcion nombre() { ... }
    visitFuncion(ctx) {
        const id = ctx.ID().getText();
        const params = ctx.parametros() ? ctx.parametros().getText() : "";
        const instrucciones = ctx.instrucciones().map(i => this.visit(i)).join('\n');
        
        return `function ${id}(${params}) {\n${instrucciones}\n}`;
    }

    visitInstrucciones(ctx) {
        return this.visitChildren(ctx)[0];
    }

   // Traduce: leer(nombre); -> var nombre = prompt("...");
    visitLeer(ctx) {
        const id = ctx.ID().getText();
        return `  var ${id} = prompt("Ingrese valor:");`;
    }

    // Traduce: escribir("Hola"); -> console.log("Hola");
    visitEscribir(ctx) {
        const expr = this.visit(ctx.expresion());
        return `  console.log(${expr});`;
    }

    // Traduce: X = 10; -> var X = 10;
    visitAsignacion(ctx) {
        const id = ctx.ID().getText();
        const expr = this.visit(ctx.expresion());
        return `  var ${id} = ${expr};`;
    }

    // Traduce las expresiones y sumas
    visitExpresion(ctx) {
        // Si es una concatenación (ej: "Tu nombre es: " + nombre)
        if (ctx.getChildCount() === 3) {
            const izq = this.visit(ctx.expresion(0));
            const der = this.visit(ctx.expresion(1));
            return `${izq} + ${der}`;
        }
        // Si es solo texto, ID o número, lo devuelve tal cual
        return ctx.getText();
    }
}