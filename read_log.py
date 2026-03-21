import os

log_path = 'build_log.txt'
if os.path.exists(log_path):
    with open(log_path, 'rb') as f:
        content = f.read()
    try:
        # Try UTF-16LE as reported by previous tool failure
        text = content.decode('utf-16le')
        print(text)
    except Exception as e:
        print(f"Failed to decode: {e}")
        # Fallback to UTF-8
        try:
            print(content.decode('utf-8'))
        except:
            print("Failed to decode even with UTF-8")
else:
    print("Log file not found")
