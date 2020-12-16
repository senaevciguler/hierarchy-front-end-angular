import {DatePipe} from '@angular/common';
import {isDevMode} from '@angular/core';

/**
 * Class is used for utility methods,
 * For example, object merge etc.
 */
export class Utility {

  /**
   * Merges two objects. If source1 has an array property to be merged,
   * source2's items of same array are push into source1's array property.
   *
   * @param {U} source1
   * @param {V} source2
   * @returns {T}
   */
  public static merge<T, U, V>(source1: U, source2: V): T {
    const result: any = {};
    Object.assign(result, source1);
    Object.keys(source2).forEach(key => {
      if (!result.hasOwnProperty(key)) { // if result has not property
        result[key] = source2[key];
      } else if (result[key] instanceof Array) { // if result has property and property deliveryType is Array
        result[key].push(source2[key]);
      } else { // if result has property and property deliveryType not array, just set the value
        result[key] = source2[key];
      }
    });
    return result;
  }

  /**
   * convert s to number at base 10
   * @param {string} s
   * @returns {number}
   */
  public static toInt(s: string): any {
    return parseInt(s, 10);
  }

  /**
   *
   * @param {number} n
   * @return {number} 0 if n is empty otherwise n
   */
  public static toNumberNullFree(n: number): number {
    return Utility.isEmpty(n) ? 0 : n;
  }


  /**
   *
   * @param {Date} date
   * @return {string} "yyyy-MM-dd" formatted string
   */
  public static dateToString(date: Date) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  /**
   * yyyy-MM-yyT09:00:00 formated string
   * @param {string} dateStr
   * @return {Date}
   */
  public static stringToDate(dateStr: string) {
    return new Date(dateStr);
  }


  /**
   * if obj's deliveryType is string and its value is empty string return true in that case.
   * if obj's deliveryType is Array and has length = 0 returns true in that case.
   * @param obj
   * @returns {boolean}
   */
  public static isEmpty(obj: any): boolean {
    if (typeof obj === 'undefined' || obj == null) {
      return true;
    }
    if (obj === '' || (obj instanceof Array && obj.length === 0)) {
      return true;
    }
    if (typeof obj === 'string') {
      return (obj + '').trim().length === 0;
    }
    return false;
  }

  /**
   * Compare two object by values not instances.<br>
   * Compare two objects by converting to float, If false, try converting to string.<br>
   * If each parameters isEmpty, returns true also.
   *
   * @param obj1
   * @param obj2
   * @returns {boolean}
   */
  public static equals(obj1: any, obj2: any): boolean {
    if (Utility.isEmpty(obj1) && Utility.isEmpty(obj2)) {
      return true;
    }

    let result = false;
    try {
      result = parseFloat(obj1 + '') === parseFloat(obj2 + '');
    } catch (e) {
    }
    if (!result) {
      result = obj1 + '' === obj2 + '';
    }
    return result;
  }

  /**
   * usage String.format('string {0}, asdad {1} ', 'var1', 'var2')
   * @return {any}
   */
  public static format(...args: any[]) {
    let s = arguments[0],
      i = 0,
      reg;
    for (; i < arguments.length - 1; i++) {
      reg = new RegExp(`\{${i}\}`, 'gm');
      s = s.replace(reg, arguments[i + 1]);
    }
    return s;
  }

  /* tslint:disable:no-bitwise */
  public static generateUUID() {
    let date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const rand: number = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c === 'x' ? rand : (rand & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  public static isDate(date: any) {
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }

  /**
   *
   * @param {Date} date
   * @return {string} yyyy/mm/dd formated string, it is the format that jackson accepts
   */
  public static formatDate(date: Date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(),
      '/',
      (mm > 9 ? '' : '0') + mm,
      '/',
      (dd > 9 ? '' : '0') + dd
    ].join('');
  }

  public static debug(...args: any[]) {
    if (isDevMode()) {
      console.log(args);
    }
  }

  public static warn(...args: any[]) {
    console.warn(args);
  }

  /**
   * trims all string properties in object
   * @param obj
   */
  public static deepTrim(obj: any) {
    try {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          const value = obj[prop], type = typeof value;
          if (value != null && (type === 'string' || type === 'object')) {
            if (type === 'object') {
              Utility.deepTrim(obj[prop]);
            } else {
              obj[prop] = obj[prop].trim();
            }
          }
        }
      }
    } catch (e) {
      Utility.debug(e);
    }
  }

  static isSuccess(response: Object): boolean {
    console.log(response);
    if (Utility.isEmpty(response['success'])) {
      console.warn('Could not find {success} property in response while checking success status');
    }
    return response['success'] === true;
  }

  static getContentFromPayload(response: any) {
    const payload = response['payload'];
    return payload && payload['content'] ? payload['content'] : payload;
  }

  /**
   * Date objects are manipulated
   * @param {Date} date
   * @param {Date} from
   * @return {boolean} true date is equal to from or after from
   */
  static isEqualOrAfter(date: Date, from: Date): boolean {
    date.setHours(0, 0, 0, 0);
    from.setHours(0, 0, 0, 0);
    return date >= from;
  }

  /**
   * Date objects are manipulated
   * @param {Date} date
   * @param {Date} from
   * @return {boolean} true date after from
   */
  static isAfter(date: Date, from: Date): boolean {
    date.setHours(0, 0, 0, 0);
    from.setHours(0, 0, 0, 0);
    return date > from;
  }

  static dateDiffInDays(from: Date, to: Date): number {
    const one_day = 1000 * 60 * 60 * 24;
    if (typeof from === 'string') {
      from = new Date(from);
    }
    if (typeof to === 'string') {
      to = new Date(to);
    }
    const date1Ms = from.getTime();
    const date2Ms = to.getTime();
    const differenceMs = date1Ms - date2Ms;
    return Math.round(differenceMs / one_day);
  }

  static isValidIBANNumber(input) {
    const CODE_LENGTHS = {
      AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
      CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
      FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
      HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
      LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
      MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
      RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
    };

    const iban = input.toUpperCase().replace(/[^A-Z0-9]/g, ''),
      code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
    let digits;

    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
      return false;
    }

    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
      return letter.charCodeAt(0) - 55;
    });

    return Utility.mod97(digits);
  }

  static mod97(string) {
    let checksum = string.slice(0, 2), fragment;

    for (let offset = 2; offset < string.length; offset += 7) {
      fragment = checksum + string.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }

    return checksum;
  }


}
