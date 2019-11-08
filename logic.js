const Node = require('./tree_class.js');

module.exports = function reason (KB, query) {
  
  for (var i=0; i<KB.length; i++)  {

    //trivial
    if (KB[i].operand == false && query.operand==false && query.content==KB[i].content) {
      console.log('True by trivial');
      return true;
    }

    //not in query
    if (query.content=='NOT') {

      if(reason(KB, query.child)) {
        console.log('False by negation in query');
        return false;
      }
      else  {
        console.log('True by negation in query');
        return true;
      }
    }
  

    // modus ponens
    if (KB[i].content == 'IMP' && KB[i].con.content == query.content && reason(KB, KB[i].ant)) {
      console.log('True by Modus Ponens');
      return true;

    }


    // not in knowledge base 
    if (KB[i].content == 'NOT') {

      if (reason([KB[i].child], query)) {
        console.log('False by negation in KB');
        return false;

      }
      else  {
        console.log('True by negation in KB');
        return true;

      }

    }

    //disjunction introduction
    if (query.content=='OR' && (reason(KB, query.left)  || reason(KB, query.right))) {
      console.log('True by Disjunction Introduction');
      return true;
    }

    //conjunction introduction
    if (query.content=='AND' && (reason(KB, query.left)  && reason(KB, query.right))) {
      console.log('True by Conjunction Introduction');
      return true;
    }

  }

  return false;
  
}

function s_reason (KB, query)  {
  for (var i=0; i<KB.length; i++) {
    
    if (reason([KB[i]], query))  {
      return true;
    }
  }
  return false;
}



//trivial (a |- a?) | expecting true [WORKING] 
console.log('TRIVIAL')
var KB = [];
KB.push(new Node ('a'));
var query =  new Node ('a');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

// negation in the query (a |- ~a?) | expecting false[WORKING]
console.log('NEGATION IN QUERY')
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('NOT');
query.child = new Node ('a');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

// double negation in query (a |- ~~a?)| expecting true [WORKING]
console.log('NEGATION IN QUERY')
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('NOT');
query.child = new Node ('NOT')
query.child.child = new Node ('a');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//negation in knowledge base (~a |- a?)| expecting false [WORKING]
console.log('NEGATION IN KB')
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('a');
var query = new Node ('a')
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//double negation in knowledge base (~~a |- a?) | expecting true [WORKING]
console.log('NEGATION IN KB')
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('NOT');
KB[0].child.child = new Node ('a');
var query = new Node ('a')
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//triple negation in KB (~~~a |- a?) | expecting false [WORKING]
console.log('NEGATION IN KB')
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('NOT');
KB[0].child.child = new Node ('NOT');
KB[0].child.child.child = new Node ('a');
var query = new Node ('a')
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//disjunction introduction (a |- a OR b?) | expecting true [WORKING]
console.log('DISJUNCTION INTRODUCTION')
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('OR');
query.left = new Node ('a');
query.right = new Node ('b');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//disjunction introduction (a |- c OR b?) | expecting false [WORKING]
console.log('DISJUNCTION INTRODUCTION')
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('OR');
query.left = new Node ('c');
query.right = new Node ('b');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//conjunction introduction (a |- a AND a?) | expecting true [WORKING]
console.log('CONJUNCTION INTRODUCTION')
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('AND');
query.left = new Node ('a');
query.right = new Node ('a');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//conjunction introduction (a |- a AND b?)| expecting false [WORKING]
console.log('CONJUNCTION INTRODUCTION')
var KB = [];
KB.push(new Node ('a'));
var query = new Node ('AND');
query.left = new Node ('a');
query.right = new Node ('b');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');

//modus ponens (p, p->q |- q?) | expecting true [WORKING]
console.log('MODUS PONENS')
var KB = [];
KB.push(new Node ('p'));
KB.push (new Node ('IMP'));
KB[1].ant = new Node ('p');
KB[1].con = new Node ('q');
var query = new Node ('q');
console.log ('-------------------------\n true X', reason(KB, query), '\n=========================\n\n');

//modus ponens (a, p->q |- q?)| expecting false [WORKING]
console.log('MODUS PONENS')
var KB = [];
KB.push(new Node ('a'));
KB.push (new Node ('IMP'));
KB[1].ant = new Node ('p');
KB[1].con = new Node ('q');
var query = new Node ('q');
console.log ('-------------------------\n false X', reason(KB, query), '\n=========================\n\n');


//double negation + modus ponens (~~p, p->q |- q) | expecting true
console.log('MODUS PONENS + DOUBLE NEGATION')
var KB = [];
KB.push(new Node ('NOT'));
KB[0].child = new Node ('NOT');
KB[0].child.child = new Node ('p');
KB.push (new Node ('IMP'));
KB[1].ant = new Node ('p');
KB[1].con = new Node ('q');
var query = new Node ('q');
console.log ('-------------------------\n true X', s_reason(KB, query), '\n=========================\n\n');





