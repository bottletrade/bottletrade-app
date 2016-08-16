(function() {
  'use strict';

  angular.module('bottletrade.bottles').factory("BottleManager",
    function($timeout, BaseAppsApi, firebaseRef, BTConstants, BottleList, ConfirmModal) {
      return {
        searchByDescription: searchByDescription,
        removeFromList: removeFromList,
        remove: remove
      };

      function remove(bottle) {
        var beverageName = bottle.beverage.name;

        bottle.$remove().then(function(ref) {
          $timeout(function() {
            BaseAppsApi.publish('app-notifications', {
              title: "Bottle Removed!",
              content: beverageName + " has been removed from your cellar",
              color: "success",
              autoclose: '5000'
            });
          });
        });
      }

      function removeFromList(bottleList, bottle) {
        new ConfirmModal({
          content: "Are you sure you want to remove this bottle?",
          enterCallback: function() {
            var beverageName = bottle.beverage.name;

            bottleList.$remove(bottle).then(function(ref) {
              $timeout(function() {
                BaseAppsApi.publish('app-notifications', {
                  title: "Bottle Removed!",
                  content: beverageName + " has been removed from your cellar",
                  color: "success",
                  autoclose: '5000'
                });
              });
            });
          }
        })
      }

      function searchByDescription(desc, cb) {
        firebaseRef(BTConstants.firebase.bottles).orderByChild('description').startAt("~" + desc).endAt("~" + desc + "~")
          .on('child_added',  function(snapshot) {
            cb(snapshot.key, snapshot.val());
          }
        );
      }
    }
  );
})();
