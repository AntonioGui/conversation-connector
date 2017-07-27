'use strict';

/**
 *  An action representing a "black box" from and to the channel specified.
 *
 *  @params Paramters sent to this action by channel/receive:
 *    {
 *      facebook: {
 *        ...
 *      },
 *      provider: 'facebook'
 *    }
 *
 *  @return Return parameters required by facebook/post
 */
function main(params) {
  try {
    validateParams(params);
  } catch (e) {
    return Promise.reject(e.message);
  }

  return {
    recipient: {
      id: params.facebook.entry[0].messaging[0].sender.id
    },
    message: {
      text: params.facebook.entry[0].messaging[0].message.text
    }
  };
}

/**
 *  Validates the required parameters for running this action.
 *
 *  @params - the parameters passed into the action
 */
function validateParams(params) {
  // Required: The channel provider communicating with this action
  if (!params.provider || params.provider !== 'facebook') {
    throw new Error('No facebook channel provider supplied.');
  }
  // Required: The parameters of the channel provider
  if (!params.facebook) {
    throw new Error('No facebook data or event parameters provided.');
  }
}

module.exports = main;
