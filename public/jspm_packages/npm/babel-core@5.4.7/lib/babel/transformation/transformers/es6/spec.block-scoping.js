/* */ 
"format cjs";
"use strict";

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _traversal = require("../../../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var visitor = {
  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (t.isFor(parent) && parent.left === node) return;

    var declared = state.letRefs[node.name];
    if (!declared) return;

    // declared node is different in this scope
    if (scope.getBindingIdentifier(node.name) !== declared) return;

    var assert = t.callExpression(state.file.addHelper("temporal-assert-defined"), [node, t.literal(node.name), state.file.addHelper("temporal-undefined")]);

    this.skip();

    if (t.isAssignmentExpression(parent) || t.isUpdateExpression(parent)) {
      if (parent._ignoreBlockScopingTDZ) return;
      this.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
    } else {
      return t.logicalExpression("&&", assert, node);
    }
  }
};

var metadata = {
  optional: true,
  group: "builtin-advanced"
};

exports.metadata = metadata;
var BlockStatement = {
  exit: function exit(node, parent, scope, file) {
    var letRefs = node._letReferences;
    if (!letRefs) return;

    this.traverse(visitor, {
      letRefs: letRefs,
      file: file
    });
  }
};

exports.BlockStatement = BlockStatement;
exports.Program = BlockStatement;
exports.Loop = BlockStatement;