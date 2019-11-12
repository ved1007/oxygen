/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @function getAppiumLogs
 * @summary Collects logs from the Appium server.
 * @return {Object[]} A list of logs.
 * @for android, ios, hybrid, web
 * @example <caption>[javascript] Usage example</caption>
 * win.init(caps); //Starts a mobile session and opens app from desired capabilities
 * win.getAppiumLogs(); //Collects logs from the Appium server
 */
module.exports = function() {
    return this.driver.getLogs('server');
};
