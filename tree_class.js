module.exports = class Node {
  constructor(content) {

    this.content = content;
    this.operator = false;

    if (content == 'OR' || content == 'AND') {
      this.operator = true;
      
      this.left = new Node(null);
      this.left.content = null;
      this.left.operator = null;
      
      this.right = new Node(null);
      this.right.content = null;
      this.right.operator = null;

    } else if (content == 'NOT') {
      this.operator = true;
      
      this.child = new Node(null);
      this.child.content = null;
      this.child.operator = null;

    } else if (content == 'IMP')  {
      this.operator = true;
      
      this.ant = new Node(null);
      this.ant.content = null;
      this.ant.operator = null;
      this.con = new Node(null);
      this.con.content = null;
      this.con.operator = null;

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
