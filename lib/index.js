"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _folderPath = /*#__PURE__*/new WeakMap();
var _createFolderIfNotExists = /*#__PURE__*/new WeakSet();
var _createFileIfNotExists = /*#__PURE__*/new WeakSet();
var _getFileName = /*#__PURE__*/new WeakSet();
/* It's a class that allows you to create a database using JSON files */
var JsonDb = /*#__PURE__*/function () {
  /**
   * If the folder doesn't exist, create it.
   * @param folderPath - The path to the folder you want to create.
   */
  function JsonDb(folderPath) {
    _classCallCheck(this, JsonDb);
    _classPrivateMethodInitSpec(this, _getFileName);
    _classPrivateMethodInitSpec(this, _createFileIfNotExists);
    _classPrivateMethodInitSpec(this, _createFolderIfNotExists);
    _classPrivateFieldInitSpec(this, _folderPath, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _folderPath, folderPath);
    _classPrivateMethodGet(this, _createFolderIfNotExists, _createFolderIfNotExists2).call(this);
  }

  /**
   * If the folder path doesn't exist, create it
   */
  _createClass(JsonDb, [{
    key: "insert",
    value:
    /**
     * It takes a file name and an object, and inserts the object into the file
     * @param fileName - The name of the file you want to insert into.
     * @param obj - The object to be inserted into the file.
     */
    function insert(fileName, obj) {
      fileName = _classPrivateMethodGet(this, _getFileName, _getFileName2).call(this, fileName);
      _classPrivateMethodGet(this, _createFileIfNotExists, _createFileIfNotExists2).call(this, fileName);
      var data = _fs["default"].readFileSync("".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName));
      var array = JSON.parse(data);
      if (Array.isArray(obj)) {
        array = [].concat(_toConsumableArray(array), _toConsumableArray(obj));
      } else {
        array.push(obj);
      }
      _fs["default"].writeFileSync("".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName), JSON.stringify(array));
    }
    /**
     * It reads a file, parses it into an array, and returns the array.
     * @param fileName - The name of the file you want to select from.
     * @param searchCriteria - This is a function that takes in an object and returns a boolean.
     * @returns An array of objects that match the search criteria.
     */
  }, {
    key: "select",
    value: function select(fileName, searchCriteria) {
      fileName = _classPrivateMethodGet(this, _getFileName, _getFileName2).call(this, fileName);
      if (!_fs["default"].existsSync("".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName))) {
        return [];
      }
      var data = _fs["default"].readFileSync("".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName));
      var array = JSON.parse(data);
      if (searchCriteria) {
        return array.filter(searchCriteria);
      } else {
        return array;
      }
    }
    /**
     * It takes a file name, a where function, and a newData function, and updates the file with the
     * newData function
     * @param fileName - The name of the file you want to update.
     * @param args - [where, newData]
     */
  }, {
    key: "update",
    value: function update(fileName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var where = args[0],
        newData = args[1];
      fileName = _classPrivateMethodGet(this, _getFileName, _getFileName2).call(this, fileName);
      var filePath = "".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName);
      if (_fs["default"].existsSync(filePath)) {
        var data = _fs["default"].readFileSync(filePath);
        var array = JSON.parse(data);
        array = array.map(function (element) {
          if (where === null || typeof where === "undefined" || typeof where != "function") {
            if (typeof newData === "function") {
              return _objectSpread(_objectSpread({}, element), newData(element));
            }
            return _objectSpread(_objectSpread({}, element), newData);
          }
          if (where(element)) {
            if (typeof newData === "function") {
              return _objectSpread(_objectSpread({}, element), newData(element));
            }
            return _objectSpread(_objectSpread({}, element), newData);
          }
          return element;
        });
        _fs["default"].writeFileSync(filePath, JSON.stringify(array));
      }
    }
    /**
     * It deletes a file or a record from a file
     * @param fileName - The name of the file you want to delete from.
     * @param where - a function that returns true or false.
     */
  }, {
    key: "delete",
    value: function _delete(fileName, where) {
      fileName = _classPrivateMethodGet(this, _getFileName, _getFileName2).call(this, fileName);
      var filePath = "".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName);
      if (typeof where === "undefined" && _fs["default"].existsSync(filePath)) {
        _fs["default"].unlinkSync(filePath);
      }
      if (_fs["default"].existsSync(filePath)) {
        var data = _fs["default"].readFileSync(filePath);
        var array = JSON.parse(data);
        var updatedArray = array.filter(function (element) {
          return !where(element);
        });
        _fs["default"].writeFileSync(filePath, JSON.stringify(updatedArray));
      }
    }
  }]);
  return JsonDb;
}();
function _createFolderIfNotExists2() {
  if (!_fs["default"].existsSync(_classPrivateFieldGet(this, _folderPath))) {
    _fs["default"].mkdirSync(_classPrivateFieldGet(this, _folderPath), {
      recursive: true
    });
  }
}
function _createFileIfNotExists2(fileName) {
  if (!_fs["default"].existsSync("".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName))) {
    _fs["default"].writeFileSync("".concat(_classPrivateFieldGet(this, _folderPath), "/").concat(fileName), "[]");
  }
}
function _getFileName2(fileName) {
  if (typeof fileName !== "string") {
    throw new Error("El nombre del archivo debe ser una cadena!");
  }
  if (!fileName.endsWith(".json")) {
    fileName += ".json";
  }
  return fileName;
}
module.exports = JsonDb;