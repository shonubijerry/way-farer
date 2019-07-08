/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/**
 *   @fileOverview - regular expressions for available fields
 *   @exports rules
 * */

const rules = {
  validName: /^[a-zA-Z]+$/,
  empty: /^(\S+)/,
  validEmail: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|com.ng|ng|co.uk|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/,
  nameLength: /^[a-zA-Z]{2,30}$/,
  passwordLength: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  validUuid: /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/,
  validPlateNumber: /^[A-Za-z]{3}-[0-9]{3}-[A-Za-z]{2}$/,
};

export default rules;

// url regex: https://www.regextester.com/93652
// email regex: https://www.regextester.com/1922
