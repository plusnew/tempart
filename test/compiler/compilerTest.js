/* global describe, it, expect, tempart */

// jshint varstmt: false
// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength

function check(template, result, data) {
  var Template = tempart.factory('path', tempart.parse(template));
  var templateInstance = new Template('prefix-', data, {});
  expect(templateInstance.getHtml()).toEqual(result);
}

describe('Tests the functionality of the compiler', function () {
  it('static test', function () {
    check('<div>foo</div>', '<div>foo</div>', {});
  });

  it('static text', function () {
    check('foo', '<span>foo</span>', {});
  });

  it('variable test with text', function () {
    check('<div>{{$text}}</div>', '<div>foo</div>', { text: 'foo' });
  });

  it('loop test', function () {
    check('<ul>{{#each $arr as ~entity}}<li>{{~entity}}</li>{{/each}}</ul>', '<ul><li>foo</li><li>bar</li></ul>', { arr: ['foo', 'bar'] });
  });

//   it('static test with attributes', function () {
//     check('<div id="bar">foo</div>', '<div id="bar" data-snew-id="prefix-1">foo</div>', {});
//   });

//   it('variable test with attributes', function () {
//     check('<div id="{{id}}">foo</div>', '<div id="bar" data-snew-id="prefix-1">foo</div>', { id: 'bar' });
//   });

//   it('variable test with text', function () {
//     check('<div id="bar">{{text}}</div>', '<div id="bar" data-snew-id="prefix-1">foo</div>', { text: 'foo' });
//   });

//   it('variable test with nested variable', function () {
//     check('<div id="bar">{{foo.bar}}</div>', '<div id="bar" data-snew-id="prefix-1">foobar</div>', { foo: { bar: 'foobar' } });
//   });

  it('check if error gets thrown when not correctly called', function () {
    var error = new Error('CallError');
    error.message = 'Tempart has to be called with new';
    var Template = tempart.factory('path', { version: tempart.version });
    expect(function () {
      Template('foo');
    }).toThrow(error);
  });

  it('check if error gets thrown when no template object is given', function () {
    var error = new Error('TemplateMissing');
    error.message = 'No Template was given to the factory';
    expect(function () {
      new tempart.factory();
    }).toThrow(error);
  });

  it('check if error gets thrown when no template object is given', function () {
    var error = new Error('TemplateMissing');
    error.message = 'No Template was given to the factory';
    expect(function () {
      new tempart.factory('path');
    }).toThrow(error);
  });

  it('check if error gets thrown when no version is given', function () {
    var error = new Error('VersionMissing');
    error.message = 'No version was given';
    expect(function () {
      new tempart.factory('path', {});
    }).toThrow(error);
  });

  it('check if error gets thrown when wrong version is given', function () {
    var error = new Error('VersionMissmatch');
    error.message = 'The parsed tempart version is 0.0.1, this is not compatible with compiler ' + tempart.version;
    expect(function () {
      new tempart.factory('path', { version: '0.0.1' });
    }).toThrow(error);
  });
});
