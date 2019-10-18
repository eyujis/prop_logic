
module.exports = class Node {
  constructor(content, type) {

    this.type = type;
    this.content = content;

    if (type == 'binary') {
      this.left = [new Node(null,null)];
      this.right = [new Node(null,null)];

    } else if (type == 'unary') {
      this.child = [new Node(null,null)];

    } else if (type == 'implication')  {
      this.ant = [new Node(null,null)];
      this.con = [new Node(null,null)];

    } else if (type == 'literal') {
    }
  }
}

// module.exports = class Tree {
//
//   constructor() {
//     this.root = null;
//   }
//
//   insert(data,type) {
//
//     var newNode = new Node(data,type);
//
//     if (this.root==null) {
//       this.root = newNode
//     } else {
//       this.insertNode(this.root, newNode);
//     }
//
//
//   }
// }
