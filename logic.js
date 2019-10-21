const Node = require('./tree_class.js');

function reason (KB, x) {
  console.log(x)
  for (i=0; i<KB.length; i++)  {

    //trivial
    if (x.type=='literal' && x.content==KB[i].content) {
      return true
    }

    //not in query
    if (x.content=='NOT') {

      if(reason(KB, x.child)) {
        console.log('False by negation in query')
        return false
      }
      else {
        console.log('True by negation in query')
        return true
      }
    }
    //[FIX] not in sentence
    if (KB[i] = 'NOT')  {
      console.log('ENTROU')
      if(reason([KB[i].child],x))  {
        console.log('False by negation in Knowledge base')
        return false
      } else {
        return true
        console.log('True by negation in Knowledge base')
      }
    }

    //conjunction introduction
    if (x.content=='OR' && (reason(KB, x.left)  || reason(KB,x.right))) {
      console.log('True by Conjunction Introduction')
      return true
    }

  }
  console.log('FALSE')
  return false
}


//test with not in sentense
var forest = [];
forest.push(new Node('NOT', 'unary'));
forest[0].child = new Node('a', 'literal');
var query = new Node('a','literal');
reason(forest, query);



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
