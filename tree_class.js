module.exports = class Node {
  constructor(content) {

    this.content = content;
    this.operand = false;

    if (content == 'OR' || content == 'AND') {
      this.operand = true;
      this.left = new Node(null);
      this.right = new Node(null);

    } else if (content == 'NOT') {
      this.operand = true;
      this.child = new Node(null);

    } else if (content == 'IMP')  {
      this.operand = true;
      this.ant = new Node(null);
      this.con = new Node(null);

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
