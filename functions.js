function msToTime(uptime) {
    if (!uptime || isNaN(uptime)) return null;

    var years = Math.floor((uptime / (1000 * 60 * 60 * 24 * 7 * 4 * 12))),
        months = Math.floor((uptime / (1000 * 60 * 60 * 24 * 7 * 4)) % 12),
        weeks = Math.floor((uptime / (1000 * 60 * 60 * 24 * 7)) % 4),
        days = Math.floor((uptime / (1000 * 60 * 60 * 24)) % 7),
        hours = Math.floor((uptime / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((uptime / (1000 * 60)) % 60),
        seconds = Math.floor((uptime / 1000) % 60);
    // Initialize an array for the uptime.
    var segments = [];

    // Format the uptime string.
    if (years > 0) segments.push(days + ' year' + ((days == 1) ? '' : 's'));
    if (months > 0) segments.push(days + ' month' + ((days == 1) ? '' : 's'));
    if (weeks > 0) segments.push(days + ' week' + ((days == 1) ? '' : 's'));
    if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
    if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
    if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
    if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
    return segments.join(', ');
}

module.exports = {
    msToTime: msToTime
}