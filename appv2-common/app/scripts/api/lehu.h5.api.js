/**
 * @class lehu.h5.api
 * @param  {Object} $
 * @param  {Object} can
 * @param  {Object} _
 * @param  {can.Construct} Comm
 * @return {can.Construct}
 */
define(
  'lehu.h5.api', [
    'zepto',
    'can',
    'underscore',
    'lehu.h5.framework.comm'
  ],
  function($, can, _, Comm) {
    'use strict';

    return Comm.extend({
      api: {

      }
    });
  });