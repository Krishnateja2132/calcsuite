import ast
import operator

# Allowed operations
OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.USub: operator.neg,
}


def evaluate_expression(expression):
    """
    Safely evaluate arithmetic expressions.
    Supported:
        +
        -
        *
        /
        ()
    """

    try:
        tree = ast.parse(expression, mode="eval")
        return _evaluate(tree.body)
    except ZeroDivisionError:
        raise ValueError("Cannot divide by zero.")
    except Exception:
        raise ValueError("Invalid Expression.")


def _evaluate(node):

    if isinstance(node, ast.Constant):
        return node.value

    elif isinstance(node, ast.BinOp):
        left = _evaluate(node.left)
        right = _evaluate(node.right)

        operation = OPERATORS[type(node.op)]
        return operation(left, right)

    elif isinstance(node, ast.UnaryOp):
        operand = _evaluate(node.operand)
        operation = OPERATORS[type(node.op)]
        return operation(operand)

    raise ValueError("Unsupported operation.")