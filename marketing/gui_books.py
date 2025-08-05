import tkinter as tk
from tkinter import filedialog, messagebox

def on_generate_click():
    messagebox.showinfo("It’s Alive", "The Watchman GUI is working!")

def on_exit():
    root.destroy()

# Main Window
root = tk.Tk()
root.title("The Watchman – Ricky Jarnagin's Publishing Console")
root.geometry("500x300")

# Welcome Label
label = tk.Label(root, text="Welcome to The Watchman", font=("Ubuntu", 16))
label.pack(pady=20)

# Generate Button
generate_button = tk.Button(root, text="Generate Books", command=on_generate_click, font=("Ubuntu", 12))
generate_button.pack(pady=10)

# Exit Button
exit_button = tk.Button(root, text="Exit", command=on_exit)
exit_button.pack(pady=10)

# Launch
root.mainloop()

