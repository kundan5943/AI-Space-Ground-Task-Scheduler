from flask import Flask, request, jsonify
from ai_filter import is_valid_task

app = Flask(__name__)

@app.route("/validate-task", methods=["POST"])
def validate_task():
    try:
        data = request.get_json()
        task_text = data.get("task", "")

        if not task_text or len(task_text.strip()) < 3:
            return jsonify({"status": "INVALID"})

        if is_valid_task(task_text):
            return jsonify({"status": "VALID"})
        else:
            return jsonify({"status": "INVALID"})

    except Exception as e:
        return jsonify({"status": "INVALID"})

@app.route("/")
def home():
    return "AI Validation Server Running"

if __name__ == "__main__":
    app.run(port=5001)