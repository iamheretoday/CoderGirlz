console.log('mandrill_api');
(function() {
    var ROOT, STATE_DESC, m;

    m = {};

    ROOT = 'https://mandrillapp.com/api/1.0/';

    STATE_DESC = {
        1: 'OPENED',
        2: 'HEADERS_RECEIVED',
        3: 'LOADING',
        4: 'DONE'
    };

    m.Mandrill = (function() {

        function Mandrill(apikey, debug) {
            this.apikey = apikey;
            this.debug = debug != null ? debug : false;
            this.templates = new m.Templates(this);
            this.exports = new m.Exports(this);
            this.users = new m.Users(this);
            this.rejects = new m.Rejects(this);
            this.inbound = new m.Inbound(this);
            this.tags = new m.Tags(this);
            this.messages = new m.Messages(this);
            this.whitelists = new m.Whitelists(this);
            this.ips = new m.Ips(this);
            this.internal = new m.Internal(this);
            this.subaccounts = new m.Subaccounts(this);
            this.urls = new m.Urls(this);
            this.webhooks = new m.Webhooks(this);
            this.senders = new m.Senders(this);
            this.metadata = new m.Metadata(this);
        }

        Mandrill.prototype.call = function(uri, params, onresult, onerror) {
            var req,
                _this = this;
            if (params == null) {
                params = {};
            }
            params.key = this.apikey;
            params = JSON.stringify(params);
            req = new XMLHttpRequest();
            req.open('POST', "" + ROOT + uri + ".json");
            req.setRequestHeader('Content-Type', 'application/json');
            if (this.debug) {
                console.log("Mandrill: Opening request to " + ROOT + uri + ".json");
            }
            req.onreadystatechange = function() {
                var res;
                if (_this.debug) {
                    console.log("Mandrill: Request state " + STATE_DESC[req.readyState]);
                }
                if (req.readyState !== 4) {
                    return;
                }
                res = JSON.parse(req.responseText);
                if (res == null) {
                    res = {
                        status: 'error',
                        name: 'GeneralError',
                        message: 'An unexpected error occurred'
                    };
                }
                if (req.status !== 200) {
                    if (onerror) {
                        return onerror(res);
                    } else {
                        return _this.onerror(res);
                    }
                } else {
                    if (onresult) {
                        return onresult(res);
                    }
                }
            };
            return req.send(params);
        };

        Mandrill.prototype.onerror = function(err) {
            throw {
                name: err.name,
                message: err.message,
                toString: function() {
                    return "" + err.name + ": " + err.message;
                }
            };
        };

        return Mandrill;

    })();

    m.Templates = (function() {

        function Templates(master) {
            this.master = master;
        }

        /*
         Add a new template
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the name for the new template - must be unique
         @option params {String} from_email a default sending address for emails sent using this template
         @option params {String} from_name a default from name to be used
         @option params {String} subject a default subject line to be used
         @option params {String} code the HTML code for the template with mc:edit attributes for the editable elements
         @option params {String} text a default text part to be used when sending with this template
         @option params {Boolean} publish set to false to add a draft template without publishing
         @option params {Array} labels an optional array of up to 10 labels to use for filtering templates
         - labels[] {String} a single label
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.add = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["from_email"]) == null) {
                params["from_email"] = null;
            }
            if ((_ref1 = params["from_name"]) == null) {
                params["from_name"] = null;
            }
            if ((_ref2 = params["subject"]) == null) {
                params["subject"] = null;
            }
            if ((_ref3 = params["code"]) == null) {
                params["code"] = null;
            }
            if ((_ref4 = params["text"]) == null) {
                params["text"] = null;
            }
            if ((_ref5 = params["publish"]) == null) {
                params["publish"] = true;
            }
            if ((_ref6 = params["labels"]) == null) {
                params["labels"] = [];
            }
            return this.master.call('templates/add', params, onsuccess, onerror);
        };

        /*
         Get the information for an existing template
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the immutable name of an existing template
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('templates/info', params, onsuccess, onerror);
        };

        /*
         Update the code for an existing template. If null is provided for any fields, the values will remain unchanged.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the immutable name of an existing template
         @option params {String} from_email the new default sending address
         @option params {String} from_name the new default from name
         @option params {String} subject the new default subject line
         @option params {String} code the new code for the template
         @option params {String} text the new default text part to be used
         @option params {Boolean} publish set to false to update the draft version of the template without publishing
         @option params {Array} labels an optional array of up to 10 labels to use for filtering templates
         - labels[] {String} a single label
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.update = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["from_email"]) == null) {
                params["from_email"] = null;
            }
            if ((_ref1 = params["from_name"]) == null) {
                params["from_name"] = null;
            }
            if ((_ref2 = params["subject"]) == null) {
                params["subject"] = null;
            }
            if ((_ref3 = params["code"]) == null) {
                params["code"] = null;
            }
            if ((_ref4 = params["text"]) == null) {
                params["text"] = null;
            }
            if ((_ref5 = params["publish"]) == null) {
                params["publish"] = true;
            }
            if ((_ref6 = params["labels"]) == null) {
                params["labels"] = null;
            }
            return this.master.call('templates/update', params, onsuccess, onerror);
        };

        /*
         Publish the content for the template. Any new messages sent using this template will start using the content that was previously in draft.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the immutable name of an existing template
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.publish = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('templates/publish', params, onsuccess, onerror);
        };

        /*
         Delete a template
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the immutable name of an existing template
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('templates/delete', params, onsuccess, onerror);
        };

        /*
         Return a list of all the templates available to this user
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} label an optional label to filter the templates
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.list = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["label"]) == null) {
                params["label"] = null;
            }
            return this.master.call('templates/list', params, onsuccess, onerror);
        };

        /*
         Return the recent history (hourly stats for the last 30 days) for a template
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the name of an existing template
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.timeSeries = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('templates/time-series', params, onsuccess, onerror);
        };

        /*
         Inject content and optionally merge fields into a template, returning the HTML that results
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} template_name the immutable name of a template that exists in the user's account
         @option params {Array} template_content an array of template content to render.  Each item in the array should be a struct with two keys - name: the name of the content block to set the content for, and content: the actual content to put into the block
         - template_content[] {Object} the injection of a single piece of content into a single editable region
         - name {String} the name of the mc:edit editable region to inject into
         - content {String} the content to inject
         @option params {Array} merge_vars optional merge variables to use for injecting merge field content.  If this is not provided, no merge fields will be replaced.
         - merge_vars[] {Object} a single merge variable
         - name {String} the merge variable's name. Merge variable names are case-insensitive and may not start with _
         - content {String} the merge variable's content
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Templates.prototype.render = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["merge_vars"]) == null) {
                params["merge_vars"] = null;
            }
            return this.master.call('templates/render', params, onsuccess, onerror);
        };

        return Templates;

    })();

    m.Exports = (function() {

        function Exports(master) {
            this.master = master;
        }

        /*
         Returns information about an export job. If the export job's state is 'complete',
         the returned data will include a URL you can use to fetch the results. Every export
         job produces a zip archive, but the format of the archive is distinct for each job
         type. The api calls that initiate exports include more details about the output format
         for that job type.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id an export job identifier
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Exports.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('exports/info', params, onsuccess, onerror);
        };

        /*
         Returns a list of your exports.
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Exports.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('exports/list', params, onsuccess, onerror);
        };

        /*
         Begins an export of your rejection blacklist. The blacklist will be exported to a zip archive
         containing a single file named rejects.csv that includes the following fields: email,
         reason, detail, created_at, expires_at, last_event_at, expires_at.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} notify_email an optional email address to notify when the export job has finished.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Exports.prototype.rejects = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["notify_email"]) == null) {
                params["notify_email"] = null;
            }
            return this.master.call('exports/rejects', params, onsuccess, onerror);
        };

        /*
         Begins an export of your rejection whitelist. The whitelist will be exported to a zip archive
         containing a single file named whitelist.csv that includes the following fields:
         email, detail, created_at.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} notify_email an optional email address to notify when the export job has finished.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Exports.prototype.whitelist = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["notify_email"]) == null) {
                params["notify_email"] = null;
            }
            return this.master.call('exports/whitelist', params, onsuccess, onerror);
        };

        /*
         Begins an export of your activity history. The activity will be exported to a zip archive
         containing a single file named activity.csv in the same format as you would be able to export
         from your account's activity view. It includes the following fields: Date, Email Address,
         Sender, Subject, Status, Tags, Opens, Clicks, Bounce Detail. If you have configured any custom
         metadata fields, they will be included in the exported data.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} notify_email an optional email address to notify when the export job has finished
         @option params {String} date_from start date as a UTC string in YYYY-MM-DD HH:MM:SS format
         @option params {String} date_to end date as a UTC string in YYYY-MM-DD HH:MM:SS format
         @option params {Array} tags an array of tag names to narrow the export to; will match messages that contain ANY of the tags
         - tags[] {String} a tag name
         @option params {Array} senders an array of senders to narrow the export to
         - senders[] {String} a sender address
         @option params {Array} states an array of states to narrow the export to; messages with ANY of the states will be included
         - states[] {String} a message state
         @option params {Array} api_keys an array of api keys to narrow the export to; messsagse sent with ANY of the keys will be included
         - api_keys[] {String} an API key associated with your account
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Exports.prototype.activity = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["notify_email"]) == null) {
                params["notify_email"] = null;
            }
            if ((_ref1 = params["date_from"]) == null) {
                params["date_from"] = null;
            }
            if ((_ref2 = params["date_to"]) == null) {
                params["date_to"] = null;
            }
            if ((_ref3 = params["tags"]) == null) {
                params["tags"] = null;
            }
            if ((_ref4 = params["senders"]) == null) {
                params["senders"] = null;
            }
            if ((_ref5 = params["states"]) == null) {
                params["states"] = null;
            }
            if ((_ref6 = params["api_keys"]) == null) {
                params["api_keys"] = null;
            }
            return this.master.call('exports/activity', params, onsuccess, onerror);
        };

        return Exports;

    })();

    m.Users = (function() {

        function Users(master) {
            this.master = master;
        }

        /*
         Return the information about the API-connected user
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Users.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('users/info', params, onsuccess, onerror);
        };

        /*
         Validate an API key and respond to a ping
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Users.prototype.ping = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('users/ping', params, onsuccess, onerror);
        };

        /*
         Validate an API key and respond to a ping (anal JSON parser version)
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Users.prototype.ping2 = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('users/ping2', params, onsuccess, onerror);
        };

        /*
         Return the senders that have tried to use this account, both verified and unverified
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Users.prototype.senders = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('users/senders', params, onsuccess, onerror);
        };

        return Users;

    })();

    m.Rejects = (function() {

        function Rejects(master) {
            this.master = master;
        }

        /*
         Adds an email to your email rejection blacklist. Addresses that you
         add manually will never expire and there is no reputation penalty
         for removing them from your blacklist. Attempting to blacklist an
         address that has been whitelisted will have no effect.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} email an email address to block
         @option params {String} comment an optional comment describing the rejection
         @option params {String} subaccount an optional unique identifier for the subaccount to limit the blacklist entry
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Rejects.prototype.add = function(params, onsuccess, onerror) {
            var _ref, _ref1;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["comment"]) == null) {
                params["comment"] = null;
            }
            if ((_ref1 = params["subaccount"]) == null) {
                params["subaccount"] = null;
            }
            return this.master.call('rejects/add', params, onsuccess, onerror);
        };

        /*
         Retrieves your email rejection blacklist. You can provide an email
         address to limit the results. Returns up to 1000 results. By default,
         entries that have expired are excluded from the results; set
         include_expired to true to include them.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} email an optional email address to search by
         @option params {Boolean} include_expired whether to include rejections that have already expired.
         @option params {String} subaccount an optional unique identifier for the subaccount to limit the blacklist
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Rejects.prototype.list = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["email"]) == null) {
                params["email"] = null;
            }
            if ((_ref1 = params["include_expired"]) == null) {
                params["include_expired"] = false;
            }
            if ((_ref2 = params["subaccount"]) == null) {
                params["subaccount"] = null;
            }
            return this.master.call('rejects/list', params, onsuccess, onerror);
        };

        /*
         Deletes an email rejection. There is no limit to how many rejections
         you can remove from your blacklist, but keep in mind that each deletion
         has an affect on your reputation.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} email an email address
         @option params {String} subaccount an optional unique identifier for the subaccount to limit the blacklist deletion
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Rejects.prototype["delete"] = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["subaccount"]) == null) {
                params["subaccount"] = null;
            }
            return this.master.call('rejects/delete', params, onsuccess, onerror);
        };

        return Rejects;

    })();

    m.Inbound = (function() {

        function Inbound(master) {
            this.master = master;
        }

        /*
         List the domains that have been configured for inbound delivery
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.domains = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/domains', params, onsuccess, onerror);
        };

        /*
         Add an inbound domain to your account
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain a domain name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.addDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/add-domain', params, onsuccess, onerror);
        };

        /*
         Check the MX settings for an inbound domain. The domain must have already been added with the add-domain call
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain an existing inbound domain
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.checkDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/check-domain', params, onsuccess, onerror);
        };

        /*
         Delete an inbound domain from the account. All mail will stop routing for this domain immediately.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain an existing inbound domain
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.deleteDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/delete-domain', params, onsuccess, onerror);
        };

        /*
         List the mailbox routes defined for an inbound domain
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain the domain to check
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.routes = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/routes', params, onsuccess, onerror);
        };

        /*
         Add a new mailbox route to an inbound domain
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain an existing inbound domain
         @option params {String} pattern the search pattern that the mailbox name should match
         @option params {String} url the webhook URL where the inbound messages will be published
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.addRoute = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/add-route', params, onsuccess, onerror);
        };

        /*
         Update the pattern or webhook of an existing inbound mailbox route. If null is provided for any fields, the values will remain unchanged.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of an existing mailbox route
         @option params {String} pattern the search pattern that the mailbox name should match
         @option params {String} url the webhook URL where the inbound messages will be published
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.updateRoute = function(params, onsuccess, onerror) {
            var _ref, _ref1;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["pattern"]) == null) {
                params["pattern"] = null;
            }
            if ((_ref1 = params["url"]) == null) {
                params["url"] = null;
            }
            return this.master.call('inbound/update-route', params, onsuccess, onerror);
        };

        /*
         Delete an existing inbound mailbox route
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of an existing route
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.deleteRoute = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('inbound/delete-route', params, onsuccess, onerror);
        };

        /*
         Take a raw MIME document destined for a domain with inbound domains set up, and send it to the inbound hook exactly as if it had been sent over SMTP
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} raw_message the full MIME document of an email message
         @option params {Array|null} to optionally define the recipients to receive the message - otherwise we'll use the To, Cc, and Bcc headers provided in the document
         - to[] {String} the email address of the recipient
         @option params {String} mail_from the address specified in the MAIL FROM stage of the SMTP conversation. Required for the SPF check.
         @option params {String} helo the identification provided by the client mta in the MTA state of the SMTP conversation. Required for the SPF check.
         @option params {String} client_address the remote MTA's ip address. Optional; required for the SPF check.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Inbound.prototype.sendRaw = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["to"]) == null) {
                params["to"] = null;
            }
            if ((_ref1 = params["mail_from"]) == null) {
                params["mail_from"] = null;
            }
            if ((_ref2 = params["helo"]) == null) {
                params["helo"] = null;
            }
            if ((_ref3 = params["client_address"]) == null) {
                params["client_address"] = null;
            }
            return this.master.call('inbound/send-raw', params, onsuccess, onerror);
        };

        return Inbound;

    })();

    m.Tags = (function() {

        function Tags(master) {
            this.master = master;
        }

        /*
         Return all of the user-defined tag information
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Tags.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('tags/list', params, onsuccess, onerror);
        };

        /*
         Deletes a tag permanently. Deleting a tag removes the tag from any messages
         that have been sent, and also deletes the tag's stats. There is no way to
         undo this operation, so use it carefully.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} tag a tag name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Tags.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('tags/delete', params, onsuccess, onerror);
        };

        /*
         Return more detailed information about a single tag, including aggregates of recent stats
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} tag an existing tag name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Tags.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('tags/info', params, onsuccess, onerror);
        };

        /*
         Return the recent history (hourly stats for the last 30 days) for a tag
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} tag an existing tag name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Tags.prototype.timeSeries = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('tags/time-series', params, onsuccess, onerror);
        };

        /*
         Return the recent history (hourly stats for the last 30 days) for all tags
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Tags.prototype.allTimeSeries = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('tags/all-time-series', params, onsuccess, onerror);
        };

        return Tags;

    })();

    m.Messages = (function() {

        function Messages(master) {
            this.master = master;
        }

        /*
         Send a new transactional message through Mandrill
         @param {Object} params the hash of the parameters to pass to the request
         @option params {Struct} message the information on the message to send
         - html {String} the full HTML content to be sent
         - text {String} optional full text content to be sent
         - subject {String} the message subject
         - from_email {String} the sender email address.
         - from_name {String} optional from name to be used
         - to {Array} an array of recipient information.
         - to[] {Object} a single recipient's information.
         - email {String} the email address of the recipient
         - name {String} the optional display name to use for the recipient
         - type {String} the header type to use for the recipient, defaults to "to" if not provided
         - headers {Object} optional extra headers to add to the message (most headers are allowed)
         - important {Boolean} whether or not this message is important, and should be delivered ahead of non-important messages
         - track_opens {Boolean} whether or not to turn on open tracking for the message
         - track_clicks {Boolean} whether or not to turn on click tracking for the message
         - auto_text {Boolean} whether or not to automatically generate a text part for messages that are not given text
         - auto_html {Boolean} whether or not to automatically generate an HTML part for messages that are not given HTML
         - inline_css {Boolean} whether or not to automatically inline all CSS styles provided in the message HTML - only for HTML documents less than 256KB in size
         - url_strip_qs {Boolean} whether or not to strip the query string from URLs when aggregating tracked URL data
         - preserve_recipients {Boolean} whether or not to expose all recipients in to "To" header for each email
         - view_content_link {Boolean} set to false to remove content logging for sensitive emails
         - bcc_address {String} an optional address to receive an exact copy of each recipient's email
         - tracking_domain {String} a custom domain to use for tracking opens and clicks instead of mandrillapp.com
         - signing_domain {String} a custom domain to use for SPF/DKIM signing instead of mandrill (for "via" or "on behalf of" in email clients)
         - return_path_domain {String} a custom domain to use for the messages's return-path
         - merge {Boolean} whether to evaluate merge tags in the message. Will automatically be set to true if either merge_vars or global_merge_vars are provided.
         - global_merge_vars {Array} global merge variables to use for all recipients. You can override these per recipient.
         - global_merge_vars[] {Object} a single global merge variable
         - name {String} the global merge variable's name. Merge variable names are case-insensitive and may not start with _
         - content {String} the global merge variable's content
         - merge_vars {Array} per-recipient merge variables, which override global merge variables with the same name.
         - merge_vars[] {Object} per-recipient merge variables
         - rcpt {String} the email address of the recipient that the merge variables should apply to
         - vars {Array} the recipient's merge variables
         - vars[] {Object} a single merge variable
         - name {String} the merge variable's name. Merge variable names are case-insensitive and may not start with _
         - content {String} the merge variable's content
         - tags {Array} an array of string to tag the message with.  Stats are accumulated using tags, though we only store the first 100 we see, so this should not be unique or change frequently.  Tags should be 50 characters or less.  Any tags starting with an underscore are reserved for internal use and will cause errors.
         - tags[] {String} a single tag - must not start with an underscore
         - subaccount {String} the unique id of a subaccount for this message - must already exist or will fail with an error
         - google_analytics_domains {Array} an array of strings indicating for which any matching URLs will automatically have Google Analytics parameters appended to their query string automatically.
         - google_analytics_campaign {Array|string} optional string indicating the value to set for the utm_campaign tracking parameter. If this isn't provided the email's from address will be used instead.
         - metadata {Array} metadata an associative array of user metadata. Mandrill will store this metadata and make it available for retrieval. In addition, you can select up to 10 metadata fields to index and make searchable using the Mandrill search api.
         - recipient_metadata {Array} Per-recipient metadata that will override the global values specified in the metadata parameter.
         - recipient_metadata[] {Object} metadata for a single recipient
         - rcpt {String} the email address of the recipient that the metadata is associated with
         - values {Array} an associated array containing the recipient's unique metadata. If a key exists in both the per-recipient metadata and the global metadata, the per-recipient metadata will be used.
         - attachments {Array} an array of supported attachments to add to the message
         - attachments[] {Object} a single supported attachment
         - type {String} the MIME type of the attachment
         - name {String} the file name of the attachment
         - content {String} the content of the attachment as a base64-encoded string
         - images {Array} an array of embedded images to add to the message
         - images[] {Object} a single embedded image
         - type {String} the MIME type of the image - must start with "image/"
         - name {String} the Content ID of the image - use <img src="cid:THIS_VALUE"> to reference the image in your HTML content
         - content {String} the content of the image as a base64-encoded string
         @option params {Boolean} async enable a background sending mode that is optimized for bulk sending. In async mode, messages/send will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
         @option params {String} ip_pool the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
         @option params {String} send_at when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately. An additional fee applies for scheduled email, and this feature is only available to accounts with a positive balance.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.send = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["async"]) == null) {
                params["async"] = false;
            }
            if ((_ref1 = params["ip_pool"]) == null) {
                params["ip_pool"] = null;
            }
            if ((_ref2 = params["send_at"]) == null) {
                params["send_at"] = null;
            }
            return this.master.call('messages/send', params, onsuccess, onerror);
        };

        /*
         Send a new transactional message through Mandrill using a template
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} template_name the immutable name or slug of a template that exists in the user's account. For backwards-compatibility, the template name may also be used but the immutable slug is preferred.
         @option params {Array} template_content an array of template content to send.  Each item in the array should be a struct with two keys - name: the name of the content block to set the content for, and content: the actual content to put into the block
         - template_content[] {Object} the injection of a single piece of content into a single editable region
         - name {String} the name of the mc:edit editable region to inject into
         - content {String} the content to inject
         @option params {Struct} message the other information on the message to send - same as /messages/send, but without the html content
         - html {String} optional full HTML content to be sent if not in template
         - text {String} optional full text content to be sent
         - subject {String} the message subject
         - from_email {String} the sender email address.
         - from_name {String} optional from name to be used
         - to {Array} an array of recipient information.
         - to[] {Object} a single recipient's information.
         - email {String} the email address of the recipient
         - name {String} the optional display name to use for the recipient
         - type {String} the header type to use for the recipient, defaults to "to" if not provided
         - headers {Object} optional extra headers to add to the message (most headers are allowed)
         - important {Boolean} whether or not this message is important, and should be delivered ahead of non-important messages
         - track_opens {Boolean} whether or not to turn on open tracking for the message
         - track_clicks {Boolean} whether or not to turn on click tracking for the message
         - auto_text {Boolean} whether or not to automatically generate a text part for messages that are not given text
         - auto_html {Boolean} whether or not to automatically generate an HTML part for messages that are not given HTML
         - inline_css {Boolean} whether or not to automatically inline all CSS styles provided in the message HTML - only for HTML documents less than 256KB in size
         - url_strip_qs {Boolean} whether or not to strip the query string from URLs when aggregating tracked URL data
         - preserve_recipients {Boolean} whether or not to expose all recipients in to "To" header for each email
         - view_content_link {Boolean} set to false to remove content logging for sensitive emails
         - bcc_address {String} an optional address to receive an exact copy of each recipient's email
         - tracking_domain {String} a custom domain to use for tracking opens and clicks instead of mandrillapp.com
         - signing_domain {String} a custom domain to use for SPF/DKIM signing instead of mandrill (for "via" or "on behalf of" in email clients)
         - return_path_domain {String} a custom domain to use for the messages's return-path
         - merge {Boolean} whether to evaluate merge tags in the message. Will automatically be set to true if either merge_vars or global_merge_vars are provided.
         - global_merge_vars {Array} global merge variables to use for all recipients. You can override these per recipient.
         - global_merge_vars[] {Object} a single global merge variable
         - name {String} the global merge variable's name. Merge variable names are case-insensitive and may not start with _
         - content {String} the global merge variable's content
         - merge_vars {Array} per-recipient merge variables, which override global merge variables with the same name.
         - merge_vars[] {Object} per-recipient merge variables
         - rcpt {String} the email address of the recipient that the merge variables should apply to
         - vars {Array} the recipient's merge variables
         - vars[] {Object} a single merge variable
         - name {String} the merge variable's name. Merge variable names are case-insensitive and may not start with _
         - content {String} the merge variable's content
         - tags {Array} an array of string to tag the message with.  Stats are accumulated using tags, though we only store the first 100 we see, so this should not be unique or change frequently.  Tags should be 50 characters or less.  Any tags starting with an underscore are reserved for internal use and will cause errors.
         - tags[] {String} a single tag - must not start with an underscore
         - subaccount {String} the unique id of a subaccount for this message - must already exist or will fail with an error
         - google_analytics_domains {Array} an array of strings indicating for which any matching URLs will automatically have Google Analytics parameters appended to their query string automatically.
         - google_analytics_campaign {Array|string} optional string indicating the value to set for the utm_campaign tracking parameter. If this isn't provided the email's from address will be used instead.
         - metadata {Array} metadata an associative array of user metadata. Mandrill will store this metadata and make it available for retrieval. In addition, you can select up to 10 metadata fields to index and make searchable using the Mandrill search api.
         - recipient_metadata {Array} Per-recipient metadata that will override the global values specified in the metadata parameter.
         - recipient_metadata[] {Object} metadata for a single recipient
         - rcpt {String} the email address of the recipient that the metadata is associated with
         - values {Array} an associated array containing the recipient's unique metadata. If a key exists in both the per-recipient metadata and the global metadata, the per-recipient metadata will be used.
         - attachments {Array} an array of supported attachments to add to the message
         - attachments[] {Object} a single supported attachment
         - type {String} the MIME type of the attachment
         - name {String} the file name of the attachment
         - content {String} the content of the attachment as a base64-encoded string
         - images {Array} an array of embedded images to add to the message
         - images[] {Object} a single embedded image
         - type {String} the MIME type of the image - must start with "image/"
         - name {String} the Content ID of the image - use <img src="cid:THIS_VALUE"> to reference the image in your HTML content
         - content {String} the content of the image as a base64-encoded string
         @option params {Boolean} async enable a background sending mode that is optimized for bulk sending. In async mode, messages/send will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
         @option params {String} ip_pool the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
         @option params {String} send_at when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately. An additional fee applies for scheduled email, and this feature is only available to accounts with a positive balance.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.sendTemplate = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["async"]) == null) {
                params["async"] = false;
            }
            if ((_ref1 = params["ip_pool"]) == null) {
                params["ip_pool"] = null;
            }
            if ((_ref2 = params["send_at"]) == null) {
                params["send_at"] = null;
            }
            return this.master.call('messages/send-template', params, onsuccess, onerror);
        };

        /*
         Search recently sent messages and optionally narrow by date range, tags, senders, and API keys. If no date range is specified, results within the last 7 days are returned. This method may be called up to 20 times per minute. If you need the data more often, you can use <a href="/api/docs/messages.html#method=info">/messages/info.json</a> to get the information for a single message, or <a href="http://help.mandrill.com/entries/21738186-Introduction-to-Webhooks">webhooks</a> to push activity to your own application for querying.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} query <a href="http://help.mandrill.com/entries/22211902">search terms</a> to find matching messages
         @option params {String} date_from start date
         @option params {String} date_to end date
         @option params {Array} tags an array of tag names to narrow the search to, will return messages that contain ANY of the tags
         @option params {Array} senders an array of sender addresses to narrow the search to, will return messages sent by ANY of the senders
         @option params {Array} api_keys an array of API keys to narrow the search to, will return messages sent by ANY of the keys
         @option params {Integer} limit the maximum number of results to return, defaults to 100, 1000 is the maximum
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.search = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["query"]) == null) {
                params["query"] = '*';
            }
            if ((_ref1 = params["date_from"]) == null) {
                params["date_from"] = null;
            }
            if ((_ref2 = params["date_to"]) == null) {
                params["date_to"] = null;
            }
            if ((_ref3 = params["tags"]) == null) {
                params["tags"] = null;
            }
            if ((_ref4 = params["senders"]) == null) {
                params["senders"] = null;
            }
            if ((_ref5 = params["api_keys"]) == null) {
                params["api_keys"] = null;
            }
            if ((_ref6 = params["limit"]) == null) {
                params["limit"] = 100;
            }
            return this.master.call('messages/search', params, onsuccess, onerror);
        };

        /*
         Search the content of recently sent messages and return the aggregated hourly stats for matching messages
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} query the search terms to find matching messages for
         @option params {String} date_from start date
         @option params {String} date_to end date
         @option params {Array} tags an array of tag names to narrow the search to, will return messages that contain ANY of the tags
         @option params {Array} senders an array of sender addresses to narrow the search to, will return messages sent by ANY of the senders
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.searchTimeSeries = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3, _ref4;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["query"]) == null) {
                params["query"] = '*';
            }
            if ((_ref1 = params["date_from"]) == null) {
                params["date_from"] = null;
            }
            if ((_ref2 = params["date_to"]) == null) {
                params["date_to"] = null;
            }
            if ((_ref3 = params["tags"]) == null) {
                params["tags"] = null;
            }
            if ((_ref4 = params["senders"]) == null) {
                params["senders"] = null;
            }
            return this.master.call('messages/search-time-series', params, onsuccess, onerror);
        };

        /*
         Get the information for a single recently sent message
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique id of the message to get - passed as the "_id" field in webhooks, send calls, or search calls
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('messages/info', params, onsuccess, onerror);
        };

        /*
         Get the full content of a recently sent message
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique id of the message to get - passed as the "_id" field in webhooks, send calls, or search calls
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.content = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('messages/content', params, onsuccess, onerror);
        };

        /*
         Parse the full MIME document for an email message, returning the content of the message broken into its constituent pieces
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} raw_message the full MIME document of an email message
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.parse = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('messages/parse', params, onsuccess, onerror);
        };

        /*
         Take a raw MIME document for a message, and send it exactly as if it were sent through Mandrill's SMTP servers
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} raw_message the full MIME document of an email message
         @option params {String|null} from_email optionally define the sender address - otherwise we'll use the address found in the provided headers
         @option params {String|null} from_name optionally define the sender alias
         @option params {Array|null} to optionally define the recipients to receive the message - otherwise we'll use the To, Cc, and Bcc headers provided in the document
         - to[] {String} the email address of the recipient
         @option params {Boolean} async enable a background sending mode that is optimized for bulk sending. In async mode, messages/sendRaw will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
         @option params {String} ip_pool the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
         @option params {String} send_at when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately.
         @option params {String} return_path_domain a custom domain to use for the messages's return-path
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.sendRaw = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["from_email"]) == null) {
                params["from_email"] = null;
            }
            if ((_ref1 = params["from_name"]) == null) {
                params["from_name"] = null;
            }
            if ((_ref2 = params["to"]) == null) {
                params["to"] = null;
            }
            if ((_ref3 = params["async"]) == null) {
                params["async"] = false;
            }
            if ((_ref4 = params["ip_pool"]) == null) {
                params["ip_pool"] = null;
            }
            if ((_ref5 = params["send_at"]) == null) {
                params["send_at"] = null;
            }
            if ((_ref6 = params["return_path_domain"]) == null) {
                params["return_path_domain"] = null;
            }
            return this.master.call('messages/send-raw', params, onsuccess, onerror);
        };

        /*
         Queries your scheduled emails by sender or recipient, or both.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} to an optional recipient address to restrict results to
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.listScheduled = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["to"]) == null) {
                params["to"] = null;
            }
            return this.master.call('messages/list-scheduled', params, onsuccess, onerror);
        };

        /*
         Cancels a scheduled email.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id a scheduled email id, as returned by any of the messages/send calls or messages/list-scheduled
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.cancelScheduled = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('messages/cancel-scheduled', params, onsuccess, onerror);
        };

        /*
         Reschedules a scheduled email.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id a scheduled email id, as returned by any of the messages/send calls or messages/list-scheduled
         @option params {String} send_at the new UTC timestamp when the message should sent. Mandrill can't time travel, so if you specify a time in past the message will be sent immediately
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Messages.prototype.reschedule = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('messages/reschedule', params, onsuccess, onerror);
        };

        return Messages;

    })();

    m.Whitelists = (function() {

        function Whitelists(master) {
            this.master = master;
        }

        /*
         Adds an email to your email rejection whitelist. If the address is
         currently on your blacklist, that blacklist entry will be removed
         automatically.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} email an email address to add to the whitelist
         @option params {String} comment an optional description of why the email was whitelisted
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Whitelists.prototype.add = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["comment"]) == null) {
                params["comment"] = null;
            }
            return this.master.call('whitelists/add', params, onsuccess, onerror);
        };

        /*
         Retrieves your email rejection whitelist. You can provide an email
         address or search prefix to limit the results. Returns up to 1000 results.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} email an optional email address or prefix to search by
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Whitelists.prototype.list = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["email"]) == null) {
                params["email"] = null;
            }
            return this.master.call('whitelists/list', params, onsuccess, onerror);
        };

        /*
         Removes an email address from the whitelist.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} email the email address to remove from the whitelist
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Whitelists.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('whitelists/delete', params, onsuccess, onerror);
        };

        return Whitelists;

    })();

    m.Ips = (function() {

        function Ips(master) {
            this.master = master;
        }

        /*
         Lists your dedicated IPs.
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/list', params, onsuccess, onerror);
        };

        /*
         Retrieves information about a single dedicated ip.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip a dedicated IP address
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/info', params, onsuccess, onerror);
        };

        /*
         Requests an additional dedicated IP for your account. Accounts may
         have one outstanding request at any time, and provisioning requests
         are processed within 24 hours.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {Boolean} warmup whether to enable warmup mode for the ip
         @option params {String} pool the id of the pool to add the dedicated ip to, or null to use your account's default pool
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.provision = function(params, onsuccess, onerror) {
            var _ref, _ref1;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["warmup"]) == null) {
                params["warmup"] = false;
            }
            if ((_ref1 = params["pool"]) == null) {
                params["pool"] = null;
            }
            return this.master.call('ips/provision', params, onsuccess, onerror);
        };

        /*
         Begins the warmup process for a dedicated IP. During the warmup process,
         Mandrill will gradually increase the percentage of your mail that is sent over
         the warming-up IP, over a period of roughly 30 days. The rest of your mail
         will be sent over shared IPs or other dedicated IPs in the same pool.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip a dedicated ip address
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.startWarmup = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/start-warmup', params, onsuccess, onerror);
        };

        /*
         Cancels the warmup process for a dedicated IP.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip a dedicated ip address
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.cancelWarmup = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/cancel-warmup', params, onsuccess, onerror);
        };

        /*
         Moves a dedicated IP to a different pool.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip a dedicated ip address
         @option params {String} pool the name of the new pool to add the dedicated ip to
         @option params {Boolean} create_pool whether to create the pool if it does not exist; if false and the pool does not exist, an Unknown_Pool will be thrown.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.setPool = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["create_pool"]) == null) {
                params["create_pool"] = false;
            }
            return this.master.call('ips/set-pool', params, onsuccess, onerror);
        };

        /*
         Deletes a dedicated IP. This is permanent and cannot be undone.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip the dedicated ip to remove from your account
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/delete', params, onsuccess, onerror);
        };

        /*
         Lists your dedicated IP pools.
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.listPools = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/list-pools', params, onsuccess, onerror);
        };

        /*
         Describes a single dedicated IP pool.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} pool a pool name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.poolInfo = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/pool-info', params, onsuccess, onerror);
        };

        /*
         Creates a pool and returns it. If a pool already exists with this
         name, no action will be performed.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} pool the name of a pool to create
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.createPool = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/create-pool', params, onsuccess, onerror);
        };

        /*
         Deletes a pool. A pool must be empty before you can delete it, and you cannot delete your default pool.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} pool the name of the pool to delete
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.deletePool = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/delete-pool', params, onsuccess, onerror);
        };

        /*
         Tests whether a domain name is valid for use as the custom reverse
         DNS for a dedicated IP.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip a dedicated ip address
         @option params {String} domain the domain name to test
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.checkCustomDns = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/check-custom-dns', params, onsuccess, onerror);
        };

        /*
         Configures the custom DNS name for a dedicated IP.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} ip a dedicated ip address
         @option params {String} domain a domain name to set as the dedicated IP's custom dns name.
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Ips.prototype.setCustomDns = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('ips/set-custom-dns', params, onsuccess, onerror);
        };

        return Ips;

    })();

    m.Internal = (function() {

        function Internal(master) {
            this.master = master;
        }

        return Internal;

    })();

    m.Subaccounts = (function() {

        function Subaccounts(master) {
            this.master = master;
        }

        /*
         Get the list of subaccounts defined for the account, optionally filtered by a prefix
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} q an optional prefix to filter the subaccounts' ids and names
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype.list = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["q"]) == null) {
                params["q"] = null;
            }
            return this.master.call('subaccounts/list', params, onsuccess, onerror);
        };

        /*
         Add a new subaccount
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id a unique identifier for the subaccount to be used in sending calls
         @option params {String} name an optional display name to further identify the subaccount
         @option params {String} notes optional extra text to associate with the subaccount
         @option params {Integer} custom_quota an optional manual hourly quota for the subaccount. If not specified, Mandrill will manage this based on reputation
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype.add = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["name"]) == null) {
                params["name"] = null;
            }
            if ((_ref1 = params["notes"]) == null) {
                params["notes"] = null;
            }
            if ((_ref2 = params["custom_quota"]) == null) {
                params["custom_quota"] = null;
            }
            return this.master.call('subaccounts/add', params, onsuccess, onerror);
        };

        /*
         Given the ID of an existing subaccount, return the data about it
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of the subaccount to query
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('subaccounts/info', params, onsuccess, onerror);
        };

        /*
         Update an existing subaccount
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of the subaccount to update
         @option params {String} name an optional display name to further identify the subaccount
         @option params {String} notes optional extra text to associate with the subaccount
         @option params {Integer} custom_quota an optional manual hourly quota for the subaccount. If not specified, Mandrill will manage this based on reputation
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype.update = function(params, onsuccess, onerror) {
            var _ref, _ref1, _ref2;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["name"]) == null) {
                params["name"] = null;
            }
            if ((_ref1 = params["notes"]) == null) {
                params["notes"] = null;
            }
            if ((_ref2 = params["custom_quota"]) == null) {
                params["custom_quota"] = null;
            }
            return this.master.call('subaccounts/update', params, onsuccess, onerror);
        };

        /*
         Delete an existing subaccount. Any email related to the subaccount will be saved, but stats will be removed and any future sending calls to this subaccount will fail.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of the subaccount to delete
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('subaccounts/delete', params, onsuccess, onerror);
        };

        /*
         Pause a subaccount's sending. Any future emails delivered to this subaccount will be queued for a maximum of 3 days until the subaccount is resumed.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of the subaccount to pause
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype.pause = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('subaccounts/pause', params, onsuccess, onerror);
        };

        /*
         Resume a paused subaccount's sending
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} id the unique identifier of the subaccount to resume
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Subaccounts.prototype.resume = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('subaccounts/resume', params, onsuccess, onerror);
        };

        return Subaccounts;

    })();

    m.Urls = (function() {

        function Urls(master) {
            this.master = master;
        }

        /*
         Get the 100 most clicked URLs
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Urls.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('urls/list', params, onsuccess, onerror);
        };

        /*
         Return the 100 most clicked URLs that match the search query given
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} q a search query
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Urls.prototype.search = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('urls/search', params, onsuccess, onerror);
        };

        /*
         Return the recent history (hourly stats for the last 30 days) for a url
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} url an existing URL
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Urls.prototype.timeSeries = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('urls/time-series', params, onsuccess, onerror);
        };

        /*
         Get the list of tracking domains set up for this account
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Urls.prototype.trackingDomains = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('urls/tracking-domains', params, onsuccess, onerror);
        };

        /*
         Add a tracking domain to your account
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain a domain name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Urls.prototype.addTrackingDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('urls/add-tracking-domain', params, onsuccess, onerror);
        };

        /*
         Checks the CNAME settings for a tracking domain. The domain must have been added already with the add-tracking-domain call
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain an existing tracking domain name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Urls.prototype.checkTrackingDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('urls/check-tracking-domain', params, onsuccess, onerror);
        };

        return Urls;

    })();

    m.Webhooks = (function() {

        function Webhooks(master) {
            this.master = master;
        }

        /*
         Get the list of all webhooks defined on the account
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Webhooks.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('webhooks/list', params, onsuccess, onerror);
        };

        /*
         Add a new webhook
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} url the URL to POST batches of events
         @option params {String} description an optional description of the webhook
         @option params {Array} events an optional list of events that will be posted to the webhook
         - events[] {String} the individual event to listen for
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Webhooks.prototype.add = function(params, onsuccess, onerror) {
            var _ref, _ref1;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["description"]) == null) {
                params["description"] = null;
            }
            if ((_ref1 = params["events"]) == null) {
                params["events"] = [];
            }
            return this.master.call('webhooks/add', params, onsuccess, onerror);
        };

        /*
         Given the ID of an existing webhook, return the data about it
         @param {Object} params the hash of the parameters to pass to the request
         @option params {Integer} id the unique identifier of a webhook belonging to this account
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Webhooks.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('webhooks/info', params, onsuccess, onerror);
        };

        /*
         Update an existing webhook
         @param {Object} params the hash of the parameters to pass to the request
         @option params {Integer} id the unique identifier of a webhook belonging to this account
         @option params {String} url the URL to POST batches of events
         @option params {String} description an optional description of the webhook
         @option params {Array} events an optional list of events that will be posted to the webhook
         - events[] {String} the individual event to listen for
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Webhooks.prototype.update = function(params, onsuccess, onerror) {
            var _ref, _ref1;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["description"]) == null) {
                params["description"] = null;
            }
            if ((_ref1 = params["events"]) == null) {
                params["events"] = [];
            }
            return this.master.call('webhooks/update', params, onsuccess, onerror);
        };

        /*
         Delete an existing webhook
         @param {Object} params the hash of the parameters to pass to the request
         @option params {Integer} id the unique identifier of a webhook belonging to this account
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Webhooks.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('webhooks/delete', params, onsuccess, onerror);
        };

        return Webhooks;

    })();

    m.Senders = (function() {

        function Senders(master) {
            this.master = master;
        }

        /*
         Return the senders that have tried to use this account.
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/list', params, onsuccess, onerror);
        };

        /*
         Returns the sender domains that have been added to this account.
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.domains = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/domains', params, onsuccess, onerror);
        };

        /*
         Adds a sender domain to your account. Sender domains are added automatically as you
         send, but you can use this call to add them ahead of time.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain a domain name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.addDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/add-domain', params, onsuccess, onerror);
        };

        /*
         Checks the SPF and DKIM settings for a domain. If you haven't already added this domain to your
         account, it will be added automatically.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain a domain name
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.checkDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/check-domain', params, onsuccess, onerror);
        };

        /*
         Sends a verification email in order to verify ownership of a domain.
         Domain verification is an optional step to confirm ownership of a domain. Once a
         domain has been verified in a Mandrill account, other accounts may not have their
         messages signed by that domain unless they also verify the domain. This prevents
         other Mandrill accounts from sending mail signed by your domain.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} domain a domain name at which you can receive email
         @option params {String} mailbox a mailbox at the domain where the verification email should be sent
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.verifyDomain = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/verify-domain', params, onsuccess, onerror);
        };

        /*
         Return more detailed information about a single sender, including aggregates of recent stats
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} address the email address of the sender
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.info = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/info', params, onsuccess, onerror);
        };

        /*
         Return the recent history (hourly stats for the last 30 days) for a sender
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} address the email address of the sender
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Senders.prototype.timeSeries = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('senders/time-series', params, onsuccess, onerror);
        };

        return Senders;

    })();

    m.Metadata = (function() {

        function Metadata(master) {
            this.master = master;
        }

        /*
         Get the list of custom metadata fields indexed for the account.
         @param {Object} params the hash of the parameters to pass to the request
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Metadata.prototype.list = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('metadata/list', params, onsuccess, onerror);
        };

        /*
         Add a new custom metadata field to be indexed for the account.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name a unique identifier for the metadata field
         @option params {String} view_template optional Mustache template to control how the metadata is rendered in your activity log
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Metadata.prototype.add = function(params, onsuccess, onerror) {
            var _ref;
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            if ((_ref = params["view_template"]) == null) {
                params["view_template"] = null;
            }
            return this.master.call('metadata/add', params, onsuccess, onerror);
        };

        /*
         Update an existing custom metadata field.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the unique identifier of the metadata field to update
         @option params {String} view_template optional Mustache template to control how the metadata is rendered in your activity log
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Metadata.prototype.update = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('metadata/update', params, onsuccess, onerror);
        };

        /*
         Delete an existing custom metadata field. Deletion isn't instataneous, and /metadata/list will continue to return the field until the asynchronous deletion process is complete.
         @param {Object} params the hash of the parameters to pass to the request
         @option params {String} name the unique identifier of the metadata field to update
         @param {Function} onsuccess an optional callback to execute when the API call is successfully made
         @param {Function} onerror an optional callback to execute when the API call errors out - defaults to throwing the error as an exception
         */


        Metadata.prototype["delete"] = function(params, onsuccess, onerror) {
            if (params == null) {
                params = {};
            }
            if (typeof params === 'function') {
                onerror = onsuccess;
                onsuccess = params;
                params = {};
            }
            return this.master.call('metadata/delete', params, onsuccess, onerror);
        };

        return Metadata;

    })();

    (typeof exports !== "undefined" && exports !== null ? exports : this).mandrill = m;

}).call(this);
/*
 json2.js
 2011-10-19

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.


 This file creates a global JSON object containing two methods: stringify
 and parse.

 JSON.stringify(value, replacer, space)
 value       any JavaScript value, usually an object or array.

 replacer    an optional parameter that determines how object
 values are stringified for objects. It can be a
 function or an array of strings.

 space       an optional parameter that specifies the indentation
 of nested structures. If it is omitted, the text will
 be packed without extra whitespace. If it is a number,
 it will specify the number of spaces to indent at each
 level. If it is a string (such as '\t' or '&nbsp;'),
 it contains the characters used to indent at each level.

 This method produces a JSON text from a JavaScript value.

 When an object value is found, if the object contains a toJSON
 method, its toJSON method will be called and the result will be
 stringified. A toJSON method does not serialize: it returns the
 value represented by the name/value pair that should be serialized,
 or undefined if nothing should be serialized. The toJSON method
 will be passed the key associated with the value, and this will be
 bound to the value

 For example, this would serialize Dates as ISO strings.

 Date.prototype.toJSON = function (key) {
 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 return this.getUTCFullYear()   + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate())      + 'T' +
 f(this.getUTCHours())     + ':' +
 f(this.getUTCMinutes())   + ':' +
 f(this.getUTCSeconds())   + 'Z';
 };

 You can provide an optional replacer method. It will be passed the
 key and value of each member, with this bound to the containing
 object. The value that is returned from your method will be
 serialized. If your method returns undefined, then the member will
 be excluded from the serialization.

 If the replacer parameter is an array of strings, then it will be
 used to select the members to be serialized. It filters the results
 such that only members with keys listed in the replacer array are
 stringified.

 Values that do not have JSON representations, such as undefined or
 functions, will not be serialized. Such values in objects will be
 dropped; in arrays they will be replaced with null. You can use
 a replacer function to replace those with JSON values.
 JSON.stringify(undefined) returns undefined.

 The optional space parameter produces a stringification of the
 value that is filled with line breaks and indentation to make it
 easier to read.

 If the space parameter is a non-empty string, then that string will
 be used for indentation. If the space parameter is a number, then
 the indentation will be that many spaces.

 Example:

 text = JSON.stringify(['e', {pluribus: 'unum'}]);
 // text is '["e",{"pluribus":"unum"}]'


 text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
 // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

 text = JSON.stringify([new Date()], function (key, value) {
 return this[key] instanceof Date ?
 'Date(' + this[key] + ')' : value;
 });
 // text is '["Date(---current time---)"]'


 JSON.parse(text, reviver)
 This method parses a JSON text to produce an object or array.
 It can throw a SyntaxError exception.

 The optional reviver parameter is a function that can filter and
 transform the results. It receives each of the keys and values,
 and its return value is used instead of the original value.
 If it returns what it received, then the structure is not modified.
 If it returns undefined then the member is deleted.

 Example:

 // Parse the text. Values that look like ISO date strings will
 // be converted to Date objects.

 myData = JSON.parse(text, function (key, value) {
 var a;
 if (typeof value === 'string') {
 a =
 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 if (a) {
 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
 +a[5], +a[6]));
 }
 }
 return value;
 });

 myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
 var d;
 if (typeof value === 'string' &&
 value.slice(0, 5) === 'Date(' &&
 value.slice(-1) === ')') {
 d = new Date(value.slice(5, -1));
 if (d) {
 return d;
 }
 }
 return value;
 });


 This is a reference implementation. You are free to copy, modify, or
 redistribute.
 */

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
 call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate())      + 'T' +
            f(this.getUTCHours())     + ':' +
            f(this.getUTCMinutes())   + ':' +
            f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());



