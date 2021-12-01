# Nodes

A node is, in abstract, some function that takes one or more inputs,
to produce one or more outputs (there are some exceptions).  
For example the `add` node takes two or more inputs and adds them
together into one output.

## Inputs and Outputs

*todo: Go over the similarities*

When describing inputs and outputs we use the following [[Latex|latex]] syntax:

> **Labels:**  
> Can be any letter or word.  
> Example: $Input$
> 
> **Multiple Inputs/Outputs**  
> If a node has more than one input or output, they will have different labels.
> Each label is separated by commas in this case.  
> Example: $A,\ B$  
> You may also see the same label used several times with a subscript.  
> Example: $I_{1},\ I_{2}$
>
> **Dynamic Input Counts**  
> A node may have a variable number of inputs. In this case we can use the
> `rest` syntax.  
> Example: $\cdots I_{n}$  
> This means there are $0$ or more inputs, up to $n$ number of inputs.
> Each input may later be refereed to like $I_{12}$ as the 12th input.
>
> If there is a minimum number of allowed inputs, for example 2:  
> $I_{1},\ I_{2},\ \cdots I_{n}$  
> $I_{1}$ and $I_{2}$ are not optional and since $\cdots I_{n}$ can be $0$
> to $n$ inputs there is now between $2$ and $n$ inputs, since we consider
> the $I_{n}$ to start at $I_{3}$.

### Inputs

Inputs are connections points for other nodes outputs. The input will take in
a connected outputs value, into the node it belong to.  
Unlike [[#Outputs|outputs]] an input may only have a single connection, though a node may
have multiple inputs.

### Outputs

Outputs are, like [[#Inputs|inputs]], connection points for nodes. Though in this
case they serve to pass on its nodes value and it may do so to any number of inputs,
as it has no limit on the number of connections it have.

## Data Types

There are really  numbers.

## Composing nodes

Composing a node is the process of combining multiple [[Terminology|sub-nodes]]
to achieve some function and saving that as a new [[Terminology|super-node]].
This new node can then be reused elsewhere and even be used as a sub-node itself.

All composed nodes require at least one [[#Base nodes|input node]] and one
[[#Base nodes|output node]]

## Base nodes

| Name     | Inputs                     | Outputs  | Function                                                                                                                  |
| -------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| Add      | $$ I_{1},\ \cdots I_{n} $$ | $$ O $$  | Adds up the inputs and gives the result to output $$ O = \sum_{x=1}^{n} I_{i} $$                                          |
| Subtract | $$ A,\ \cdots B_{n} $$     | $$ O $$  | Subtracts all $B_{n}$ inputs from and gives the result to output $A$ $$ O = A - \sum_{x=1}^{n} B_{i} $$                   |
| Multiply | $$ I_{1},\ \cdots I_{n} $$ | $$ O $$  | Multiplies all the inputs and gives the result to output $$ O = I_{1}\times I_{2} \cdots \times I_{n} $$                  |
| Division | $$ A,\ \cdots B_{n} $$     | $$ O $$  | Divides $A$ by all $B_{n}$ and gives the result to output $$ O = A\div B_{1} \cdots \div B_{n} $$                         |
| Input    | External                   | $$ O $$  | This can only be used as a sub-node. In such a case its output is whatever the [[Terminology\|super-node]] inputted to it |
| Output   | $$ I $$                    | External | This can only be used as a sub-node. In such a case its input is passes as an output of the [[Terminology\|super-node]]   |
