var _validator = null;
(function() {
    var Validator = function() {
      var _self = this;
      var data = "eyJhcGlLZXkiOiJBSXphU3lER2JCcmpwUzVrc1ZLUGJqZ2VtVFJSbzVjZEhSNzBRMzgiLCJhdXRoRG9tYWluIjoibnNwbHVzLTIzYjhmLmZpcmViYXNlYXBwLmNvbSIsInByb2plY3RJZCI6Im5zcGx1cy0yM2I4ZiIsInN0b3JhZ2VCdWNrZXQiOiJuc3BsdXMtMjNiOGYuYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjMxMzA4MzEyOTYxNyIsImFwcElkIjoiMTozMTMwODMxMjk2MTc6d2ViOjRlYmJjODhhZjE4YWE2OWJkNjI2YjAiLCJtZWFzdXJlbWVudElkIjoiRy1GMFBGMlA1MEcxIn0=";
      var loaded = false;
      var valid_users = [];
      var fbc = JSON.parse(atob(data));
      var loadValidUsers = function(result) { try {  valid_users = result.data().teachers; loaded = true } catch(e) {} };
      var validate = function(z) { return valid_users.indexOf(z) > -1; };
      var getLoaded = function() { return loaded; };
      firebase.initializeApp(fbc);
      firebase.analytics();
      firebase.firestore().collection("nsp-teacher").doc("gxQ27COFmtjsts8JBYq4").get().then(loadValidUsers);
      Object.defineProperty(_self, "validate", { "writable": false, "numerable": false, "value": function (a) { return validate(a) } } );
      Object.defineProperty(_self, "loaded", { "enumerable": true, "get": getLoaded } );
      return _self;
    }
    _validator = new Validator();
  }());