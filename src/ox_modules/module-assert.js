/*
 * Copyright (C) 2015-2018 CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @name assert
 * @description Provides generic assertion methods.
 */

const chai = require('chai');
import OxError from '../errors/OxygenError';
const errHelper = require('../errors/helper');

module.exports = function() {
    module.isInitialized = function() {
        return true;
    };

    /**
     * @function takeScreenshot
     * @summary Take a screenshot of the current page or screen and return it as base64 encoded string.
     * @return {String} Screenshot image encoded as a base64 string.
     * @for android, ios, hybrid, web
     * @example <caption>[javascript] Usage example</caption>
     * mob.init(caps);//Starts a mobile session and opens app from desired capabilities
     * var ss = mob.takeScreenshot();//Take a screenshot of the current page or screen and return it as base64 encoded string.
     * require("fs").writeFileSync("c:\\screenshot.png", ss, 'base64');
     */
    
    module.takeScreenshot = function(name) {
        var mod;

        /*global ox*/
        if(ox && ox.modules && ox.modules.mob && ox.modules.mob.getDriver && ox.modules.mob.getDriver()) {
            mod = ox.modules.mob.getDriver();
        } else if (ox && ox.modules && ox.modules.web && ox.modules.web.getDriver && ox.modules.web.getDriver()) {
            mod = ox.modules.web.getDriver();
        } else if (ox && ox.modules && ox.modules.win && ox.modules.win.getDriver && ox.modules.win.getDriver()) {
            mod = ox.modules.win.getDriver();
        } else {
            throw new OxError(errHelper.errorCode.ASSERT_ERROR, 'Need mob,web or win module be initialized first');
        }

        return mod ? mod.takeScreenshot() : null;
    };

    /**
     * @summary Asserts that two values are equal.
     * @function equal
     * @param {String} actual - Actual value.
     * @param {String} expected - Expected value. Either a verbatim string or a regex string prefixed with `regex:`.
     * @param {String=} message - Message to throw if assertion fails.
     */
    module.equal = function(actual, expected, message) {
        try {
            if (expected && typeof expected === 'string' && expected.indexOf('regex:') === 0) {
                var regex = new RegExp(expected.substring('regex:'.length));
                chai.assert.match(actual, regex, message);
            } else {
                // check if both values are string that can be converted to number
                // if yes, convert them to number first and then compare
                if (typeof actual === 'string' && !isNaN(actual)) {
                    actual = parseInt(actual);
                }
                if (typeof expected === 'string' && !isNaN(expected)) {
                    expected = parseInt(expected);
                }
                chai.assert.equal(actual, expected, message);
            }
        }
        catch (e) {
            throw new OxError(errHelper.errorCode.ASSERT_ERROR, e.message);
        }
    };
    /**
     * @summary Asserts that two values are not equal.
     * @function notEqual
     * @param {String} actual - Actual value.
     * @param {String} expected - Expected value. Either a verbatim string or a regex string prefixed with `regex:`.
     * @param {String=} message - Message to throw if assertion fails.
     */
    module.notEqual = function(actual, expected, message) {
        try {
            if (expected.indexOf('regex:') === 0) {
                var regex = new RegExp(expected.substring('regex:'.length));
                chai.assert.notMatch(actual, regex, message);
            } else {
                chai.assert.notEqual(actual, expected, message);
            }
        }
        catch (e) {
            throw new OxError(errHelper.errorCode.ASSERT_ERROR, e.message);
        }
    };
    /**
     * @summary Fails test with the given message.
     * @function fail
     * @param {String=} message - Error message to return.
     */
    module.fail = function(message) {
        throw new OxError(errHelper.errorCode.ASSERT_ERROR, message);
    };

    return module;
};
