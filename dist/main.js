/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/scanf/index.js":
/*!*************************************!*\
  !*** ./node_modules/scanf/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/scanf */ \"./node_modules/scanf/lib/scanf.js\");\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/scanf/index.js?");

/***/ }),

/***/ "./node_modules/scanf/lib/gets.js":
/*!****************************************!*\
  !*** ./node_modules/scanf/lib/gets.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n * http://stackoverflow.com/questions/3430939/node-js-readsync-from-stdin\n * @mklement0\n */\nvar fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar BUFSIZE = 256;\nvar buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);\nvar bytesRead;\n\nmodule.exports = function() {\n  var fd =\n    'win32' === process.platform\n      ? process.stdin.fd\n      : fs.openSync('/dev/stdin', 'rs');\n  bytesRead = 0;\n\n  try {\n    bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);\n  } catch (e) {\n    if (e.code === 'EAGAIN') {\n      // 'resource temporarily unavailable'\n      // Happens on OS X 10.8.3 (not Windows 7!), if there's no\n      // stdin input - typically when invoking a script without any\n      // input (for interactive stdin input).\n      // If you were to just continue, you'd create a tight loop.\n      console.error('ERROR: interactive stdin input not supported.');\n      process.exit(1);\n    } else if (e.code === 'EOF') {\n      // Happens on Windows 7, but not OS X 10.8.3:\n      // simply signals the end of *piped* stdin input.\n      return '';\n    }\n    throw e; // unexpected exception\n  }\n\n  if (bytesRead === 0) {\n    // No more stdin input available.\n    // OS X 10.8.3: regardless of input method, this is how the end\n    //   of input is signaled.\n    // Windows 7: this is how the end of input is signaled for\n    //   *interactive* stdin input.\n    return '';\n  }\n  // Process the chunk read.\n\n  var content = buf.toString(undefined, 0, bytesRead - 1);\n\n  return content;\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/scanf/lib/gets.js?");

/***/ }),

