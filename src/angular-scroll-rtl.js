(() => {
    'use strict';

    const mod = angular.module('td.scroll', []);

    mod.run(['$document', ($document) => {

        function getRTLHorizontalScrollType() {
            const body = $document.find('body');
            const tmpElem = angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>');
            body.append(tmpElem);
            let type = 'default';
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
            if (element){
                if (window.getComputedStyle){
                    result = window.getComputedStyle(element,null).direction;
                } else if (element.currentStyle){
                    result = element.currentStyle.direction;
                }
            }

            return result;
        }

        function getScrollType(element) {

            const scrollTypes = {
                default: {
                    get: () => element.scrollLeft,
                    set: v => element.scrollLeft = v 
                },
                reverse: {
                    get: () => element.scrollWidth - element.clientWidth - element.scrollLeft,
                    set: v => element.scrollLeft = element.scrollWidth - element.clientWidth - v
                }, 
                negative: {
                    get: () => -element.scrollLeft,
                    set: v => element.scrollLeft = -v
                }
            };

            if (getDirection(element) === 'rtl') {
                return scrollTypes[rtlHorizontalScrollType];
            } else {
                return scrollTypes.default;
            }
        }

        const rtlHorizontalScrollType = getRTLHorizontalScrollType();

        angular.element.prototype.scrollLeft = function(value) {
            const e = this[0];
            if (value !== undefined) {
                // set:
                for (let i = 0; i < this.length; ++i) {
                    getScrollType(this[i]).set(value);
                }
            } else {
                // get:
                return getScrollType(this[0]).get();
            }
        };


    }]);

})();