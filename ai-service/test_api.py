import requests

url = "https://ai-space-ground-task-scheduler-aiservice.onrender.com/validate-task"

valid_data = {"task": "Flood detection using satellite imagery"}
invalid_data = {"task": "vijay birthday"}

print("Testing VALID task...")
r1 = requests.post(url, json=valid_data)
print(r1.text)

print("\nTesting INVALID task...")
r2 = requests.post(url, json=invalid_data)
print(r2.text)