/***/ "./node_modules/scanf/lib/scanf.js":
/*!*****************************************!*\
  !*** ./node_modules/scanf/lib/scanf.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var utils = __webpack_require__(/*! ./utils */ \"./node_modules/scanf/lib/utils.js\");\nvar gets = __webpack_require__(/*! ./gets */ \"./node_modules/scanf/lib/gets.js\");\n\nvar input = '';\nvar stdin_flag = true;\n\nexports[\"throw\"] = true;\n\nvar scanf = (module.exports = function(format) {\n  var re = new RegExp('[^%]*%[0-9]*[A-Za-z][^%]*', 'g');\n  var selector = format.match(re);\n\n  if (selector === null) {\n    throw new Error('Unable to parse scanf selector.');\n  }\n\n  var result,\n    len = selector.length;\n  var json_flag = false,\n    count = 0,\n    keys = Array.prototype.slice.call(arguments, 1);\n\n  if (!this.sscanf) {\n    // clear sscanf cache\n    if (!stdin_flag) input = '';\n    stdin_flag = true;\n  }\n\n  if (keys.length > 0) {\n    result = {};\n    json_flag = true;\n  } else if (len > 1) {\n    result = [];\n  } else {\n    return dealType(selector[0]);\n  }\n\n  selector.forEach(function(val) {\n    if (json_flag) {\n      result[keys.shift() || count++] = dealType(val);\n    } else {\n      result.push(dealType(val));\n    }\n  });\n\n  return result;\n});\n\nmodule.exports.sscanf = function(str, format) {\n  if (typeof str !== 'string' || !str.length) {\n    return null;\n  }\n\n  // clear scanf cache\n  if (stdin_flag) input = '';\n\n  input = str;\n  stdin_flag = false;\n\n  return scanf.apply(\n    { sscanf: true },\n    Array.prototype.slice.call(arguments, 1)\n  );\n};\n\nvar getInput = function(pre, next, match, type) {\n  var result;\n  if (!input.length || input === '\\r') {\n    if (stdin_flag) {\n      input = gets();\n    } else {\n      return null;\n    }\n  }\n\n  // match format\n  var replace = '(' + match + ')';\n  var tmp = input;\n\n  // while scan string, replace before and after\n  if (type === 'STR' && next.trim().length > 0) {\n    var before_macth = utils.regslashes(pre);\n    var after_match = utils.regslashes(next) + '[\\\\w\\\\W]*';\n    if (before_macth.length) {\n      tmp = tmp.replace(new RegExp(before_macth), '');\n    }\n    tmp = tmp.replace(new RegExp(after_match), '');\n  } else {\n    replace = utils.regslashes(pre) + replace;\n  }\n\n  var m = tmp.match(new RegExp(replace));\n\n  if (!m) {\n    // todo strip match\n    return null;\n  }\n  result = m[1];\n\n  // strip match content\n  input = input\n    .substr(input.indexOf(result))\n    .replace(result, '')\n    .replace(next, '');\n\n  if (type === 'HEXFLOAT') {\n    return m;\n  }\n  return result;\n};\n\nvar getInteger = function(pre, next) {\n  var text = getInput(pre, next, '[-]?[A-Za-z0-9]+');\n  if (!text) {\n    return null;\n  }\n  if (text.length > 2) {\n    if (text[0] === '0') {\n      if (text[1].toLowerCase() === 'x') {\n        try {\n          return utils.hex2int(text);\n        }\n        catch(e) {\n          if(exports.throw) return NaN\n\n          return null\n        }\n      }\n      // parse Integer (%d %ld %u %lu %llu) should be precise for octal\n      if (text[1].toLowerCase() === 'o') {\n        try {\n          return utils.octal2int(text);\n        }\n        catch(e) {\n          if(exports.throw) return NaN\n\n          return null\n        }\n      }\n    }\n  }\n  return parseInt(text);\n};\n\nvar getFloat = function(pre, next) {\n  var text = getInput(pre, next, '[-]?[0-9]+[.]?[0-9]*');\n  return parseFloat(text);\n};\n\nvar getHexFloat = function(pre, next) {\n  var hfParams = getInput(\n    pre,\n    next,\n    '^([+-]?)0x([0-9a-f]*)(.[0-9a-f]*)?(p[+-]?[0-9a-f]+)?',\n    'HEXFLOAT'\n  );\n  var sign = hfParams[2];\n  var sint = hfParams[3];\n  var spoint = hfParams[4];\n  var sexp = hfParams[5] || 'p0';\n  // We glue the integer and point parts together when parsing\n  var integer = parseInt(\n    sign + sint + (spoint !== undefined ? spoint.slice(1) : ''),\n    16\n  );\n  // The actual exponent is the specified exponent minus the de..heximal points we shifted away\n  var exponent =\n    parseInt(sexp.slice(1), 16) -\n    4 * (spoint !== undefined ? spoint.length - 1 : 0);\n  return integer * Math.pow(2, exponent);\n};\n\nvar getHex = function(pre, next) {\n  var text = getInput(pre, next, '[A-Za-z0-9]+');\n  try {\n    return utils.hex2int(text);\n  }\n  catch(e) {\n    if(exports.throw) return NaN\n\n    return null\n  }\n};\n\nvar getOctal = function(pre, next) {\n  var text = getInput(pre, next, '[A-Za-z0-9]+');\n  try {\n    return utils.octal2int(text);\n  }\n  catch(e) {\n    if(exports.throw) return NaN\n\n    return null\n  }\n};\n\nvar getString = function(pre, next) {\n  var text = getInput(\n    pre,\n    next,\n    // Match repeat string\n    '(' +\n    '[\\\\w\\\\]=-]' +\n    '|' +\n    '\\\\S+[^\\\\ ]' + // Match string witch \\SPC like 'Alan\\ Bob'\n      ')' +\n      // Match after\n      '+(\\\\\\\\[\\\\w\\\\ ][\\\\w\\\\:]*)*',\n    'STR'\n  );\n  if (/\\\\/.test(text)) text = utils.stripslashes(text);\n  return text;\n};\n\nvar getLine = function(pre, next) {\n  var text = getInput(pre, next, '[^\\n\\r]*');\n  if (/\\\\/.test(text)) text = utils.stripslashes(text);\n  return text;\n};\n\nvar dealType = function(format) {\n  var ret;\n  var res = format.match(/%(0[1-9]+)?[A-Za-z]+/);\n  var res2 = format.match(/[^%]*/);\n  if (!res) {\n    // DID NOT throw error here to stay compatible with old version\n    console.warn('Invalid scanf selector: [%s]', format);\n    return null;\n  }\n\n  var type = res[0].replace(res[1], '');\n  var pre = !!res2 ? res2[0] : null;\n  var next = format.substr(format.indexOf(type) + type.length);\n\n  switch (type) {\n    case '%d':\n    case '%ld':\n    case '%llu':\n    case '%lu':\n    case '%u':\n      ret = getInteger(pre, next);\n      break;\n    case '%c': // TODO getChar\n    case '%s':\n      ret = getString(pre, next);\n      break;\n    case '%S':\n      ret = getLine(pre, next);\n      break;\n    case '%X':\n    case '%x':\n      ret = getHex(pre, next);\n      break;\n    case '%O':\n    case '%o':\n      ret = getOctal(pre, next);\n      break;\n    case '%a':\n      ret = getHexFloat(pre, next);\n      break;\n    case '%f':\n      ret = getFloat(pre, next);\n      break;\n\n    default:\n      throw new Error('Unknown type \"' + type + '\"');\n  }\n  return ret;\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/scanf/lib/scanf.js?");

