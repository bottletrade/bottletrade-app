{
  "rules": {
    ".read": true,
    ".write": true,

    "bottles": {
      // indexes
      ".indexOn": ["search_description"]
    },

    "breweries": {
      // indexes
      ".indexOn": ["search_name"],

      "$brewery_id": {
        ".validate": "newData.hasChildren(['name'])",

        "name": {
          ".validate": "newData.isString()"
        },

        "beers": {
          "$beer_id": {
            ".write": "root.child('beers/' + $beer_id).exists()"
          }
        }
      }
    },
    "beers": {
      // indexes
      ".indexOn": ["search_name"],

      "$beer_id": {
        ".validate": "newData.hasChildren(['name', 'brewery'])",

        "name": {
          ".validate": "newData.isString()"
        },

        "brewery": {
          ".write": "root.child('brewery/' + newData.val()).exists()",

          ".validate": "newData.isString()"
        }
      }
    },
    "wines": {
      // indexes
      ".indexOn": ["search_name"]
    },
    "wineries": {
      // indexes
      ".indexOn": ["search_name"]
    },
    "spirits": {
      // indexes
      ".indexOn": ["search_name"]
    },
    "distilleries": {
      // indexes
      ".indexOn": ["search_name"]
    }
  }
}
