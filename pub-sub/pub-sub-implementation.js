/**
 * Reference: Essential JS Design Patterns
 *
 * Implementation of pub/sub pattern with Javascript
 */

function pubsub() {

  if (!pubsub.public) {

    pubsub.public = {};

    // using self invoked function
    // for using closure scope
    (function(global) {

      var topics = {},
          subUid = -1;

      /**
       * Publish notification for the subscribers
       * 
       * @param  {String} topic Topic of the norification
       * @param  {Array}  args  Arguments will be passed to the callback function
       * @return {Object}       Pubsub object
       */
      global.publish = function(topic, args) {

        // There is no such topic
        // Nothing to do
        if (!topics[topic]) {
          return false;
        }

        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        // invokes callback for all subscribers
        // for the topic
        while (len--) {
          subscribers[len].func( topic, args );
        }

        return this;
      };

      /**
       * Subscribe callback for the topic
       * 
       * @param  {String}   topic Topic to subscribing
       * @param  {Function} func  Callback will be invoked on the publisher`s notification
       * @return {String}         Token of the added topic
       */
      global.subscribe = function(topic, func) {

        // there is no such topic
        // that`s ok: create the new one
        if (!topics[topic]) {
          topics[topic] = [];
        }

        // unique ID for the topic
        // we will need it for the unsubscribe
        var token = (++subUid).toString();

        // push new subscriber for the topic
        topics[topic].push({
          token: token,
          func: func
        });

        return token;
      };

      /**
       * Usubscribe clients for the topic
       * 
       * @param  {String} token       Token of the subscriber
       * @return {String|Object}      Token of the unsubscribed callback
       *                              or pubsub object if previous fails
       */
      global.unsubscribe = function( token ) {
        // travers for all topics
        for (var t in topics) {
          if (topics[t]) {
            //travers for all subscribers of the topic
            for (var i = 0, j = topics[t].length; i < j; i++) {
              if (topics[t][i].token === token) {
                topics[t].splice(i, 1);
                return token;
              }
            }
          }
        }
        return this;
      };

      return global;

    }(pubsub.public));
  }

  return pubsub.public;
}
