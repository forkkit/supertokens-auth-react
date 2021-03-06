"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../../../styles/styleContext"));

var _core = require("@emotion/core");

var _FormBase = _interopRequireDefault(require("../../../library/FormBase"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
        return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

/*
 * Styles.
 */
function getStyles(palette) {
    return {
        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 600,
            color: palette.colors.textTitle
        },
        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        },
        successMessage: {
            marginBottom: "15px"
        }
    };
}
/*
 * Component.
 */

var EnterEmailTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(EnterEmailTheme, _PureComponent);

    var _super = _createSuper(EnterEmailTheme);

    /*
     * Constructor.
     */
    function EnterEmailTheme(props) {
        var _this;

        _classCallCheck(this, EnterEmailTheme);

        _this = _super.call(this, props);

        _this.onSuccess = function() {
            _this.setState(function() {
                return {
                    emailSent: true
                };
            });

            if (_this.props.onSuccess !== undefined) {
                _this.props.onSuccess();
            }
        };

        _this.resend = function() {
            _this.setState(function() {
                return {
                    emailSent: false
                };
            });
        };

        _this.state = {
            emailSent: false
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(EnterEmailTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var componentStyles = getStyles(styles.palette);
                var _this$props = this.props,
                    formFields = _this$props.formFields,
                    callAPI = _this$props.callAPI;
                var emailSent = this.state.emailSent; // If email sent, show success UI.

                if (emailSent === true) {
                    return (0, _core.jsx)(
                        "div",
                        {
                            className: "container",
                            css: styles.container
                        },
                        (0, _core.jsx)(
                            "div",
                            {
                                className: "row",
                                css: styles.row
                            },
                            (0, _core.jsx)(
                                "div",
                                {
                                    className: "primaryText successMessage",
                                    css: [styles.primaryText, componentStyles.successMessage, styles.successMessage]
                                },
                                "Please check your email for the password recovery link.",
                                " ",
                                (0, _core.jsx)(
                                    "span",
                                    {
                                        className: "link",
                                        css: styles.link,
                                        onClick: this.resend
                                    },
                                    "Resend"
                                )
                            )
                        )
                    );
                } // Otherwise, return Form.

                return (0, _core.jsx)(_FormBase["default"], {
                    formFields: formFields,
                    buttonLabel: "Email me",
                    onSuccess: this.onSuccess,
                    callAPI: callAPI,
                    showLabels: false,
                    validateOnBlur: true,
                    header: (0, _core.jsx)(
                        _react.Fragment,
                        null,
                        (0, _core.jsx)(
                            "div",
                            {
                                className: "headerTitle",
                                css: [componentStyles.headerTitle, styles.headerTitle]
                            },
                            "Reset your password"
                        ),
                        (0, _core.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: [componentStyles.headerSubTitle, styles.headerSubtitle]
                            },
                            (0, _core.jsx)(
                                "div",
                                {
                                    className: "secondaryText",
                                    css: styles.secondaryText
                                },
                                "We will send you an email to reset your password"
                            )
                        )
                    )
                });
            }
        }
    ]);

    return EnterEmailTheme;
})(_react.PureComponent);

exports["default"] = EnterEmailTheme;
EnterEmailTheme.contextType = _styleContext["default"];
