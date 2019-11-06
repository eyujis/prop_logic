const Node = require('./tree_class.js');


function reason (KB, query) {
  
  for (i=0; i<KB.length; i++)  {

    //trivial
    if (KB[i].operand == false && query.operand==false && query.content==KB[i].content) {
      console.log('True by trivial')
      return true
    }

    //not in query
    if (query.content=='NOT') {

      if(reason(KB, query.child)) {
        console.log('False by negation in query')
        return false
      }
      else  {
        console.log('True by negation in query')
        return true
      }
    }

    // not in knowledge base
    if (KB[i].content == 'NOT') {

      if (reason([KB[i].child], query)) {
        console.log('False by negation in KB')
        return false

      }
      else  {
        console.log('True by negation in KB')
        return true

      }

    }

    //disjunction introduction
    if (query.content=='OR' && (reason(KB, query.left)  || reason(KB, query.right))) {
      console.log('True by Disjunction Introduction')
      return true
    }

    //conjunction introduction
    if (query.content=='AND' && (reason(KB, query.left)  && reason(KB, query.right))) {
      console.log('True by Conjunction Introduction')
      return true
    }




  }
  console.log('FALSE')
  return false
}


//trivial | expecting true [WORKING]
var KB = [];
KB.push(new Node ('a'));
var query =  new Node ('a');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// test with not in sentense | expecting false[WORKING]
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('NOT');
query.child = new Node ('a');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// double negation in query | expecting true [WORKING]
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('NOT');
query.child = new Node ('NOT')
query.child.child = new Node ('a');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//negation in knowledge base | expecting false [WORKING]
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('a');
var query = new Node ('a')
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//double negation in knowledge base | expecting true [WORKING]
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('NOT');
KB[0].child.child = new Node ('a');
var query = new Node ('a')
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//disjunction introduction | expecting true
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('OR');
query.left = new Node ('a');
query.right = new Node ('b');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//disjunction introduction | expecting false
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('OR');
query.left = new Node ('c');
query.right = new Node ('b');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//conjunction introduction | expecting true
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('AND');
query.left = new Node ('a');
query.right = new Node ('a');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//conjunction introduction | expecting false
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('AND');
query.left = new Node ('a');
query.right = new Node ('b');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//triple negation in KB | expecting false
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('NOT');
KB[0].child.child = new Node ('NOT');
KB[0].child.child.child = new Node ('a');
var query = new Node ('a')
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');




//
//disjunction introduction with double negation in query (OK)
// var tree = [];
// tree[0] = new Node('a', 'literal');
// var query = [];
// query[0] = new Node('OR', 'binary');
// query[0].left[0] = new Node('b', 'literal');
// query[0].right[0] = new Node('NOT', 'unary');
// query[0].right[0].child[0] = new Node('NOT', 'unary');
// query[0].right[0].child[0].child[0] = new Node('a', 'literal');
// console.log(reason(tree, query))


// //disjunction introduction (OK)
// var tree = [];
// tree[0] = new Node('a', 'literal');
// query = new Node('OR', 'binary');
// query.left = new Node('b', 'literal');
// query.right = new Node('a', 'literal');


// //double not in sentence (FAIL)
// var tree = []
// tree[0] = new Node('NOT', 'unary');
// tree[0].child = new Node('NOT', 'unary');
// tree[0].child.child = new Node('a', 'literal');
// var query = []
// query[0] = new Node('a', 'literal')

//double not in query (OK)
// var tree = []
// tree[0] = new Node('a', 'literal')
// query = new Node('NOT', 'unary')
// query.child = new Node('NOT', 'unary')
// query.child.child = new Node('a', 'literal')


//console.log(reason (tree, query));
