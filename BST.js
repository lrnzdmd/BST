class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.head = null;
    }

    sortAndBuild(array) {
        let sortedArray = this.mergeSort(array);
        this.head = this.buildTree(sortedArray);
    }

    mergeSort(array) {
        if (array.length <= 1) {
            return array;
        }

        const index = Math.floor(array.length / 2);

        const firstHalf = this.mergeSort(array.slice(0, index));
        const secondHalf = this.mergeSort(array.slice(index));

        return this.merge(firstHalf, secondHalf);
    }

    merge(array1, array2) {
        const mergedArr = [];

        while (array1.length > 0 && array2.length > 0) {
            if (array1[0] < array2[0]) {
                mergedArr.push(array1.shift());
            } else {
                mergedArr.push(array2.shift());
            }
        }

        return [...new Set(mergedArr.concat(array1, array2))];
    }

    buildTree(sortedArray, start = 0, end = sortedArray.length - 1) {
        if (start > end) {
            return null;
        }

        const halfIndex = Math.floor((start + end) / 2);
        let node = new Node(sortedArray[halfIndex]);

        node.left = this.buildTree(sortedArray, start, halfIndex - 1);
        node.right = this.buildTree(sortedArray, halfIndex + 1, end);

        return node;
    }

    add(value) {
        this.head = this._addToTree(this.head, value);
    }

    _addToTree(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this._addToTree(node.left, value);
        } else if (value > node.value) {
            node.right = this._addToTree(node.right, value);
        }

        return node;
    }

    remove(value) {
        this.head = this._removeFromTree(this.head, value);
    }

    _removeFromTree(node, value) {
        if (node === null) {
            console.log("Value not found in tree");
            return node;
        }

        if (value < node.value) {
            node.left = this._removeFromTree(node.left, value);
        } else if (value > node.value) {
            node.right = this._removeFromTree(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            let minValNode = this.findBranchMinVal(node.right);
            node.value = minValNode.value;
            node.right = this._removeFromTree(node.right, minValNode.value);
        }

        return node;
    }

    findBranchMinVal(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    find(value) {
        return this._findNode(this.head, value);
    }

    _findNode(node, value) {
        if (node === null) {
            console.log("Value not in tree");
            return null;
        }

        if (node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this._findNode(node.left, value);
        } else {
            return this._findNode(node.right, value);
        }
    }

    height() {
        return this._calculateHeight(this.head);
    }

    depth(node, root = this.head, depth = 0) {
        if (node === null || root === null) {
            return null;
        }
        if (node === root) { 
            return depth 
        }

        if (node.value > root.value) {
            return this.depth(node, root.right, depth += 1);
        } else {
            return this.depth(node, root.left, depth += 1)
        }
    }

    _calculateHeight(node) {
        if (node === null) {
            return -1;
        } else if (node.left === null && node.right === null) {
            return 0;
        } else {
            let countR = this._calculateHeight(node.right);
            let countL = this._calculateHeight(node.left);

            return Math.max(countL, countR) + 1;
        }
    }

    prettyPrint(node = this.head, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }



    levelOrder(callback, queue = []) {
        if (this.head === null) {
            console.log("the tree is empty");
            return null;
        } else {
            queue.push(this.head);

            while (queue.length !== 0) {
                let curr = queue.shift();
                if (!callback) {
                    console.log("please use with a callback function");
                } else {
                callback(curr);
                }
                if (curr.left !== null) {
                    queue.push(curr.left);
                }
                if (curr.right !== null) {
                    queue.push(curr.right);
                }

            }
        }
    }

    inOrder(callback, node = this.head) {
        if (node === null) {
            return null;
        } else {
            this.inOrder(callback, node.left);
            if (!callback) {
                console.log("please use with a callback function");
            } else {
            callback(node);
            }
            this.inOrder(callback, node.right);
        }
    }

    postOrder(callback, node = this.head) {
        if (node === null) {
            return null;
        } else {
            this.postOrder(callback, node.left);
            
            this.postOrder(callback, node.right);
            
            if (!callback) {
                console.log("please use with a callback function");
            } else {
            callback(node);
            }
        }
    }

    preOrder(callback, node = this.head) {
        if (node === null) {
            return null;
        } else { 
            
            if (!callback) {
                console.log("please use with a callback function");
            } else {
            callback(node);
            }
            this.preOrder(callback, node.left);
            
            this.preOrder(callback, node.right);
            
           
        }
    }

    isBalanced(node = this.head) {
        const lh = this._calculateHeight(node.left);
        const rh = this._calculateHeight(node.right);
        const diff = Math.abs(lh - rh);
        return diff < 2 ? true : false;
      }
            

       


    rebalance() {
        const array = [];
        this.inOrder(node => {
            array.push(node.value);
        });

        this.head = this.buildTree(array);
    }

}


// driver script


function main() {

const tree = new Tree();

tree.sortAndBuild([78, 14, 94, 61, 21, 6, 20, 63, 90, 15, 50, 21, 9, 65, 85, 79, 67, 55, 1, 46, 57, 11, 21, 91, 50, 24, 89, 10, 71, 3, 65, 53, 54, 40, 85, 14, 33, 81, 57, 98, 82, 96, 35, 87, 8, 90, 79, 62, 42, 47]);

console.log("tree balance?: " + tree.isBalanced());

tree.levelOrder(node => console.log("levelorder!" + node.value));

tree.preOrder(node => console.log("preorder!" + node.value));

tree.postOrder(node => console.log("postorder!" + node.value));

tree.inOrder(node => console.log("inorder!" + node.value));



tree.add(110);
tree.add(111);
tree.add(150);
tree.add(8008135);

console.log("tree balance?: " + tree.isBalanced());


tree.rebalance();

console.log("tree balance?: " + tree.isBalanced());


tree.levelOrder(node => console.log("levelorder!" + node.value));

tree.preOrder(node => console.log("preorder!" + node.value));

tree.postOrder(node => console.log("postorder!" + node.value));

tree.inOrder(node => console.log("inorder!" + node.value));


}