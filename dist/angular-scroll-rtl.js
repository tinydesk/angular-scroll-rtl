'use strict';

(function () {
    'use strict';

    var mod = angular.module('td.scroll', []);

    mod.run(['$document', function ($document) {

        function getRTLHorizontalScrollType() {
            var body = $document.find('body');
            var tmpElem = angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>');
            body.append(tmpElem);
            var type = 'default';
            if (tmpElem[0].scrollLeft > 0) {
                type = 'reverse';
            } else {
                tmpElem[0].scrollLeft = 1;
                if (tmpElem[0].scrollLeft === 0) {
                    type = 'negative';
                }
            }
            tmpElem.remove();
            return type;
        }

        //Copyright 2010 Nicholas C. Zakas. All rights reserved.
        //MIT Licensed
        function getDirection(element) {
            var result = null;
            if (element) {
                if (window.getComputedStyle) {
                    result = window.getComputedStyle(element, null).direction;
                } else if (element.currentStyle) {
                    result = element.currentStyle.direction;
                }
            }

            return result;
        }

        function getScrollType(element) {

            var scrollTypes = {
                default: {
                    get: function get() {
                        return element.scrollLeft;
                    },
                    set: function set(v) {
                        return element.scrollLeft = v;
                    }
                },
                reverse: {
                    get: function get() {
                        return element.scrollWidth - element.clientWidth - element.scrollLeft;
                    },
                    set: function set(v) {
                        return element.scrollLeft = element.scrollWidth - element.clientWidth - v;
                    }
                },
                negative: {
                    get: function get() {
                        return -element.scrollLeft;
                    },
                    set: function set(v) {
                        return element.scrollLeft = -v;
                    }
                }
            };

            if (getDirection(element) === 'rtl') {
                return scrollTypes[rtlHorizontalScrollType];
            } else {
                return scrollTypes.default;
            }
        }

        var rtlHorizontalScrollType = getRTLHorizontalScrollType();

        angular.element.prototype.scrollLeft = function (value) {
            var e = this[0];
            if (value !== undefined) {
                // set:
                for (var i = 0; i < this.length; ++i) {
                    getScrollType(this[i]).set(value);
                }
            } else {
                // get:
                return getScrollType(this[0]).get();
            }
        };
    }]);
})();
//# sourceMappingURL=angular-scroll-rtl.js.map
