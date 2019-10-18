const Node = require('./tree_class.js');

function reason (KB, x) {

  console.log(x)
  for (i=0; i<KB.length; i++)  {

    //trivial
    if (x.content==KB[i].content) {
      return true
    }

    //not in query
    if (x.content=='NOT') {

      if(reason(KB, x.child)) {
        console.log('False by not in query')
        return false
      }
      else {
        console.log('True by not in query')
        return true
      }
    }

    //[FIX] not in sentence
    if (x.content = 'NOT')  {

      if(reason(KB[i].child,x))  {
        return false
      } else {
        return true
      }
    }

    if (x.content=='OR' && (reason(KB, x.left)  || reason(KB,x.right))) {
      console.log('True by Consjunction Introduction')
      return true
    }

  }
  console.log('END')
  return false
}


//push test with not in sentense

var tree = [];
tree.push(new Node('NOT', 'unary'));
tree[0].child.push(new Node('a', 'literal'))
var query = new Node ('a','literal');
callback(console.log(query))
//reason(tree, query);



//
// //disjunction introduction with double negation in query (OK)
// var tree = [];
// tree[0] = new Node('a', 'literal');
// var query = [];
// query[0] = new Node('OR', 'binary');
// query[0].left[0] = new Node('b', 'literal');
// query[0].right[0] = new Node('NOT', 'unary');
// query[0].right[0].child[0] = new Node('NOT', 'unary');
// query[0].right[0].child[0].child[0] = new Node('a', 'literal');



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
