/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//import * as d3 from 'd3v4' // hard import\n\nvar diameter = 840,\n    format = d3.format(\",d\"),\n    color = {\"Tdark\":\"#3792EC\", \"Tbio\":\"#389732\", \"Tchem\":\"#F0F37F\"}; // create a duct if cikirubg\n    //d3.scaleOrdinal(d3.schemeCategory20c) // original coloring\n\nvar bubble = d3.pack()\n    .size([diameter, diameter])\n    .padding(1.5);\n\nvar svg = d3.select(\"#bubble_viz\").append(\"svg:svg\")\n    .attr(\"width\", diameter)\n    .attr(\"height\", diameter)\n    .attr(\"class\", \"bubble\");\n\nd3.json(\"viz.json\", function(error, data) {\n  if (error) throw error;\n\n  var root = d3.hierarchy(classes(data))\n      .sum(function(d) { return d.value; })\n      .sort(function(a, b) { return b.value - a.value; });\n\n  bubble(root);\n  var node = svg.selectAll(\".node\")\n      .data(root.children)\n    .enter().append(\"g\")\n      .attr(\"class\", \"node\")\n      .attr(\"transform\", function(d) { return \"translate(\" + d.x + \",\" + d.y + \")\"; });\n\n  node.append(\"a\")\n      .attr(\"xlink:href\", function(d){\n        return \"http://darkkinome.org/kinase/\"+d.data.className.substring(0, d.r / 3);\n      })\n      .append(\"svg:circle\")\n      .attr(\"r\", function(d) { return d.r; })\n      .style(\"fill\", function(d) {\n        return color[d.data.packageName];\n      })\n      .style(\"stroke\", \"#000\")\n      .style(\"stroke-width\", .2);\n\n  d3.selection.prototype.moveToFront = function() {\n      return this.each(function(){\n        this.parentNode.appendChild(this);\n      });\n    };\n\n  node.append(\"text\")\n      .attr(\"dy\", \".3em\")\n      .style(\"text-anchor\", \"middle\")\n      .style(\"font-family\", \"verdana\")\n      .style(\"font-size\", function (d) { return (d.r/5+5).toString()+\"px\" } )\n      .text(function(d) { return d.data.className.substring(0, d.r / 3); })\n      .style(\"pointer-events\", \"none\");\n\n  node.append(\"title\")\n      .text(function(d) { return d.data.className + \": \" + format(d.value); })\n      .style(\"pointer-events\", \"none\");\n\n\n  node.on(\"mouseover\", function (d) {\n        d3.select(this).select(\"text\")\n            .style(\"font-size\", function (d) { return ((d.r/5+5)*1.2).toString()+\"px\" } );\n        d3.select(this).select(\"a\")\n            .attr(\"transform\", \"scale(1.2,1.2)\");\n        d3.select(this).moveToFront() });\n\n  node.on(\"mouseout\", function (d) {\n        d3.select(this).select(\"text\")\n            .style(\"font-size\", function (d) { return (d.r/5+5).toString()+\"px\" });\n        d3.select(this).select(\"a\")\n            .attr(\"transform\", \"scale(1.0,1.0)\"); });\n});\n\n// Returns a flattened hierarchy containing all leaf nodes under the root.\nfunction classes(root) {\n  var classes = [];\n\n  function recurse(name, node) {\n    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });\n    else classes.push({packageName: name, className: node.name, value: node.size});\n  }\n\n  recurse(null, root);\n  return {children: classes};\n}\n\nd3.select(self.frameElement).style(\"height\", diameter + \"px\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });