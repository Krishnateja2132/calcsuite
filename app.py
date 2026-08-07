from flask import Flask, render_template, request, jsonify
from operations import evaluate_expression

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("calculator.html")


@app.route("/calculate", methods=["POST"])
def calculate():

    data = request.get_json()

    expression = data.get("expression", "")

    try:
        result = evaluate_expression(expression)

        return jsonify({
            "success": True,
            "result": result
        })

    except ValueError as e:

        return jsonify({
            "success": False,
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)