/***/ }),

/***/ "./node_modules/scanf/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/scanf/lib/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("var ASCII = {\n  a: 'a'.charCodeAt(),\n  f: 'f'.charCodeAt(),\n  A: 'A'.charCodeAt(),\n  F: 'F'.charCodeAt(),\n  0: '0'.charCodeAt(),\n  7: '7'.charCodeAt(),\n  9: '9'.charCodeAt()\n};\n\nexports.hex2int = function(str) {\n  str = str.replace(/^[0Oo][Xx]/, '');\n  var ret = 0,\n    digit = 0;\n\n  for (var i = str.length - 1; i >= 0; i--) {\n    ret += intAtHex(str[i], digit++);\n  }\n\n  return ret;\n};\n\nvar intAtHex = function(c, digit) {\n  var ret = null;\n  var ascii = c.charCodeAt();\n\n  if (ASCII.a <= ascii && ascii <= ASCII.f) {\n    ret = ascii - ASCII.a + 10;\n  } else if (ASCII.A <= ascii && ascii <= ASCII.F) {\n    ret = ascii - ASCII.A + 10;\n  } else if (ASCII[0] <= ascii && ascii <= ASCII[9]) {\n    ret = ascii - ASCII[0];\n  } else {\n    throw new Error('Invalid ascii [' + c + ']');\n  }\n\n  while (digit--) {\n    ret *= 16;\n  }\n  return ret;\n};\n\nexports.octal2int = function(str) {\n  str = str.replace(/^0[Oo]?/, '');\n  var ret = 0,\n    digit = 0;\n\n  for (var i = str.length - 1; i >= 0; i--) {\n    ret += intAtOctal(str[i], digit++);\n  }\n\n  return ret;\n};\n\nvar intAtOctal = function(c, digit) {\n  var num = null;\n  var ascii = c.charCodeAt();\n\n  if (ascii >= ASCII[0] && ascii <= ASCII[7]) {\n    num = ascii - ASCII[0];\n  } else {\n    throw new Error('Invalid char to Octal [' + c + ']');\n  }\n\n  while (digit--) {\n    num *= 8;\n  }\n  return num;\n};\n\nexports.regslashes = function(pre) {\n  return pre\n    .replace(/\\[/g, '\\\\[')\n    .replace(/\\]/g, '\\\\]')\n    .replace(/\\(/g, '\\\\(')\n    .replace(/\\)/g, '\\\\)')\n    .replace(/\\|/g, '\\\\|');\n};\n\nexports.stripslashes = function(str) {\n  return str.replace(/\\\\([\\sA-Za-z\\\\]|[0-7]{1,3})/g, function(str, c) {\n    switch (c) {\n      case '\\\\':\n        return '\\\\';\n      case '0':\n        return '\\u0000';\n      default:\n        if (/^\\w$/.test(c)) {\n          return getSpecialChar(c);\n        } else if (/^\\s$/.test(c)) {\n          return c;\n        } else if (/([0-7]{1,3})/.test(c)) {\n          return getASCIIChar(c);\n        }\n        return str;\n    }\n  });\n};\n\nvar getASCIIChar = function(str) {\n  var num = exports.octal2int(str);\n  return String.fromCharCode(num);\n};\n\nvar getSpecialChar = function(letter) {\n  switch (letter.toLowerCase()) {\n    case 'b':\n      return '\\b';\n    case 'f':\n      return '\\f';\n    case 'n':\n      return '\\n';\n    case 'r':\n      return '\\r';\n    case 't':\n      return '\\t';\n    case 'v':\n      return '\\v';\n    default:\n      return letter;\n  }\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/scanf/lib/utils.js?");

/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst app_1 = __webpack_require__(/*! ./src/app */ \"./src/app.ts\");\nconst maquina_service_1 = __webpack_require__(/*! ./src/app/application/services/maquina.service */ \"./src/app/application/services/maquina.service.ts\");\nconst producto_service_1 = __webpack_require__(/*! ./src/app/application/services/producto.service */ \"./src/app/application/services/producto.service.ts\");\nconst menu_1 = __webpack_require__(/*! ./src/app/ui/console/menu */ \"./src/app/ui/console/menu.ts\");\nconst uiConsole_1 = __webpack_require__(/*! ./src/app/ui/console/uiConsole */ \"./src/app/ui/console/uiConsole.ts\");\nconst console = new app_1.Application(new uiConsole_1.UiConsole(new menu_1.Menu(), new producto_service_1.ProductoService(), new maquina_service_1.MaquinaService(new producto_service_1.ProductoService())));\nconsole.start();\n\n\n//# sourceURL=webpack://my-webpack-project/./main.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Application = void 0;\nclass Application {\n    constructor(uiMachine) {\n        this.uiMachine = uiMachine;\n    }\n    start() {\n        console.log(\"ok ok\");\n    }\n}\nexports.Application = Application;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app.ts?");

/***/ }),

