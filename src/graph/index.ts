
// NEG, Maybe later
enum NodeType {
  // Basic
  ADD,
  SUB,
  MUL,
  DIV,
  POW,
  NRT,
  // Advanced
  LOG,
  LN,
  // Logical
  CEIL,
  FLOOR,
  ROUND,
  NEG,
  ABS,
  MIN,
  MAX,
  // Trigonometric
  SIN,
  COS,
  TAN,
  ASIN,
  ACOS,
  ATAN,
  // Special
  COMP, // Composition
  VAR,
  CONST,
  INPUT,
  OUTPUT,
}
type SpecialNodeTypes = |
  NodeType.COMP |
  NodeType.VAR |
  NodeType.CONST |
  NodeType.INPUT |
  NodeType.OUTPUT;

type NodeId = `Node-${string}`
type InputId = `Input-${string}`
type OutputId = `Output-${string}`

interface BasicNode {
  id: NodeId
  label?: string
  type: Exclude<NodeType, SpecialNodeTypes>
  inputs: { label: string, id: InputId }[]
  outputs: { label: string, id: OutputId }[]
}
interface CompositionNode {
  id: NodeId
  label?: string
  type: NodeType.COMP,
  graph: Graph
}
type GraphNode = BasicNode | CompositionNode

interface Graph {
  nodes: Map<NodeId, Node>
  edges: { from: InputId, to: OutputId }[]
  nodeByInputId: Map<InputId, Node>
  nodeByOutputId: Map<OutputId, Node>
}

