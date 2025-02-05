/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var AmedmapHighlightRules = function() {
    var keywords = "Chief Complaint";

    var builtinConstants = (
        "true|false|null"
    );

    var builtinFunctions = (
        "count|min|max|avg|sum|rank|now|coalesce|main"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "--.*$"
        }, {
            token : "string",           // " string
            regex : "^[a-zA-Z][a-zA-Z0-9 ]*"
        // }, {
        //     token : "string",           // character
        //     regex : "'.'"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        // }, {
        //     token : keywordMapper,
        //     regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword", // indented words
            regex : "^[ ][ ][a-zA-Z][a-zA-Z0-9 ]*"
        // }, {
        //     token : "keyword", // double indented words
        //     regex : "^[ ][ ][ ][ ][a-zA-Z][a-zA-Z0-9 ]*"
        }, {
            token : "constant.language", // leaves
            regex : "^[ \t]+[a-zA-Z][a-zA-Z0-9 ]*[:]"
        }, {
            token : "invalid.illegal", //multiselect
            regex : "\\[",
            next  : "multilineMultiSelect"
        }, {
            token : "invalid.deprecated", //singleselect
            regex : "\\{",
            next  : "multilineSingleSelect"
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],

        "multilineMultiSelect" : [ {
            token : "invalid.illegal",
            regex : "\\]",
            next : "start"
        }, {
            defaultToken: "invalid.illegal"
        }, {
            token: "markup.bold",
            regex: "\\|"
        }],

        "multilineSingleSelect" : [ {
            token : "invalid.deprecated",
            regex : "\\}",
            next : "start"
        }, {
            defaultToken: "invalid.deprecated"
        }, {
            token: "markup.bold",
            regex: "\\|"
        }],
    };
};

oop.inherits(AmedmapHighlightRules, TextHighlightRules);

exports.AmedmapHighlightRules = AmedmapHighlightRules;
});