/***/ "./src/app/application/services/maquina.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/application/services/maquina.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MaquinaService = void 0;\nclass MaquinaService {\n    constructor(product) {\n        this.product = product;\n    }\n    insertMoney(money) {\n        return 0 > money;\n    }\n    buy(product, amount) {\n        if (product) {\n            this.product.subtractAmount(product.id, amount);\n            return true;\n        }\n        return false;\n    }\n    change(money, price, amount) {\n        if (money !== 0 && price !== undefined && amount !== 0) {\n            return money - price * amount;\n        }\n        return -1;\n    }\n    checkAmount(producto, cantidad) {\n        const stock = producto.cantidad - cantidad;\n        if (stock > 0) {\n            return true;\n        }\n        return false;\n    }\n}\nexports.MaquinaService = MaquinaService;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app/application/services/maquina.service.ts?");

/***/ }),

/***/ "./src/app/application/services/producto.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/application/services/producto.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ProductoService = void 0;\nconst productos_1 = __webpack_require__(/*! ../../common/constants/productos */ \"./src/app/common/constants/productos.ts\");\nclass ProductoService {\n    constructor() {\n        this.products = productos_1.cProductos;\n    }\n    readProduct() {\n        return this.products;\n    }\n    getProduct(id) {\n        if (id !== null)\n            this.product = this.readProduct().find((p) => {\n                return p.id === id;\n            });\n        return this.product;\n    }\n    subtractAmount(id, cantidad) {\n        const producto = this.getProduct(id);\n        if (producto === undefined) {\n            return false;\n        }\n        let cantidadS = producto.cantidad;\n        cantidadS = cantidadS - cantidad;\n        if (cantidadS <= 0) {\n            return false;\n        }\n        producto.cantidad = cantidadS;\n        return true;\n    }\n}\nexports.ProductoService = ProductoService;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app/application/services/producto.service.ts?");

/***/ }),

/***/ "./src/app/common/constants/menu.ts":
/*!******************************************!*\
  !*** ./src/app/common/constants/menu.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.cMenu = void 0;\nexports.cMenu = [\n    { id: 1, nombre: \"Ver Productos\" },\n    { id: 2, nombre: \"Seleccionar\" },\n    { id: 3, nombre: \"Ingresar Billete\" },\n    { id: 4, nombre: \"Salir\" },\n];\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app/common/constants/menu.ts?");

/***/ }),

