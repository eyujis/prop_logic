const reason = require ('./logic.js');
// const s_reason = require ('./logic.js') 
const Node = require('./tree_class.js');
var assert = require('assert');


describe('Array', function() {
  
it('should return -1 when the value is not present', function(){
  var KB = [];
  KB.push(new Node ('a'));
  var query =  new Node ('a');
  assert.equal(true, reason(KB,query));
});
});


// //trivial | expecting true [WORKING]
// console.log('TRIVIAL')
// var KB = [];
// KB.push(new Node ('a'));
// var query =  new Node ('a');
// console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// // test with not in sentense | expecting false[WORKING]
// console.log('NEGATION IN QUERY')
// var KB = [];
// KB.push(new Node ('a'));
// var query = new Node ('NOT');
// query.child = new Node ('a');
// console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// // double negation in query | expecting true [WORKING]
// console.log('NEGATION IN QUERY')
// var KB = [];
// KB.push(new Node ('a'));
// var query = new Node ('NOT');
// query.child = new Node ('NOT')
// query.child.child = new Node ('a');
// console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// //negation in knowledge base | expecting false [WORKING]
// console.log('NEGATION IN KB')
// var KB = [];
// KB.push(new Node ('NOT'));
// KB[0].child = new Node ('a');
// var query = new Node ('a')
// console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// //double negation in knowledge base | expecting true [WORKING]
// console.log('NEGATION IN KB')
// var KB = [];
// KB.push(new Node ('NOT'));
// KB[0].child = new Node ('NOT');
// KB[0].child.child = new Node ('a');
// var query = new Node ('a')
// console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// //triple negation in KB | expecting false [WORKING]
// console.log('NEGATION IN KB')
// var KB = [];
// KB.push(new Node ('NOT'));
// KB[0].child = new Node ('NOT');
// KB[0].child.child = new Node ('NOT');
// KB[0].child.child.child = new Node ('a');
// var query = new Node ('a')
// console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// //disjunction introduction | expecting true [WORKING]
// console.log('DISJUNCTION INTRODUCTION')
// var KB = [];
// KB.push(new Node ('a'));
// var query = new Node ('OR');
// query.left = new Node ('a');
// query.right = new Node ('b');
// console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// //disjunction introduction | expecting false [WORKING]
// console.log('DISJUNCTION INTRODUCTION')
// var KB = [];
// KB.push(new Node ('a'));
// var query = new Node ('OR');
// query.left = new Node ('c');
// query.right = new Node ('b');
// console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// //conjunction introduction | expecting true [WORKING]
// console.log('CONJUNCTION INTRODUCTION')
// var KB = [];
// KB.push(new Node ('a'));
// var query = new Node ('AND');
// query.left = new Node ('a');
// query.right = new Node ('a');
// console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// //conjunction introduction | expecting false [WORKING]
// console.log('CONJUNCTION INTRODUCTION')
// var KB = [];
// KB.push(new Node ('a'));
// var query = new Node ('AND');
// query.left = new Node ('a');
// query.right = new Node ('b');
// console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// //modus ponens | expecting true [WORKING]
// console.log('MODUS PONENS')
// var KB = [];
// KB.push(new Node ('p'));
// KB.push (new Node ('IMP'));
// KB[1].ant = new Node ('p');
// KB[1].con = new Node ('q');
// var query = new Node ('q');
// console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// //modus ponens | expecting false [WORKING]
// console.log('MODUS PONENS')
// var KB = [];
// KB.push(new Node ('a'));
// KB.push (new Node ('IMP'));
// KB[1].ant = new Node ('p');
// KB[1].con = new Node ('q');
// var query = new Node ('q');
// console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');


// //double negation + modus ponens | expecting true
// console.log('MODUS PONENS + DOUBLE NEGATION')
// var KB = [];
// KB.push(new Node ('NOT'));
// KB[0].child = new Node ('NOT');
// KB[0].child.child = new Node ('p');
// KB.push (new Node ('IMP'));
// KB[1].ant = new Node ('p');
// KB[1].con = new Node ('q');
// var query = new Node ('q');
// console.log ('-------------------------\n true X', s_reason(KB, query), '\n=========================\n\n');


