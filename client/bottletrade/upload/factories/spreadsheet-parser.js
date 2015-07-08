(function() {
  'use strict';

  angular.module('bottletrade.common').factory('spreadsheetParser', function($q, $log) {
    var col = {
      brewery: {
        name: 0
      },
      beer: {
        brewery: 0,
        name: 1
      },
      winery: {
        name: 0
      },
      wine: {
        winery: 0,
        name: 1
      },
      distillery: {
        name: 0
      },
      spirit: {
        distillery: 0,
        name: 1
      }
    };

    return {
      parseBreweryCsv: parseBreweryCsv,
      parseBeerCsv: parseBeerCsv,
      parseWineryCsv: parseWineryCsv,
      parseWineCsv: parseWineCsv,
      parseDistilleryCsv: parseDistilleryCsv,
      parseSpiritCsv: parseSpiritCsv,
    };

    function parseBreweryCsv(csv) {
      var results = [];
      parseCsv(csv).forEach(function(row) {
        results.push({
          company: row[col.brewery.name]
        });
      });
      return results;
    }

    function parseBeerCsv(csv) {
      var results = [];
      parseCsv(csv).forEach(function(row) {
        results.push({
          company: row[col.beer.brewery],
          beverage: row[col.beer.name]
        });
      });
      return results;
    }

    function parseWineryCsv(csv) {
      var results = [];
      parseCsv(csv).forEach(function(row) {
        results.push({
          company: row[col.winery.name]
        });
      });
      return results;
    }

    function parseWineCsv(csv) {
      var results = [];
      parseCsv(csv).forEach(function(row) {
        results.push({
          company: row[col.wine.winery],
          beverage: row[col.wine.name]
        });
      });
      return results;
    }

    function parseDistilleryCsv(csv) {
      var results = [];
      parseCsv(csv).forEach(function(row) {
        results.push({
          company: row[col.distillery.name]
        });
      });
      return results;
    }

    function parseSpiritCsv(csv) {
      var results = [];
      parseCsv(csv).forEach(function(row) {
        results.push({
          company: row[col.spirit.distillery],
          beverage: row[col.spirit.name]
        });
      });
      return results;
    }

    function parseCsv(csv, reviver) {
  		reviver = reviver || function(r, c, v) { return v; };
  		var chars = csv.split(''), c = 0, cc = chars.length, start, end, table = [], row;
  		while (c < cc) {
  			table.push(row = []);
  			while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
  				start = end = c;
  				if ('"' === chars[c]){
  					start = end = ++c;
  					while (c < cc) {
  						if ('"' === chars[c]) {
  							if ('"' !== chars[c+1]) { break; }
  							else { chars[++c] = ''; } // unescape ""
  						}
  						end = ++c;
  					}
  					if ('"' === chars[c]) { ++c; }
  					while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { ++c; }
  				} else {
  					while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { end = ++c; }
  				}
  				end = reviver(table.length-1, row.length, chars.slice(start, end).join(''));
  				row.push(isNaN(end) ? end : +end);
  				if (',' === chars[c]) { ++c; }
  			}
  			if ('\r' === chars[c]) { ++c; }
  			if ('\n' === chars[c]) { ++c; }
  		}
  		return table;
  	}

    function parseTsv(dsv, reviver, field, record) {
  		field = field || '\t'; record = record || '\n';
  		reviver = reviver || function(r, c, v) { return v; };
  		var table = dsv.replace(/\r?\n|\r/g, '\n').split(record),
  			r, rr = table.length, c, cc;
  		for (r = 0; r < rr; ++r) {
  			table[r] = table[r].split(field);
  			for (c = 0, cc = table[r].length; c < cc; ++c) {
  				table[r][c] = reviver(r, c, table[r][c]);
  				if (!isNaN(table[r][c])) { table[r][c] = +table[r][c]; }
  			}
  		}
  		return table;
  	}
  });
})();
