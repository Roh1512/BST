class Node {
  constructor(data, left = null, right = null, parent = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class Tree {
  constructor(dataArray) {
    this.root = null;
    this.buildTree(dataArray);
  }

  buildTree(dataArray) {
    const sortedDataArray = [...new Set(dataArray)].sort((a, b) => a - b);
    this.root = this.buildTreeRecursive(
      sortedDataArray,
      0,
      sortedDataArray.length - 1
    );
  }
  buildTreeRecursive(dataArray, start, end, parent = null) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const newNode = new Node(dataArray[mid], null, null, parent);

    newNode.left = this.buildTreeRecursive(dataArray, start, mid - 1, newNode);
    newNode.right = this.buildTreeRecursive(dataArray, mid + 1, end, newNode);

    return newNode;
  }

  //Insert a new node to the tree
  insert(value) {
    this.root = this.insertNode(this.root, value);
  }
  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }
    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }
    return node;
  }

  //Delete a node from the tree
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }
  deleteNode(node, value) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      const minRightNode = this.findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this.deleteNode(node.right, minRightNode.data);
    }
    return node;
  }
  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    console.log(`\nSearching for ${value}......`);
    return this.findValue(this.root, value);
  }
  findValue(node, value) {
    if (node === null) {
      console.log("Value is not in the tree");
      return null;
    } else if (node.data === value) {
      console.log(`Value found at`);
      console.log(node);
      return node;
    }

    if (value < node.data) {
      return this.findValue(node.left, value);
    }
    if (value > node.data) {
      return this.findValue(node.right, value);
    }
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      console.log(prefix + (isLeft ? "└── " : "┌── ") + "null");
      return;
    }

    if (node.right) {
      this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }

    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);

    if (node.left) {
      this.prettyPrint(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
  }

  levelOrder(callback) {
    // accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given.
    callback("\nBreadth First / Level order Traversal of tree");
    const result = [];
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return result;
  }

  preorder(callback) {
    //Root Left Right
    console.log("\nPreorder Traversal of tree");
    const result = [];
    this.preorderTraversal(this.root, callback, result);
    if (callback) {
      return;
    }
    console.log(result);
    return result;
  }
  preorderTraversal(node, callback, result) {
    if (node === null) {
      return result;
    }
    if (callback) {
      callback(node.data);
    }
    result.push(node.data);
    this.preorderTraversal(node.left, callback, result);
    this.preorderTraversal(node.right, callback, result);
  }

  inorder(callback) {
    //Left Root Right
    console.log("\nInorder traversal of tree");
    const result = [];
    this.inorderTraversal(this.root, callback, result);
    if (callback) {
      return;
    }
    console.log(result);
    return result;
  }
  inorderTraversal(node, callback, result) {
    if (node === null) {
      return result;
    }
    this.inorderTraversal(node.left, callback, result);
    if (callback) {
      callback(node.data);
    }
    result.push(node.data);
    this.inorderTraversal(node.right, callback, result);
  }

  postorder(callback) {
    //Left Right Root
    console.log("\nPostorder traversal of tree");
    const result = [];
    this.postorderTraversal(this.root, callback, result);
    if (callback) {
      return;
    }
    console.log(result);
    return result;
  }
  postorderTraversal(node, callback, result) {
    if (node === null) {
      return result;
    }
    this.postorderTraversal(node.left, callback, result);
    this.postorderTraversal(node.right, callback, result);
    if (callback) {
      callback(node.data);
    }
    result.push(node.data);
  }

  getHeight(nodeVal) {
    console.log(`\nFind height of node ${nodeVal} if exist.`);
    const nodeToFind = this.find(nodeVal);
    if (nodeToFind === null) return -1;
    return this.calculateNodeHeight(nodeToFind);
  }
  calculateNodeHeight(node) {
    if (node === null) return -1;

    const leftHeight = this.calculateNodeHeight(node.left);
    const rightHeight = this.calculateNodeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  getDepth(node) {
    if (node === null) {
      return -1; // Base case: depth of an empty tree is -1
    }

    if (node.parent === null) {
      return 0;
    }

    return this.getDepth(node.parent) + 1; // +1 to account for the current node
  }
  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.calculateNodeHeight(node.left);
    const rightHeight = this.calculateNodeHeight(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    if (heightDiff > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance() {
    const nodes = [];
    this.inorder((node) => nodes.push(node));
    console.log(nodes);
    this.root = null;
    this.buildTree(nodes);
  }
}

const dataArray = [1, 7, 4, 20, 25, 5, 45];
const tree = new Tree(dataArray);
console.log("Tree : ");
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());

console.log("\nInsering 2");
tree.insert(2);
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());

console.log("\nDelete 4:");
tree.delete(4);
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());

tree.find(7);

tree.levelOrder(console.log);
tree.preorder(console.log);
tree.inorder(console.log);
tree.postorder(console.log);
console.log(`\nHeight of node 7 = ${tree.getHeight(7)}`);

const nodeToFind = tree.find(20);
const depthOfNode = tree.getDepth(nodeToFind);
console.log(`Depth of Node ${nodeToFind.data} = ${depthOfNode}`);
tree.prettyPrint();

console.log("Is tree balanced?", tree.isBalanced());
console.log("\nRebalancing the tree...");
tree.rebalance();
tree.prettyPrint();
console.log("Is tree balanced?", tree.isBalanced());
