/**
 * Created by Maciek on 8/3/2017.
 */

var helpersModule = {
    getById: function (selector, scope) {
        return (scope || document).getElementById(selector);
    },
    getByClass: function (selector, scope) {
        return (scope || document).getElementsByClassName(selector);
    }
};