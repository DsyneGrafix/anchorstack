
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

WATCH_PATH = "/home/ricky/anchorstack/content"
SCRIPT_TO_RUN = "/home/ricky/anchorstack/scripts/update_sidebar.py"

class ContentChangeHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith(('.html', '.md')):
            print(f"📄 Change detected: {event.src_path}")
            subprocess.run(["python3", SCRIPT_TO_RUN])
            print("✅ Sidebar updated.")

if __name__ == "__main__":
    event_handler = ContentChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, path=WATCH_PATH, recursive=True)
    print(f"👀 Watching {WATCH_PATH} for changes...")
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