/***/ "./src/app/common/constants/productos.ts":
/*!***********************************************!*\
  !*** ./src/app/common/constants/productos.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.cProductos = void 0;\nexports.cProductos = [\n    { id: 1, nombre: \"Pera\", precio: 150, cantidad: 20 },\n    { id: 2, nombre: \"Manzana\", precio: 200, cantidad: 20 },\n    { id: 3, nombre: \"Mango\", precio: 250, cantidad: 20 },\n    { id: 4, nombre: \"Naranja\", precio: 300, cantidad: 20 },\n    { id: 5, nombre: \"Piña\", precio: 350, cantidad: 20 },\n    { id: 6, nombre: \"Banano\", precio: 100, cantidad: 20 },\n];\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app/common/constants/productos.ts?");

/***/ }),

/***/ "./src/app/ui/console/menu.ts":
/*!************************************!*\
  !*** ./src/app/ui/console/menu.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Menu = void 0;\nconst menu_1 = __webpack_require__(/*! ../../common/constants/menu */ \"./src/app/common/constants/menu.ts\");\nclass Menu {\n    showMenu() {\n        menu_1.cMenu.forEach(({ id, nombre }) => {\n            console.log(`\\n${id}). ${nombre}\\n`);\n        });\n    }\n}\nexports.Menu = Menu;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app/ui/console/menu.ts?");

/***/ }),

/***/ "./src/app/ui/console/uiConsole.ts":
/*!*****************************************!*\
  !*** ./src/app/ui/console/uiConsole.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UiConsole = void 0;\nvar scanf = __webpack_require__(/*! scanf */ \"./node_modules/scanf/index.js\");\nclass UiConsole {\n    constructor(menu, productS, maquina) {\n        this.menu = menu;\n        this.productS = productS;\n        this.maquina = maquina;\n    }\n    machine() {\n        this.menu.showMenu();\n        console.log(\"Seleccione una opcion: \");\n        var option = scanf(\"%d\");\n        while (option !== 4) {\n            switch (option) {\n                case 1: {\n                    this.showMenu();\n                    break;\n                }\n                case 2: {\n                    this.getProduct();\n                    break;\n                }\n                case 3: {\n                    this.buyPresses();\n                    break;\n                }\n                default: {\n                    console.log(\"Opción no valida\");\n                    break;\n                }\n            }\n            this.menu.showMenu();\n            console.log(\"Seleccione una opcion: \");\n            var option = scanf(\"%d\");\n        }\n    }\n    showMenu() {\n        console.log(\"----- Lista de Productos -----\");\n        this.productS.readProduct().forEach(({ id, nombre, precio, cantidad }) => {\n            console.log(`${id} - ${nombre} - $${precio} - ${cantidad}`);\n        });\n        console.log(\"------------------------------\");\n    }\n    getProduct() {\n        console.log(\"Seleccione un producto: \");\n        this.id = scanf(\"%d\");\n        this.product = this.productS.getProduct(this.id);\n    }\n    buyPresses() {\n        var _a;\n        console.log(\"Ingrese el dinero: \");\n        this.money = scanf(\"%d\");\n        console.log(\"Ingrese la cantidad: \");\n        this.cantidad = scanf(\"%d\");\n        let change = this.maquina.change(this.money, (_a = this.product) === null || _a === void 0 ? void 0 : _a.precio, this.cantidad);\n        if (this.maquina.insertMoney(change)) {\n            console.log(\"\\nDinero Insuficiente!\\n\");\n            return;\n        }\n        if (this.maquina.checkAmount(this.product, this.cantidad)) {\n            this.maquina.buy(this.product, this.cantidad);\n            console.log(\"\\n\");\n            console.log(\"Producto: \" + this.product.nombre);\n            console.log(\"Precio: $\" + this.product.precio);\n            console.log(\"Cantidad: $\" + this.cantidad);\n            console.log(\"Efectivo: $\" + this.money);\n            console.log(\"Vuelto: $\" + change);\n            console.log(\"\\n\");\n            console.log(\"Gracias por su compra!\");\n            console.log(\"\\n\");\n        }\n        else {\n            return console.log(\"Cantidad insuficiente\");\n        }\n    }\n}\nexports.UiConsole = UiConsole;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app/ui/console/uiConsole.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ })()
;