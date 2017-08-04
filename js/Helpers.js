/**
 * Created by Maciek on 8/3/2017.
 */

(function(window) {

    window.getById = function (selector, scope) {
        return (scope || document).getElementById(selector);
    };
    window.getByClass = function (selector, scope) {
        return (scope || document).getElementsByClassName(selector);
    };

})(window);