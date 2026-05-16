# Analizador Sintáctico y Traductor Dinámico (ANTLR4 + Node.js)

Este proyecto consiste en un analizador léxico, sintáctico y traductor automático desarrollado en JavaScript sobre la plataforma Node.js utilizando ANTLR4, diseñado bajo las especificaciones gramaticales requeridas por la cátedra.

##  Requisitos Previos
- Tener instalado **Node.js** en el sistema (versión v18 o superior recomendada).

##  Instalación de Dependencias
1. Descargue o clone este repositorio en su máquina local.
2. Abra una terminal (consola) ubicada exactamente en la carpeta raíz de este proyecto.
3. Ejecute el siguiente comando para instalar las librerías necesarias de ANTLR4:
npm install
##  Archivos de prueba
Para facilitar la corrección, se incluyen los cuatro archivos de texto solicitados:
* `input_correcto_1.txt` e `input_correcto_2.txt`: Contienen código fuente válido (reconocimiento correcto).
* `input_incorrecto_1.txt` e `input_incorrecto_2.txt`: Contienen código con errores forzados (reconocimiento incorrecto).

**Para probar distintos archivos:** Por defecto, el analizador lee `input_correcto_1.txt`. Si desea probar los demás ejemplos, por favor modifique el nombre del archivo en la línea donde se ubica la función `fs.readFileSync` dentro de `index.js`.no se olvide de guardar el index.js antes de ejecutar.
##  Ejecucion
Para ejecutar el programa se debe escribir en la terminal lo siguiente:
node index.js

Al ejecutarse, el programa realiza automáticamente las siguientes tareas en la terminal:
Validación Léxica/Sintáctica: Informa explícitamente si la entrada es correcta o si contiene errores (indicando línea y causa).
Tabla de Lexemas y Tokens: Muestra la lista de cada lexema reconocido con su token literal.
Árbol Sintáctico (Texto): Representa el árbol de análisis concreto en formato LISP (paréntesis estructurados).
Código Traducido e Interpretación: Muestra la traducción limpia a JavaScript y la ejecuta dinámicamente en la consola.